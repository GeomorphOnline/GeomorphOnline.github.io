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
      await micropip.install(['bokeh-3.9.2-py3-none-any.whl', 'panel-1.9.4-py3-none-any.whl', 'pyodide-http', 'grlp-2.1.0-py3-none-any.whl', 'numpy', 'scipy']);
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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n"""\nInteractive GRLP demo \u2014 a single gravel river adjusting in real time.\n\nThis is the source for the live, in-browser demo embedded in the documentation.\nIt is compiled to a standalone WebAssembly app (no server, no install) with::\n\n    panel convert grlp_panel.py --to pyodide-worker --out <dir> \\\\\n        --requirements <grlp wheel> numpy scipy networkx\n\nGRLP then runs entirely in the browser via Pyodide. Press play and drag the\nsliders while it runs to change the boundary conditions and watch the long\nprofile respond transiently \u2014 Lane's balance, played out in time.\n\nA Jupyter-notebook version of the same demo lives alongside this file\n(interactive_single_segment*.ipynb) for classroom / notebook use.\n"""\nimport asyncio\n\nimport numpy as np\nimport panel as pn\nfrom bokeh.plotting import figure\nfrom bokeh.models import ColumnDataSource\n\nimport grlp\n\npn.extension()\n\nYEAR = 31556926.        # seconds per year\nDT = 2 * YEAR           # 2 years advanced per animation frame (small step -> smooth)\n\n\ndef make_equilibrium(Qw, Qs, zbl):\n    """A single segment started at steady state for the given inputs."""\n    lp = grlp.LongProfile()\n    lp.basic_constants()\n    lp.bedload_lumped_constants()\n    lp.set_hydrologic_constants()\n    lp.set_x(dx=1000., nx=60, x0=1000.)\n    lp.set_z(S0=-1e-2, z1=zbl)\n    lp.set_Q(Qw)\n    lp.set_B(100.)\n    lp.set_niter(3)\n    lp.set_uplift_rate(0.)\n    lp.set_z_bl(zbl)\n    lp.set_Qs_input_upstream(Qs)\n    lp.evolve_threshold_width_river(nt=10, dt=1e13)\n    return lp\n\n\nQ0, QS0, ZBL0 = 100., 0.02, 0.\n# \`sim\` (NOT \`state\`, which collides with panel's global pn.state) holds the\n# evolving model between animation frames.\nsim = {"lp": make_equilibrium(Q0, QS0, ZBL0), "t": 0.}\n_lp = sim["lp"]\n\n\ndef _bl_xy(zbl):\n    return {"x": [_lp.x.min() / 1000., _lp.x.max() / 1000.], "z": [zbl, zbl]}\n\n\nprofile = ColumnDataSource(data={"x": _lp.x / 1000., "z": _lp.z})\nbaselevel = ColumnDataSource(data=_bl_xy(ZBL0))\n\n# The plot fills whatever column it is embedded in -- the documentation page, a\n# course page, a projected slide -- while holding its shape. \`scale_width\`\n# scales height with width, so ASPECT_RATIO fixes the vertical exaggeration:\n# a reader on an ultrawide monitor and one on a laptop see the same river at\n# the same apparent steepness. \`stretch_width\` would not do this; it pins the\n# height, so a wider window silently flattens the profile.\n#\n# Growth is deliberately unbounded: the figure takes whatever width it is\n# given. Holding the ratio means the height follows, so on a very wide screen\n# it becomes tall -- about 1340 px in a 2400 px container. That is the price of\n# a constant vertical exaggeration, and it is the right way round for a figure\n# people read slopes off. Set \`max_width\` on the figure to cap it.\nASPECT_RATIO = 680. / 380.    # the proportions this figure was designed at\n\nfig = figure(height=380, sizing_mode="scale_width",\n             aspect_ratio=ASPECT_RATIO,\n             title="t = 0.0 kyr",\n             x_axis_label="Downstream distance [km]",\n             y_axis_label="Elevation [m]")\nfig.line("x", "z", source=profile, line_width=3)\nfig.line("x", "z", source=baselevel, line_width=1, line_dash="dashed",\n         color="gray", legend_label="base level")\nfig.y_range.start, fig.y_range.end = -120, 1300\nfig.legend.location = "top_right"\n\n# The sliders grow with the layout but stop at SLIDER_WIDTH, so they occupy a\n# sensible fraction of the pane rather than spanning it. Panel's own default is\n# a fixed ~300 px, which left them stranded beneath a much wider figure.\n#\n# Note this bounds them in *layout* pixels. A page that scales the whole app --\n# see the note on DESIGN_WIDTH below -- enlarges these along with everything\n# else, so a bounded slider is not a small one on a large display.\nSLIDER_WIDTH = 520\n\nQw = pn.widgets.FloatSlider(name="Water discharge  Q  [m\xb3/s]",\n                            start=20, end=600, step=20, value=Q0,\n                            sizing_mode="stretch_width", max_width=SLIDER_WIDTH)\nQs = pn.widgets.FloatSlider(name="Bed-load sediment input  Q\u209b  [m\xb3/s]",\n                            start=0.005, end=0.06, step=0.005, value=QS0,\n                            format="0.000",\n                            sizing_mode="stretch_width", max_width=SLIDER_WIDTH)\nzbl = pn.widgets.FloatSlider(name="Base level  [m]",\n                             start=-100, end=100, step=5, value=ZBL0,\n                             sizing_mode="stretch_width",\n                             max_width=SLIDER_WIDTH)\n\nrun = pn.widgets.Toggle(name="\u25b6 Run", value=False)\nreset = pn.widgets.Button(name="Set to equilibrium", button_type="primary")\n\n\ndef step(event=None):\n    """Advance one frame, reading the sliders as live boundary conditions."""\n    lp = sim["lp"]\n    lp.set_Q(Qw.value)\n    lp.set_Qs_input_upstream(Qs.value)\n    lp.set_z_bl(zbl.value)\n    lp.evolve_threshold_width_river(nt=1, dt=DT)\n    sim["t"] += DT\n    profile.data = {"x": lp.x / 1000., "z": lp.z}\n    baselevel.data = _bl_xy(zbl.value)\n    fig.title.text = "t = %.1f kyr" % (sim["t"] / (1000. * YEAR))\n\n\ndef do_reset(event=None):\n    """Restart from equilibrium for the current slider settings."""\n    sim["lp"] = make_equilibrium(Qw.value, Qs.value, zbl.value)\n    sim["t"] = 0.\n    lp = sim["lp"]\n    profile.data = {"x": lp.x / 1000., "z": lp.z}\n    baselevel.data = _bl_xy(zbl.value)\n    fig.title.text = "t = 0.0 kyr"\n\n\n# A single play/pause button drives the animation via a periodic callback (the\n# timer only runs while the toggle is on).\n#\n# The tick is a coroutine, and the sleep at the end of it is load-bearing.\n# Panel's PeriodicCallback loop is\n#\n#     while True:\n#         start = time.monotonic()\n#         await func()\n#         timeout = period - (time.monotonic() - start)\n#         if timeout > 0:\n#             await asyncio.sleep(timeout)\n#\n# and awaiting a coroutine is not itself a suspension point, so that sleep is\n# the loop's ONLY yield. Give it a plain function and, on any frame that takes\n# longer than the period, the loop spins without ever returning to the event\n# loop -- and in the browser that loop is what applies widget changes. The\n# controls do not slow down, they stop responding entirely, until some frame\n# happens to come in under budget. Since frame cost here is uneven, that shows\n# up as the sliders freezing "sometimes".\n#\n# artesian.live.animator does the same thing, and carries the measurements.\n# This file deliberately does not import it, so that the demo depends only on\n# panel and bokeh.\nasync def _tick():\n    step()\n    await asyncio.sleep(0)          # hand the event loop back, every frame\n\n\n_ticker = pn.state.add_periodic_callback(_tick, period=33, start=False)  # ~30 fps\n\n\ndef toggle_run(event):\n    if event.new:\n        _ticker.start()\n        run.name = "\u23f8 Pause"\n    else:\n        _ticker.stop()\n        run.name = "\u25b6 Run"\n\n\nrun.param.watch(toggle_run, "value")\nreset.on_click(do_reset)\n\n# DESIGN_WIDTH is a contract with the page embedding this app, not something\n# enforced here. Everything above is laid out to look right at roughly this\n# width; an embedding page that wants the app larger should scale the whole\n# thing (CSS \`zoom\` on the frame) rather than stretch it, so the text, the\n# slider handles and the plot enlarge together. Stretching alone leaves the\n# controls the same physical size while the figure grows, and eventually they\n# are hard to read and to hit.\nDESIGN_WIDTH = 900\n\npn.Column(\n    pn.pane.Markdown(\n        "### Watch a gravel river adjust\\n"\n        "Press **\u25b6** to run, then drag the sliders while it plays: more "\n        "**sediment** aggrades and steepens the profile; more **water** lowers "\n        "its slope; dropping **base level** sends an incision wave upstream. "\n        "**Set to equilibrium** jumps to the steady state for the current "\n        "settings.", sizing_mode="stretch_width"),\n    pn.Row(run, reset),   # buttons keep their natural size\n    Qw, Qs, zbl,\n    fig,\n    sizing_mode="stretch_width",\n).servable(title="GRLP interactive demo")\n\n\nawait write_doc()`)
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