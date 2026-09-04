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
      await micropip.install(['bokeh-3.9.2-py3-none-any.whl', 'panel-1.9.4-py3-none-any.whl', 'pyodide-http', 'hillcreep-0.1.0.dev3-py3-none-any.whl', 'artesian-0.1.0.dev0-py3-none-any.whl', 'numpy']);
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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n"""A fault scarp diffusing away, in the browser.\n\nThe companion to \`\`hillcreep_panel.py\`\`. Same two knobs, same transport law,\nsame velocity panel underneath -- and no rivers, so the scarp does nothing but\nrelax. Its shape is a clock, which is what makes it the place to meet\nmorphologic dating.\n\nBuild and view it with::\n\n    artesian build interactive_demo/scarp_panel.py -o _artesian_build \\\n        -p . -p ../artesian -r numpy --serve\n"""\nimport numpy as np\nimport panel as pn\nfrom bokeh.models import ColumnDataSource\nfrom bokeh.models import LinearColorMapper\nfrom bokeh.models import Range1d\nfrom bokeh.palettes import RdBu11\nfrom bokeh.plotting import figure\n\nfrom artesian.live import animator, reset_button, responsive\nfrom hillcreep import Scarp\n\npn.extension()\n\n#: Laid out for this width, and scaled above it by the embedding page. Matches\n#: the hillslope exercise so the two demos sit at the same size on the site.\nDESIGN_WIDTH = 900\nSLIDER_WIDTH = 420\n\nLENGTH = 240.0                  # domain width [m]\nN_NODES = 241                   # dx = 1 m\nHEIGHT = 5.0                    # scarp height, crest to toe [m]\nANGLE = 30.0                    # initial face angle [degrees]\n\nKU_MIN, KU_MAX, KU0 = 0.01, 0.05, 0.02       # [m/yr] at unit slope\nDZU_MIN, DZU_MAX, DZU0 = 0.05, 0.40, 0.10      # [m]\n\n#: Depth reached by the velocity panel, as a multiple of the largest e-folding\n#: depth the slider offers. Derived from the model's own depth scale rather\n#: than hand-picked, and taken from the slider's *bound* so the axis cannot\n#: move while a student drags. Same rule as the hillslope demo.\nZ_DISPLAY_IN_DZU_MAX = 1.0\nZ_DISPLAY = Z_DISPLAY_IN_DZU_MAX * DZU_MAX\nN_ZETA = 121\n\nDX = LENGTH / (N_NODES - 1)\n# Explicit diffusion is stable for dt <= dx**2 / 2 k_hs; a quarter of the limit\n# at the largest k_hs the sliders allow.\nDT = 0.25 * DX ** 2 / (KU_MAX * DZU_MAX)     # 2.5 yr\n\n#: Measured: at the default settings this reaches a morphologic age of 200 m2\n#: -- by which point a 30 degree face has relaxed to about 6 degrees -- in\n#: roughly 320 frames, about 11 s at 30 fps.\nSTEPS_PER_FRAME = 25\n\nzeta = np.linspace(0.0, Z_DISPLAY, N_ZETA)\n\n\ndef _smooth_palette(anchors, n=256):\n    """Interpolate a short palette to \`\`n\`\` colours.\n\n    bokeh's \`\`diverging_palette\`\` leaves a seam at its midpoint where two\n    sub-palettes meet on different near-whites. Interpolating ColorBrewer RdBu\n    through a single white removes it.\n    """\n    rgb = [tuple(int(c[i:i + 2], 16) for i in (1, 3, 5)) for c in anchors]\n    out = []\n    for k in range(n):\n        pos = k * (len(rgb) - 1) / (n - 1.0)\n        i = min(int(pos), len(rgb) - 2)\n        f = pos - i\n        out.append("#%02x%02x%02x" % tuple(\n            int(round(rgb[i][c] + f * (rgb[i + 1][c] - rgb[i][c])))\n            for c in range(3)))\n    return out\n\n\n# \`sim\`, never \`state\`: panel exports pn.state, and shadowing it fails silently.\nsim = {"scarp": Scarp(length=LENGTH, n_nodes=N_NODES, k_u=KU0, dz_u=DZU0,\n                      height=HEIGHT, angle=ANGLE)}\n\nk_u = pn.widgets.FloatSlider(\n    sizing_mode="stretch_width", max_width=SLIDER_WIDTH,\n    name="Surface creep velocity at unit slope  k_u  [m/yr]",\n    start=KU_MIN, end=KU_MAX, step=0.005, value=KU0, format="0.000")\ndz_u = pn.widgets.FloatSlider(\n    sizing_mode="stretch_width", max_width=SLIDER_WIDTH,\n    name="Creep e-folding depth  \u0394z_u  [m]",\n    start=DZU_MIN, end=DZU_MAX, step=0.01, value=DZU0, format="0.00")\n\nreadout = pn.pane.Markdown("", sizing_mode="stretch_width",\n                           styles={"font-size": "1.05em"})\n\n\ndef _sync():\n    s = sim["scarp"]\n    s.k_u = k_u.value\n    s.dz_u = dz_u.value\n    return s\n\n\ndef step():\n    s = _sync()\n    for _ in range(STEPS_PER_FRAME):\n        s.advance(DT)\n    _redraw()\n\n\ndef _redraw():\n    s = _sync()\n    profile.data = {"x": s.x, "z": s.z}\n    initial.data = {"x": s.x, "z": s.initial_profile()}\n\n    u = s.velocity_field(zeta) * 1e3          # mm/yr\n    scale = max(float(np.max(np.abs(u))), 1e-9)\n    velocity.data = {"u": [u]}\n    mapper.low, mapper.high = 0.0, scale\n\n    slope = s.max_slope()\n    fig_z.title.text = (\n        "t = %.1f kyr        k_hs = k_u \u0394z_u = %.4g m\xb2/yr"\n        % (s.t / 1000.0, s.k_hs))\n    fig_u.title.text = ("fastest surface creep = %.2f mm/yr"\n                        % (float(np.max(s.surface_velocity())) * 1e3))\n\n    warn = "" if s.ends_are_quiet() else (\n        "  \xb7  **the scarp has reached the ends of the domain** \u2014 the "\n        "closed form assumes an infinite surface and no longer applies")\n    readout.object = (\n        "**k_hs = k_u \xd7 \u0394z_u = %.3f \xd7 %.2f = %.4f m\xb2/yr**"\n        "  \xb7  morphologic age **k_hs t = %.0f m\xb2**"\n        "  \xb7  steepest slope %.3f (%.1f\xb0), from %.1f\xb0%s"\n        % (s.k_u, s.dz_u, s.k_hs, s.morphologic_age,\n           slope, np.degrees(np.arctan(slope)), ANGLE, warn))\n\n\ndef do_reset():\n    sim["scarp"] = Scarp(length=LENGTH, n_nodes=N_NODES, k_u=k_u.value,\n                         dz_u=dz_u.value, height=HEIGHT, angle=ANGLE)\n    _redraw()\n\n\ns0 = sim["scarp"]\nprofile = ColumnDataSource(data={"x": s0.x, "z": s0.z})\ninitial = ColumnDataSource(data={"x": s0.x, "z": s0.initial_profile()})\nvelocity = ColumnDataSource(data={"u": [s0.velocity_field(zeta) * 1e3]})\n\n# Transport is one-directional here -- everything moves right -- so only the\n# warm half of the diverging palette is used: white is no motion, deep red is\n# fastest. The hillslope demo needs both halves because its divide separates\n# material moving in opposite directions.\nmapper = LinearColorMapper(palette=_smooth_palette(RdBu11)[128:], low=0.0, high=1.0)\n\nfig_z = figure(height=300, width=880, title="",\n               y_axis_label="Elevation [m]", toolbar_location=None)\nfig_z.line("x", "z", source=initial, line_width=1, line_dash="dashed",\n           color="gray", legend_label="freshly cut, %.0f\xb0" % ANGLE)\nfig_z.line("x", "z", source=profile, line_width=3, color="black",\n           legend_label="scarp now")\nfig_z.x_range = Range1d(0.0, LENGTH)\nfig_z.y_range = Range1d(-0.62 * HEIGHT, 0.62 * HEIGHT)\nfig_z.legend.location = "top_right"\nfig_z.legend.background_fill_alpha = 0.6\n\nfig_u = figure(height=240, width=880, title="",\n               x_axis_label="Distance [m]",\n               y_axis_label="Depth below\\nthe surface  \u03b6 [m]",\n               x_range=fig_z.x_range, toolbar_location=None)\nfig_u.y_range = Range1d(Z_DISPLAY, 0.0)\nfig_u.image(image="u", source=velocity, x=0.0, y=0.0, dw=LENGTH, dh=Z_DISPLAY,\n            color_mapper=mapper)\n\nresponsive(fig_z)\nresponsive(fig_u)\n\nrun = animator(step)\n\nfor widget in (k_u, dz_u):\n    widget.param.watch(lambda event: _redraw(), "value")\n\n_redraw()\n\npn.Column(\n    pn.pane.Markdown(\n        "### A fault scarp, left alone\\n"\n        "A fault cuts the ground and leaves a step far steeper than creep "\n        "could ever have built. Nothing holds it \u2014 no rivers, nothing "\n        "carried away \u2014 so it simply relaxes, and its volume never "\n        "changes: what leaves the face lands at its foot.\\n\\n"\n        "Press **\u25b6**. Watch the **morphologic age**, **k_hs t**, rather "\n        "than the clock. The shape depends on those two only through their "\n        "product, so a fast scarp seen early and a slow one seen late are the "\n        "same scarp. That is what makes a surveyed scarp datable \u2014 and "\n        "why it cannot be dated without knowing **k_hs** first."),\n    pn.Row(run, reset_button(do_reset, name="Re-cut the scarp")),\n    pn.Row(k_u, dz_u, sizing_mode="stretch_width", max_width=DESIGN_WIDTH),\n    readout, fig_z, fig_u,\n    sizing_mode="stretch_width", max_width=DESIGN_WIDTH,\n).servable(title="A fault scarp diffusing")\n\n\nawait write_doc()`)
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