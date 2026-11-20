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
      await micropip.install(['bokeh-3.9.2-py3-none-any.whl', 'panel-1.9.4-py3-none-any.whl', 'pyodide-http', 'lemdemo-0.1.0.dev0-py3-none-any.whl', 'numpy', 'landlab-2.11.0-cp313-cp313-pyodide_2025_0_wasm32.whl']);
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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n"""\nInteractive landscape-evolution demo - streams and hillslopes, in real time.\n\nThis is the source for the live, in-browser demo. It is compiled to a\nstandalone WebAssembly app (no server, no install) with::\n\n    artesian build interactive_demo/lem_panel.py -o _artesian_build -p . \\\\\n        -r numpy -r landlab-2.11.0-cp313-cp313-pyodide_2025_0_wasm32.whl \\\\\n        --strip-wheels --strip-vendored\n\nLandlab has compiled extensions and no Pyodide wheel on PyPI, so the wheel is\nbuilt first (\`\`~/models/landlab-pyodide/build.sh\`\`) and copied into the output\ndirectory, where the build finds it by file name.\n\n\`artesian build\` runs the app in the *building* environment to discover what it\nserves, so \`lemdemo\` and \`landlab\` must be importable here, not merely wheeled\nfor the browser.\n\nThe layout follows DRLP's \`interactive_demo/drlp_panel.py\`: the long profile\nfirst, then the map it was read from and the profile over a hill crest.\n\nA click on the map chooses the stream and a right-click (or a shift-click)\nchooses the hill crest. Bokeh sends no event for the right mouse button, so\nboth come through \`pick\`, a data source that JavaScript in the page writes to.\n"""\nimport numpy as np\nimport panel as pn\nfrom bokeh.plotting import figure\nfrom bokeh.events import MouseEnter, MouseLeave, MouseMove, Tap\nfrom bokeh.models import (ColorBar, ColumnDataSource, CustomJS, HoverTool,\n                          LinearColorMapper, Range1d)\n\nfrom lemdemo import Landscape, relax_limits\n\npn.extension()\n\n# Width in CSS pixels the app is laid out for; the embedding page scales the\n# demo above it rather than stretching it. 900 is the deployed convention.\nDESIGN_WIDTH = 900\n\nDT = 2000.                # years advanced per animation frame\nNX, DX = 100, 20.         # nodes on a side; node spacing [m]\nSIDE = NX * DX            # [m]\n# Axes ease toward a tight fit with a time constant, as DRLP's do.\nTAU = 0.5                 # seconds\nRELAX = 1.0 - np.exp(-0.033 / TAU)\n\nU0, K0, D0 = 1.0, 4.0, 0.2     # mm/yr, 1e-5 /yr, m^2/yr\n\n# Valley floor to summit; the shaded relief multiplies it.\n_TINT = np.array([[0.36, 0.52, 0.40], [0.80, 0.76, 0.56], [0.97, 0.96, 0.93]])\n_STOPS = [0.0, 0.5, 1.0]\nPALETTE = ["#%02x%02x%02x" % tuple(\n    int(round(255 * np.interp(f, _STOPS, _TINT[:, k]))) for k in range(3))\n    for f in np.linspace(0., 1., 256)]\n\n\ndef make_landscape():\n    """A flat surface with the sliders' settings."""\n    return Landscape(U=U_sl.value * 1e-3, K=K_sl.value * 1e-5, D=D_sl.value,\n                     nx=NX, dx=DX)\n\n\ndef tinted_relief(land, z_top):\n    """Shaded relief tinted by elevation, as the uint32 RGBA Bokeh draws."""\n    f = np.clip(land.elevation / z_top, 0., 1.)\n    rgba = np.empty(f.shape + (4,), dtype=np.uint8)\n    light = 0.45 + 0.55 * land.hillshade()\n    for k in range(3):\n        rgba[..., k] = 255 * np.interp(f, _STOPS, _TINT[:, k]) * light\n    rgba[..., 3] = 255\n    return rgba.view(np.uint32).reshape(f.shape)\n\n\nU_sl = pn.widgets.FloatSlider(label="Rock uplift rate  U  [mm/yr]",\n                              start=0.0, end=2.0, step=0.1, value=U0,\n                              format="0.0")\nK_sl = pn.widgets.FloatSlider(label="Erodibility  K  [10\u207b\u2075 /yr]",\n                              start=1.0, end=10.0, step=0.5, value=K0,\n                              format="0.0")\nD_sl = pn.widgets.FloatSlider(label="Hillslope diffusivity  D  [m\xb2/yr]",\n                              start=0.05, end=0.4, step=0.05, value=D0,\n                              format="0.00")\nrun = pn.widgets.Toggle(label="\u25b6 Run", value=False)\nreset = pn.widgets.Button(label="Start from a flat surface", color="primary")\n\n# \`sim\` (NOT \`state\`, which collides with panel's global pn.state) holds the\n# evolving model between animation frames, and the two points picked on the\n# map: (east, north) [m], or None for the trunk stream and the highest point.\nsim = {"land": make_landscape(), "stream_at": None, "hill_at": None}\n\nprofile = ColumnDataSource(data={"x": [], "z": [], "area": []})\nstream_xy = ColumnDataSource(data={"x": [], "y": []})\nhill = ColumnDataSource(data={"s": [], "z": [], "area": [], "lap": []})\nhill_xy = ColumnDataSource(data={"x": [], "y": []})\ncrest_xy = ColumnDataSource(data={"x": [], "y": []})\nparabola = ColumnDataSource(data={"s": [], "z": []})\nrelief = ColumnDataSource(data={"image": [], "z": [], "area": [], "lap": []})\npick = ColumnDataSource(data={"x": [], "y": [], "hill": [], "n": []})\n\nSTREAM, HILL, PARABOLA = "#1f5fa8", "#333333", "#c8501e"\n\n# ---- the long profile of the stream\nfig = figure(height=330, width=880, title="t = 0 kyr",\n             x_axis_label="Downstream distance [m]",\n             y_axis_label="Elevation [m]", tools="")\n# Both ranges are explicit Range1d on every figure here: a DataRange1d\n# auto-ranges in the browser and fights a per-frame assignment (see DRLP).\nfig.x_range = Range1d(0.0, 1.0)\nfig.y_range = Range1d(0.0, 1.0)\nfig.line("x", "z", source=profile, line_width=3, color=STREAM)\n_nodes = fig.scatter("x", "z", source=profile, size=5, color=STREAM)\nfig.add_tools(HoverTool(renderers=[_nodes], tooltips=[\n    ("Downstream distance", "@x{0} m"),\n    ("Elevation", "@z{0.00} m"),\n    ("Drainage area", "@area{0,0} m\xb2")]))\n\n# ---- the map\nmapper = LinearColorMapper(palette=PALETTE, low=0.0, high=1.0)\nfmap = figure(frame_width=330, frame_height=330, title="Shaded relief",\n              x_axis_label="East [m]", y_axis_label="North [m]", tools="")\nfmap.x_range = Range1d(0.0, SIDE - DX)\nfmap.y_range = Range1d(0.0, SIDE - DX)\n_img = fmap.image_rgba(image="image", source=relief, x=-DX / 2., y=-DX / 2.,\n                       dw=SIDE, dh=SIDE)\nfmap.line("x", "y", source=stream_xy, line_width=2, color=STREAM,\n          legend_label="stream")\nfmap.line("x", "y", source=hill_xy, line_width=2, color=HILL,\n          legend_label="hillslope")\nfmap.scatter("x", "y", source=crest_xy, size=7, color=HILL,\n             line_color="white")\nfmap.legend.location = "top_right"\nfmap.legend.background_fill_alpha = 0.7\nfmap.add_layout(ColorBar(color_mapper=mapper, title="Elevation [m]",\n                         width=10), "right")\nfmap.add_tools(HoverTool(renderers=[_img], tooltips=[\n    ("East, north", "$x{0} m, $y{0} m"),\n    ("Elevation", "@z{0.00} m"),\n    ("Drainage area", "@area{0,0} m\xb2"),\n    ("Curvature \u2207\xb2z", "@lap{0.00000} /m")]))\n\n# A left click writes its point to \`pick\`; so does a right click, which the\n# browser reports as "contextmenu" and Bokeh does not pass on. The listener for\n# it goes on once, the first time the pointer enters the map, and uses the\n# point Bokeh last reported under the pointer. It listens on the way down\n# (capture), because Bokeh stops the event at the plot on the way back up.\n_PICK = """\nconst hill = %s;\nconst p = (%s);\nif (p == null) return;\npick.data = {x: [p[0]], y: [p[1]], hill: [hill ? 1 : 0],\n             n: [(pick.data.n[0] ?? 0) + 1]};\n"""\nfmap.js_on_event(Tap, CustomJS(args={"pick": pick}, code=_PICK % (\n    "cb_obj.modifiers != null && cb_obj.modifiers.shift",\n    "[cb_obj.x, cb_obj.y]")))\nfmap.js_on_event(MouseMove, CustomJS(code="window._lem_at = [cb_obj.x, cb_obj.y];"))\nfmap.js_on_event(MouseLeave, CustomJS(code="window._lem_at = null;"))\nfmap.js_on_event(MouseEnter, CustomJS(args={"pick": pick}, code="""\nwindow._lem_at = [cb_obj.x, cb_obj.y];\nif (window._lem_listening) return;\nwindow._lem_listening = true;\ndocument.addEventListener("contextmenu", (event) => {\n    if (window._lem_at == null) return;\n    event.preventDefault();\n    event.stopPropagation();\n""" + _PICK % ("true", "window._lem_at") + """\n}, true);\n"""))\n\n# ---- the profile over the hill crest\nfhill = figure(height=420, width=420, title="Hill crest",\n               x_axis_label="Distance from the crest [m]",\n               y_axis_label="Elevation [m]", tools="")\nfhill.x_range = Range1d(-1.0, 1.0)\nfhill.y_range = Range1d(0.0, 1.0)\nfhill.line("s", "z", source=parabola, line_width=2, color=PARABOLA,\n           line_dash="dashed", legend_label="parabola at the crest")\nfhill.line("s", "z", source=hill, line_width=2, color=HILL,\n           legend_label="hillslope")\n_hnodes = fhill.scatter("s", "z", source=hill, size=5, color=HILL)\nfhill.legend.location = "bottom_center"\nfhill.legend.background_fill_alpha = 0.7\nfhill.add_tools(HoverTool(renderers=[_hnodes], tooltips=[\n    ("Distance from the crest", "@s{0} m"),\n    ("Elevation", "@z{0.00} m"),\n    ("Drainage area", "@area{0,0} m\xb2"),\n    ("Curvature \u2207\xb2z", "@lap{0.00000} /m")]))\n\n\ndef draw(fit=False):\n    """Send the current landscape to the three figures.\n\n    The stream and the hillslope are found again on every call, from the\n    points picked on the map. The axes ease toward a tight fit and never clip\n    the surface; with \`\`fit\`\` they jump there.\n    """\n    land = sim["land"]\n    rate = 1.0 if fit else RELAX\n    at = sim["stream_at"]\n    tr = land.trunk() if at is None else land.stream(*at)\n    at = sim["hill_at"]\n    hs = land.hillslope() if at is None else land.hillslope(*at)\n    top = max(land.relief, 1.0)\n    length = max(float(tr["distance"][-1]), DX)\n\n    z_end = max(relax_limits((fig.y_range.end,), (1.08 * top,), rate)[0], top)\n    fig.y_range.end = mapper.high = z_end\n    fig.x_range.end = max(\n        relax_limits((fig.x_range.end,), (1.02 * length,), rate)[0], length)\n\n    profile.data = {"x": tr["distance"], "z": tr["z"], "area": tr["area"]}\n    stream_xy.data = {"x": tr["x"], "y": tr["y"]}\n\n    # The hillslope's axes hold the whole profile; the parabola runs off them.\n    s, z = hs["s"], hs["z"]\n    pad = 0.05 * max(s[-1] - s[0], DX)\n    drop = max(z.max() - z.min(), 0.01)\n    want = (min(s[0], -DX) - pad, max(s[-1], DX) + pad,\n            z.min() - 0.05 * drop, z.max() + 0.08 * drop)\n    now = (fhill.x_range.start, fhill.x_range.end,\n           fhill.y_range.start, fhill.y_range.end)\n    w = relax_limits(now, want, rate)\n    fhill.x_range.start, fhill.x_range.end = min(w[0], s[0]), max(w[1], s[-1])\n    fhill.y_range.start, fhill.y_range.end = min(w[2], z.min()), max(w[3], z.max())\n    hill.data = {"s": s, "z": z, "area": hs["area"], "lap": hs["laplacian"]}\n    hill_xy.data = {"x": hs["x"], "y": hs["y"]}\n    crest_xy.data = {"x": hs["x"][[hs["crest"]]], "y": hs["y"][[hs["crest"]]]}\n    along = np.linspace(want[0], want[1], 81)\n    parabola.data = {"s": along,\n                     "z": np.polynomial.polynomial.polyval(along, hs["parabola"])}\n    # Rounded before printing, and 0. added, so that a flat surface reads 0.00\n    # and not -0.00.\n    fhill.title.text = "Hill crest: \u2207\xb2z = %.5f /m      \u2212D \u2207\xb2z = %.2f mm/yr" % (\n        round(hs["curvature"], 5) + 0.,\n        round(-1000. * land.D * hs["curvature"], 2) + 0.)\n    g = land.grid\n    relief.data = {\n        "image": [tinted_relief(land, z_end)],\n        "z": [land.elevation.astype(np.float32)],\n        "area": [g.at_node["drainage_area"].reshape(g.shape)\n                 .astype(np.float32)],\n        "lap": [land.laplacian().astype(np.float32)]}\n    fig.title.text = "t = %.0f kyr      highest point = %.0f m" % (\n        land.t / 1000., land.relief)\n\n\ndef step(event=None):\n    """Advance one frame, reading the sliders as live settings."""\n    land = sim["land"]\n    land.U = U_sl.value * 1e-3\n    land.K = K_sl.value * 1e-5\n    land.D = D_sl.value\n    land.step(DT)\n    draw()\n\n\ndef do_pick(attr, old, new):\n    """Take the point clicked on the map as the stream's or the hill crest's."""\n    if len(new["x"]) == 0:\n        return\n    x, y = float(new["x"][0]), float(new["y"][0])\n    if not (0. <= x <= SIDE - DX and 0. <= y <= SIDE - DX):\n        return\n    sim["hill_at" if new["hill"][0] else "stream_at"] = (x, y)\n    draw(fit=True)\n\n\ndef do_reset(event=None):\n    """Restart from a flat surface with the current slider settings."""\n    sim["land"] = make_landscape()\n    draw(fit=True)\n\n\n# A single play/pause button drives the animation via a periodic callback (the\n# timer only runs while the toggle is on).\n_ticker = pn.state.add_periodic_callback(step, period=33, start=False)  # ~30 fps\n\n\ndef toggle_run(event):\n    if event.new:\n        _ticker.start()\n        run.label = "\u23f8 Pause"\n    else:\n        _ticker.stop()\n        run.label = "\u25b6 Run"\n\n\nrun.param.watch(toggle_run, "value")\nreset.on_click(do_reset)\npick.on_change("data", do_pick)\n\ndraw(fit=True)\n\npn.Column(\n    pn.pane.Markdown(\n        "### A landscape of streams and hillslopes\\n"\n        "Press **\u25b6** to run, then drag the sliders while it plays.\\n\\n"\n        "*\u2202z/\u2202t* = *U* \u2212 *K* *A*<sup>*m*</sup> *S*<sup>*n*</sup> + *D* \u2207\xb2*z*, with *m* = 0.5 and "\n        "*n* = 1. The block is 2 km on a side and drains to its south edge. "\n        "Click the map to choose the stream; right-click it (or "\n        "shift-click) to choose the hill crest. Hover over the long profile, "\n        "the map, or the hillslope to read values. The clock reads in "\n        "thousands of years."),\n    pn.Row(run, reset),\n    U_sl, K_sl, D_sl,\n    fig,\n    pn.Row(fmap, fhill),\n    sizing_mode="stretch_width", max_width=DESIGN_WIDTH,\n).servable(title="Landscape evolution interactive demo")\n\n\nawait write_doc()`)
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