importScripts("https://cdn.jsdelivr.net/pyodide/v0.29.3/full/pyodide.js");

function sendPatch(patch, buffers, msg_id) {
  self.postMessage({
    type: 'patch',
    patch: patch,
    buffers: buffers
  })
}

async function startApplication() {
  console.log("Loading pyodide...");
  self.postMessage({type: 'status', msg: 'Loading pyodide'})
  self.pyodide = await loadPyodide();
  self.pyodide.globals.set("sendPatch", sendPatch);
  console.log("Loaded pyodide!");
  const data_archives = [];
  for (const archive of data_archives) {
    let zipResponse = await fetch(archive);
    let zipBinary = await zipResponse.arrayBuffer();
    self.postMessage({type: 'status', msg: `Unpacking ${archive}`})
    self.pyodide.unpackArchive(zipBinary, "zip");
  }
  await self.pyodide.loadPackage("micropip");
  self.postMessage({type: 'status', msg: `Installing environment`})
  try {
    await self.pyodide.runPythonAsync(`
      import micropip
      await micropip.install(['bokeh-3.9.2-py3-none-any.whl', 'panel-1.9.4-py3-none-any.whl', 'pyodide-http', 'hillcreep-0.1.0.dev0-py3-none-any.whl', 'artesian-0.1.0.dev0-py3-none-any.whl', 'numpy']);
    `);
  } catch(e) {
    console.log(e)
    self.postMessage({
      type: 'status',
      msg: `Error while installing packages`
    });
  }
  console.log("Environment loaded!");
  self.postMessage({type: 'status', msg: 'Executing code'})
  try {
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n"""hillcreep as a browser demo: a hillslope, and the motion underneath it.\n\nThe k_hs is not a slider.  A student sets how fast soil creeps at the\nsurface per unit slope (k_u) and how quickly that motion dies away with depth\n(H*), and D = k_u H* is reported back.  The lower panel draws the velocity\nprofile that D is a summary of.\n\nBuild and view it with::\n\n    artesian build interactive_demo/hillcreep_panel.py -o _artesian_build \\\n        -p . -r numpy --serve\n"""\nimport numpy as np\nimport panel as pn\nfrom bokeh.models import ColumnDataSource\nfrom bokeh.models import LinearColorMapper\nfrom bokeh.models import Range1d\nfrom bokeh.palettes import RdBu11\nfrom bokeh.plotting import figure\n\nfrom artesian.live import animator, reset_button, responsive\nfrom hillcreep import Hillslope\n\npn.extension()\n\n#: The width this app is laid out for.  \`\`artesian build\`\` reads this constant\n#: out of the source and records it in the compiled page; the embedding page\n#: repeats it as \`\`data-design-width\`\` (see the GeomorphOnline exercise page for\n#: why both are needed).  900 matches the other exercises on that site.\nDESIGN_WIDTH = 900\n\n#: Sliders stop here rather than spanning the pane.  The bound is in *layout*\n#: pixels, so the embed's scaling still enlarges them: a bounded slider is not\n#: a small slider on a large display.  Wider than corestone's because these\n#: labels carry a symbol and a unit.\nSLIDER_WIDTH = 420\n\nLENGTH = 100.0                  # hillslope width [m]\nN_NODES = 101\n\n# Slider bounds.  The upper end of each is set by steepness, not by taste:\n# probe_a shows that E = 0.2 mm/yr at the default k_u and H* gives a steady toe\n# slope of 1.0 (45 degrees), well outside where a linear creep law is\n# defensible.  See design/03.\nKU_MIN, KU_MAX, KU0 = 0.01, 0.05, 0.02          # [m/yr] at unit slope\nDZU_MIN, DZU_MAX, DZU0 = 0.25, 2.0, 0.5         # [m]\nE_MIN, E_MAX, E0 = -0.05, 0.10, 0.05         # [mm/yr], positive = incising\n\n#: How deep the velocity panel reaches, as a multiple of the *largest* H* the\n#: slider offers.  Deriving it from the model's own depth scale means the panel\n#: follows a rescaled model instead of needing a new hand-picked number; taking\n#: the slider's upper bound rather than its current value means the axis does\n#: not move under a student dragging the slider, which would destroy exactly\n#: the comparison the panel exists to support.\n#:\n#: At 1.0 the deepest setting fills the panel and shows 63.2% of the flux,\n#: while the default H* = 0.5 m keeps its motion in the top quarter.  At 1.5\n#: the deepest setting shows 77.7% and the default is squeezed into the top\n#: sixth.  One constant, and it is a proposal either way.  See design/04.\nZ_DISPLAY_IN_DZU_MAX = 1.0\n\n#: Depth shown in the velocity panel [m].  A viewing choice, not the base of\n#: the soil -- there is no bedrock in this model.\nZ_DISPLAY = Z_DISPLAY_IN_DZU_MAX * DZU_MAX\nN_ZETA = 121\n\n# Explicit diffusion is stable for dt <= dx**2 / 2D.  The sliders change D\n# while it runs, so the step is sized from the largest D on offer, not the\n# current one: a quarter of the limit at D = KU_MAX * DZU_MAX = 0.1 m2/yr.\nDX = LENGTH / (N_NODES - 1)\nDT = 0.25 * DX ** 2 / (KU_MAX * DZU_MAX)       # 2.5 yr\n\n# probe_c, measured: 400 steps per frame reaches 95% of the steady crest in\n# 307 frames (10.2 s at 30 fps) at the defaults, 1228 frames (40.9 s) at the\n# slowest corner of the sliders, and 31 frames (1.0 s) at the fastest.\nSTEPS_PER_FRAME = 400\n\nzeta = np.linspace(0.0, Z_DISPLAY, N_ZETA)\n\n\ndef _smooth_palette(anchors, n=256):\n    """Interpolate a short palette to \`\`n\`\` colours.\n\n    bokeh's \`\`diverging_palette(Blues256, Reds256)\`\` leaves a visible seam\n    exactly at the midpoint, because the two sub-palettes end on different\n    near-whites (#f7fbff and #fff5f0).  On this figure the midpoint is the\n    drainage divide, so the artefact lands precisely where a student is meant\n    to read "no motion here" -- and reads instead as a discontinuity in the\n    hillslope.  Interpolating ColorBrewer RdBu through a single white removes\n    it.  Caught by rendering the figure, not by reading the code.\n    """\n    rgb = [tuple(int(c[i:i + 2], 16) for i in (1, 3, 5)) for c in anchors]\n    out = []\n    for k in range(n):\n        pos = k * (len(rgb) - 1) / (n - 1.0)\n        i = min(int(pos), len(rgb) - 2)\n        f = pos - i\n        out.append("#%02x%02x%02x" % tuple(\n            int(round(rgb[i][c] + f * (rgb[i + 1][c] - rgb[i][c])))\n            for c in range(3)))\n    return out\n\n# \`sim\`, never \`state\`: panel exports pn.state, and shadowing it fails silently.\nsim = {"hill": Hillslope(length=LENGTH, n_nodes=N_NODES, k_u=KU0, dz_u=DZU0,\n                         incision_rate=E0 * 1e-3)}\n\nk_u = pn.widgets.FloatSlider(\n    sizing_mode="stretch_width", max_width=SLIDER_WIDTH,\n    name="Surface creep velocity at unit slope  k_u  [m/yr]",\n    start=KU_MIN, end=KU_MAX, step=0.005, value=KU0, format="0.000")\ndz_u = pn.widgets.FloatSlider(\n    sizing_mode="stretch_width", max_width=SLIDER_WIDTH,\n    name="Creep e-folding depth  \\u0394z_u  [m]",\n    start=DZU_MIN, end=DZU_MAX, step=0.05, value=DZU0, format="0.00")\nE = pn.widgets.FloatSlider(\n    sizing_mode="stretch_width", max_width=SLIDER_WIDTH,\n    name="River incision rate  \\u03b5\\u0307  [mm/yr]   (negative = aggrading)",\n    start=E_MIN, end=E_MAX, step=0.01, value=E0, format="0.00")\n\n#: The diffusivity written out as a function of the two decay parameters, with\n#: the current numbers substituted, plus how much hillslope is still exposed.\n#: The product is the whole lesson, so it is shown being formed rather than\n#: only as a result.\nreadout = pn.pane.Markdown("", sizing_mode="stretch_width",\n                           styles={"font-size": "1.05em"})\n\n\ndef _sync():\n    """Push the sliders into the model.  Read live, so they act while running."""\n    hill = sim["hill"]\n    hill.k_u = k_u.value\n    hill.dz_u = dz_u.value\n    hill.incision_rate = E.value * 1e-3\n    return hill\n\n\ndef _elevation_range(hill):\n    """Top of the elevation axis [m], from the steady crest for the sliders.\n\n    A fixed axis cannot serve these sliders: the steady crest E L**2 / (8 D)\n    spans 1.25 m to 50 m over their ranges, a factor of 40, so any single\n    choice either clips the tall cases or renders the short ones as a flat\n    line.  Scaling to the current steady crest instead makes the hill grow to\n    fill the panel and stop there -- and because it depends only on the\n    sliders, it does not rescale frame to frame while the animation runs.\n    """\n    steady_crest = (abs(hill.incision_rate) * hill.length ** 2\n                    / (8.0 * hill.k_hs))\n    return 1.18 * max(steady_crest,\n                      float(np.max(hill.z)) - hill.left.bed, 1.0)\n\n\ndef _colour_scale(hill):\n    """Half-range of the velocity colour scale [m/yr].\n\n    Fixed to the *steady* surface velocity at the toe, E L / (2 H*), which\n    depends only on the sliders and so does not flicker frame to frame.  The\n    colours therefore saturate as the hill approaches its steady form, which\n    is a useful signal in itself.  When E is zero there is no steady velocity\n    to scale by, so the present profile is used instead.\n    """\n    steady = abs(hill.incision_rate) * hill.length / (2.0 * hill.dz_u)\n    return max(steady, np.max(np.abs(hill.surface_velocity())), 1e-9)\n\n\ndef step():\n    """Advance one frame, reading the sliders as live forcing."""\n    hill = _sync()\n    for _ in range(STEPS_PER_FRAME):\n        hill.advance(DT)\n    _redraw()\n\n\ndef _redraw():\n    hill = _sync()\n    base = 0.5 * (hill.left.bed + hill.right.bed)\n\n    profile.data = {"x": hill.x, "z": hill.z - base}\n    # A hillslope whose base level is rising has no steady form to chase, so\n    # the dashed curve is withdrawn rather than drawn as a meaningless\n    # downward parabola.\n    if hill.incision_rate > 0.0:\n        steady.data = {"x": hill.x, "z": hill.steady_profile() - base}\n    else:\n        steady.data = {"x": [], "z": []}\n\n    scale = _colour_scale(hill)\n    velocity.data = {"u": [hill.velocity_field(zeta) * 1e3]}\n    mapper.low, mapper.high = -scale * 1e3, scale * 1e3\n\n    top = _elevation_range(hill)\n    fig_z.y_range.start, fig_z.y_range.end = -0.06 * top, top\n    valley.data = {"x": [0.0, hill.length], "y1": [-0.06 * top] * 2,\n                   "y2": [0.0, 0.0]}\n\n    fig_z.title.text = ("t = %.0f kyr        k_hs = k_u \\u0394z_u = %.4g m\\u00b2/yr"\n                        % (hill.t / 1000.0, hill.k_hs))\n    # Across the exposed span *inclusive of its bounding nodes*: the toe is a\n    # boundary node and is never in the active mask, so a max over active\n    # nodes alone reports the velocity one node inside the toe (4.90 rather\n    # than 5.00 mm/yr at the shipped defaults).\n    span = hill.exposed_span()\n    u_toe = 0.0 if span is None else float(\n        np.abs(hill.surface_velocity()[span[0]:span[1] + 1]).max())\n    fig_u.title.text = ("surface creep velocity at the toe = %.2f mm/yr"\n                        % (u_toe * 1e3))\n\n    exposed = hill.exposed_length\n    buried = "" if exposed >= hill.length else (\n        "  \\u00b7  **buried by aggradation:** %.0f m of hillslope, "\n        "leaving **%.0f m** exposed" % (hill.length - exposed, exposed))\n    steady_note = "" if hill.incision_rate > 0.0 else (\n        "  \\u00b7  *no steady form while base level is not falling*")\n    readout.object = (\n        "**k_hs = k_u \\u00d7 \\u0394z_u = %.3f \\u00d7 %.2f "\n        "= %.4f m\\u00b2/yr**%s%s"\n        % (hill.k_u, hill.dz_u, hill.k_hs, buried, steady_note))\n\n\ndef do_equilibrate():\n    """Impose the steady form instead of waiting out a 1e5-year relaxation."""\n    hill = _sync()\n    if hill.incision_rate <= 0.0:\n        readout.object = (\n            "**No equilibrium to jump to.** A hillslope whose rivers are "\n            "static or aggrading has no steady form \\u2014 raise "\n            "**\\u03b5\\u0307** above zero first.")\n        return\n    hill.equilibrate()\n    _redraw()\n\n\ndef do_reset():\n    sim["hill"] = Hillslope(length=LENGTH, n_nodes=N_NODES, k_u=k_u.value,\n                            dz_u=dz_u.value, incision_rate=E.value * 1e-3)\n    _redraw()\n\n\nhill0 = sim["hill"]\nprofile = ColumnDataSource(data={"x": hill0.x, "z": hill0.z})\n# The valley fill: everything below the rivers, which is where the alluvium is.\n# Drawn under the profile, so a buried toe reads as a hillslope running into\n# sediment rather than as a hillslope that has mysteriously gone flat.\nvalley = ColumnDataSource(data={"x": [0.0, LENGTH], "y1": [-1.0, -1.0],\n                                "y2": [0.0, 0.0]})\nsteady = ColumnDataSource(data={"x": hill0.x, "z": hill0.steady_profile()})\nvelocity = ColumnDataSource(data={"u": [hill0.velocity_field(zeta) * 1e3]})\n\n# Blue for material moving left, red for moving right, near-white at the\n# divide where the velocity passes through zero.\nmapper = LinearColorMapper(palette=_smooth_palette(RdBu11), low=-1.0, high=1.0)\n\nfig_z = figure(height=320, width=880, title="",\n               y_axis_label="Elevation above\\nthe rivers [m]",\n               toolbar_location=None)\nfig_z.varea(x="x", y1="y1", y2="y2", source=valley,\n            fill_color="#e0d3b8", fill_alpha=0.85, level="underlay")\nfig_z.line("x", "z", source=steady, line_width=1, line_dash="dashed",\n           color="gray", legend_label="steady form")\nfig_z.line("x", "z", source=profile, line_width=3, color="black",\n           legend_label="hillslope")\nfig_z.x_range = Range1d(0.0, LENGTH)\nfig_z.y_range = Range1d(-0.5, 10.0)      # replaced on every redraw\nfig_z.legend.location = "top_left"\nfig_z.legend.background_fill_alpha = 0.6\n\nfig_u = figure(height=240, width=880, title="",\n               x_axis_label="Distance across the hillslope [m]",\n               y_axis_label="Depth below\\nthe surface  \u03b6 [m]",\n               x_range=fig_z.x_range, toolbar_location=None)\n# The depth axis runs downward: Range1d(Z_DISPLAY, 0) puts zeta = 0 at the top.\n# Bokeh anchors image row 0 at the lower data coordinate, which after the flip\n# is the top of the panel -- so row 0 is the surface, matching velocity_field.\nfig_u.y_range = Range1d(Z_DISPLAY, 0.0)\nfig_u.image(image="u", source=velocity, x=0.0, y=0.0, dw=LENGTH, dh=Z_DISPLAY,\n            color_mapper=mapper)\n\nresponsive(fig_z)\nresponsive(fig_u)\n\nrun = animator(step)\n\nfor widget in (k_u, dz_u, E):\n    widget.param.watch(lambda event: _redraw(), "value")\n\n_redraw()\n\npn.Column(\n    pn.pane.Markdown(\n        "### Hillslope diffusivity, taken apart\\n"\n        "**k_hs** is the number everyone quotes and nobody measures. Here it "\n        "is not a setting: you choose how fast soil creeps at the surface "\n        "(**k_u**) and how quickly that motion dies away downward "\n        "(**\\u0394z_u**), and **k_hs = k_u \\u0394z_u** is reported back.\\n\\n"\n        "Press **\\u25b6** and drag the sliders while it runs. Watch the lower "\n        "panel: **k_u** and **\\u0394z_u** can be traded against each other to "\n        "give the same **k_hs** and the same hillslope \\u2014 but not the same "\n        "motion underneath it."),\n    pn.Row(run, reset_button(do_reset, name="Flatten"),\n           pn.widgets.Button(name="Jump to equilibrium", button_type="default",\n                             on_click=lambda *a: do_equilibrate())),\n    pn.Row(k_u, dz_u, sizing_mode="stretch_width", max_width=DESIGN_WIDTH),\n    pn.Row(E, pn.Spacer(), sizing_mode="stretch_width", max_width=DESIGN_WIDTH),\n    readout, fig_z, fig_u,\n    sizing_mode="stretch_width", max_width=DESIGN_WIDTH,\n).servable(title="Hillslope creep and diffusion")\n\n\nawait write_doc()`)
    self.postMessage({
      type: 'render',
      docs_json: docs_json,
      render_items: render_items,
      root_ids: root_ids
    })
  } catch(e) {
    const traceback = `${e}`
    const tblines = traceback.split('\n')
    self.postMessage({
      type: 'status',
      msg: tblines[tblines.length-2]
    });
    throw e
  }
}

self.onmessage = async (event) => {
  const msg = event.data
  if (msg.type === 'rendered') {
    self.pyodide.runPythonAsync(`
    from panel.io.state import state
    from panel.io.pyodide import _link_docs_worker

    _link_docs_worker(state.curdoc, sendPatch, setter='js')
    `)
  } else if (msg.type === 'patch') {
    self.pyodide.globals.set('patch', msg.patch)
    self.pyodide.runPythonAsync(`
    from panel.io.pyodide import _convert_json_patch
    state.curdoc.apply_json_patch(_convert_json_patch(patch), setter='js')
    `)
    self.postMessage({type: 'idle'})
  } else if (msg.type === 'location') {
    self.pyodide.globals.set('location', msg.location)
    self.pyodide.runPythonAsync(`
    import json
    from panel.io.state import state
    from panel.util import edit_readonly
    if state.location:
        loc_data = json.loads(location)
        with edit_readonly(state.location):
            state.location.param.update({
                k: v for k, v in loc_data.items() if k in state.location.param
            })
    `)
  }
}

startApplication()