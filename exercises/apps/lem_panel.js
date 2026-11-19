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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n"""\nInteractive landscape-evolution demo - streams and hillslopes, in real time.\n\nThis is the source for the live, in-browser demo. It is compiled to a\nstandalone WebAssembly app (no server, no install) with::\n\n    artesian build interactive_demo/lem_panel.py -o _artesian_build -p . \\\\\n        -r numpy -r landlab-2.11.0-cp313-cp313-pyodide_2025_0_wasm32.whl \\\\\n        --strip-wheels --strip-vendored\n\nLandlab has compiled extensions and no Pyodide wheel on PyPI, so the wheel is\nbuilt first (\`\`~/models/landlab-pyodide/build.sh\`\`) and copied into the output\ndirectory, where the build finds it by file name.\n\n\`artesian build\` runs the app in the *building* environment to discover what it\nserves, so \`lemdemo\` and \`landlab\` must be importable here, not merely wheeled\nfor the browser.\n\nThe layout follows DRLP's \`interactive_demo/drlp_panel.py\`: the long profile\nfirst, then the map it was read from and a transect across the ridges.\n"""\nimport numpy as np\nimport panel as pn\nfrom bokeh.plotting import figure\nfrom bokeh.models import (ColorBar, ColumnDataSource, HoverTool,\n                          LinearColorMapper, Range1d)\n\nfrom lemdemo import Landscape, relax_limits\n\npn.extension()\n\n# Width in CSS pixels the app is laid out for; the embedding page scales the\n# demo above it rather than stretching it. 900 is the deployed convention.\nDESIGN_WIDTH = 900\n\nDT = 2000.                # years advanced per animation frame\nNX, DX = 100, 20.         # nodes on a side; node spacing [m]\nSIDE = NX * DX            # [m]\n# Axes ease toward a tight fit with a time constant, as DRLP's do.\nTAU = 0.5                 # seconds\nRELAX = 1.0 - np.exp(-0.033 / TAU)\n\nU0, K0, D0 = 1.0, 4.0, 0.2     # mm/yr, 1e-5 /yr, m^2/yr\n\n# Valley floor to summit; the shaded relief multiplies it.\n_TINT = np.array([[0.36, 0.52, 0.40], [0.80, 0.76, 0.56], [0.97, 0.96, 0.93]])\n_STOPS = [0.0, 0.5, 1.0]\nPALETTE = ["#%02x%02x%02x" % tuple(\n    int(round(255 * np.interp(f, _STOPS, _TINT[:, k]))) for k in range(3))\n    for f in np.linspace(0., 1., 256)]\n\n\ndef make_landscape():\n    """A flat surface with the sliders' settings."""\n    return Landscape(U=U_sl.value * 1e-3, K=K_sl.value * 1e-5, D=D_sl.value,\n                     nx=NX, dx=DX)\n\n\ndef tinted_relief(land, z_top):\n    """Shaded relief tinted by elevation, as the uint32 RGBA Bokeh draws."""\n    f = np.clip(land.elevation / z_top, 0., 1.)\n    rgba = np.empty(f.shape + (4,), dtype=np.uint8)\n    light = 0.45 + 0.55 * land.hillshade()\n    for k in range(3):\n        rgba[..., k] = 255 * np.interp(f, _STOPS, _TINT[:, k]) * light\n    rgba[..., 3] = 255\n    return rgba.view(np.uint32).reshape(f.shape)\n\n\nU_sl = pn.widgets.FloatSlider(label="Rock uplift rate  U  [mm/yr]",\n                              start=0.0, end=2.0, step=0.1, value=U0,\n                              format="0.0")\nK_sl = pn.widgets.FloatSlider(label="Erodibility  K  [10\u207b\u2075 /yr]",\n                              start=1.0, end=10.0, step=0.5, value=K0,\n                              format="0.0")\nD_sl = pn.widgets.FloatSlider(label="Hillslope diffusivity  D  [m\xb2/yr]",\n                              start=0.05, end=0.4, step=0.05, value=D0,\n                              format="0.00")\nrun = pn.widgets.Toggle(label="\u25b6 Run", value=False)\nreset = pn.widgets.Button(label="Start from a flat surface", color="primary")\n\n# \`sim\` (NOT \`state\`, which collides with panel's global pn.state) holds the\n# evolving model between animation frames.\nsim = {"land": make_landscape()}\n\nprofile = ColumnDataSource(data={"x": [], "z": [], "area": []})\ntrunk_xy = ColumnDataSource(data={"x": [], "y": []})\nsection = ColumnDataSource(data={"x": [], "z": []})\nrelief = ColumnDataSource(data={"image": [], "z": [], "area": [], "lap": []})\n_row_y = sim["land"].transect()["y"]\n\nTRUNK, SECTION = "#1f5fa8", "#333333"\n\n# ---- the long profile of the trunk stream\nfig = figure(height=330, width=880, title="t = 0 kyr",\n             x_axis_label="Downstream distance [m]",\n             y_axis_label="Elevation [m]", tools="")\n# Both ranges are explicit Range1d on every figure here: a DataRange1d\n# auto-ranges in the browser and fights a per-frame assignment (see DRLP).\nfig.x_range = Range1d(0.0, 1.0)\nfig.y_range = Range1d(0.0, 1.0)\nfig.line("x", "z", source=profile, line_width=3, color=TRUNK)\n_nodes = fig.scatter("x", "z", source=profile, size=5, color=TRUNK)\nfig.add_tools(HoverTool(renderers=[_nodes], tooltips=[\n    ("Downstream distance", "@x{0} m"),\n    ("Elevation", "@z{0.00} m"),\n    ("Drainage area", "@area{0,0} m\xb2")]))\n\n# ---- the map\nmapper = LinearColorMapper(palette=PALETTE, low=0.0, high=1.0)\nfmap = figure(frame_width=330, frame_height=330, title="Shaded relief",\n              x_axis_label="East [m]", y_axis_label="North [m]", tools="")\nfmap.x_range = Range1d(0.0, SIDE - DX)\nfmap.y_range = Range1d(0.0, SIDE - DX)\n_img = fmap.image_rgba(image="image", source=relief, x=-DX / 2., y=-DX / 2.,\n                       dw=SIDE, dh=SIDE)\nfmap.line("x", "y", source=trunk_xy, line_width=2, color=TRUNK,\n          legend_label="trunk stream")\nfmap.line([0., SIDE - DX], [_row_y, _row_y], line_width=1.5, color=SECTION,\n          line_dash="dashed", legend_label="transect")\nfmap.legend.location = "top_right"\nfmap.legend.background_fill_alpha = 0.7\nfmap.add_layout(ColorBar(color_mapper=mapper, title="Elevation [m]",\n                         width=10), "right")\nfmap.add_tools(HoverTool(renderers=[_img], tooltips=[\n    ("East, north", "$x{0} m, $y{0} m"),\n    ("Elevation", "@z{0.00} m"),\n    ("Drainage area", "@area{0,0} m\xb2"),\n    ("Curvature \u2207\xb2z", "@lap{0.00000} /m")]))\n\n# ---- the transect\nfsec = figure(height=420, width=420,\n              title="West\u2013east transect at north = %.0f m" % _row_y,\n              x_axis_label="East [m]", y_axis_label="Elevation [m]", tools="")\nfsec.x_range = Range1d(0.0, SIDE - DX)\nfsec.y_range = Range1d(0.0, 1.0)\nfsec.line("x", "z", source=section, line_width=2, color=SECTION)\n_snodes = fsec.scatter("x", "z", source=section, size=4, color=SECTION)\nfsec.add_tools(HoverTool(renderers=[_snodes], tooltips=[\n    ("East", "@x{0} m"), ("Elevation", "@z{0.00} m")]))\n\n\ndef draw(fit=False):\n    """Send the current landscape to the three figures.\n\n    The axes ease toward a tight fit and never clip the surface; with \`\`fit\`\`\n    they jump there.\n    """\n    land = sim["land"]\n    rate = 1.0 if fit else RELAX\n    tr = land.trunk()\n    top = max(land.relief, 1.0)\n    length = max(float(tr["distance"][-1]), DX)\n\n    z_end = max(relax_limits((fsec.y_range.end,), (1.08 * top,), rate)[0], top)\n    fsec.y_range.end = fig.y_range.end = mapper.high = z_end\n    fig.x_range.end = max(\n        relax_limits((fig.x_range.end,), (1.02 * length,), rate)[0], length)\n\n    profile.data = {"x": tr["distance"], "z": tr["z"], "area": tr["area"]}\n    trunk_xy.data = {"x": tr["x"], "y": tr["y"]}\n    sec = land.transect()\n    section.data = {"x": sec["x"], "z": sec["z"]}\n    g = land.grid\n    relief.data = {\n        "image": [tinted_relief(land, z_end)],\n        "z": [land.elevation.astype(np.float32)],\n        "area": [g.at_node["drainage_area"].reshape(g.shape)\n                 .astype(np.float32)],\n        "lap": [land.laplacian().astype(np.float32)]}\n    fig.title.text = "t = %.0f kyr      highest point = %.0f m" % (\n        land.t / 1000., land.relief)\n\n\ndef step(event=None):\n    """Advance one frame, reading the sliders as live settings."""\n    land = sim["land"]\n    land.U = U_sl.value * 1e-3\n    land.K = K_sl.value * 1e-5\n    land.D = D_sl.value\n    land.step(DT)\n    draw()\n\n\ndef do_reset(event=None):\n    """Restart from a flat surface with the current slider settings."""\n    sim["land"] = make_landscape()\n    draw(fit=True)\n\n\n# A single play/pause button drives the animation via a periodic callback (the\n# timer only runs while the toggle is on).\n_ticker = pn.state.add_periodic_callback(step, period=33, start=False)  # ~30 fps\n\n\ndef toggle_run(event):\n    if event.new:\n        _ticker.start()\n        run.label = "\u23f8 Pause"\n    else:\n        _ticker.stop()\n        run.label = "\u25b6 Run"\n\n\nrun.param.watch(toggle_run, "value")\nreset.on_click(do_reset)\n\ndraw(fit=True)\n\npn.Column(\n    pn.pane.Markdown(\n        "### A landscape of streams and hillslopes\\n"\n        "Press **\u25b6** to run, then drag the sliders while it plays.\\n\\n"\n        "*\u2202z/\u2202t* = *U* \u2212 *K* *A*<sup>*m*</sup> *S*<sup>*n*</sup> + *D* \u2207\xb2*z*, with *m* = 0.5 and "\n        "*n* = 1. The block is 2 km on a side and drains to its south edge. "\n        "Hover over the long profile, the map, or the transect to read "\n        "values. The clock reads in thousands of years."),\n    pn.Row(run, reset),\n    U_sl, K_sl, D_sl,\n    fig,\n    pn.Row(fmap, fsec),\n    sizing_mode="stretch_width", max_width=DESIGN_WIDTH,\n).servable(title="Landscape evolution interactive demo")\n\n\nawait write_doc()`)
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