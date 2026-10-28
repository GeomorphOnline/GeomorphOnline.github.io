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
      await micropip.install(['bokeh-3.9.2-py3-none-any.whl', 'panel-1.9.4-py3-none-any.whl', 'pyodide-http', 'drlp-0.1.0.dev3-py3-none-any.whl', 'numpy', 'scipy']);
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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n"""\nInteractive DRLP demo - a detachment-limited river long profile, in real time.\n\nThis is the source for the live, in-browser demo. It is compiled to a\nstandalone WebAssembly app (no server, no install) with::\n\n    artesian build interactive_demo/drlp_panel.py -o _artesian_build \\\\\n        -p . -p ../artesian -r numpy scipy --serve\n\n\`artesian build\` runs the app in the *building* environment to discover what it\nserves, so \`drlp\` must be importable here, not merely wheeled for the browser:\n\`pip install -e .\` first.\n\nDRLP then runs entirely in the browser via Pyodide, which carries both numpy\nand scipy. Press play and drag the sliders while it runs.\n\nThe sibling demo for the gravel-bed, transport-limited case is GRLP's\n\`interactive_demo/grlp_panel.py\`, and this one deliberately mirrors its\nlayout. The physics is the contrast: GRLP is diffusive, DRLP is advective.\n"""\nimport numpy as np\nimport panel as pn\nfrom bokeh.plotting import figure\nfrom bokeh.models import ColumnDataSource, Range1d\n\nfrom drlp import LongProfile\nfrom drlp.longprofile import relax_limits\n\npn.extension()\n\n# Width in CSS pixels the app is laid out for; the embedding page scales the\n# demo above it rather than stretching it. 900 is the deployed convention --\n# hillcreep's panels declare it and every GeomorphOnline exercise page carries\n# data-design-width="900".\nDESIGN_WIDTH = 900\n\nYEAR = 31556926.          # seconds per year\nDT = 1e11                 # ~3 kyr advanced per animation frame\n# The elevation axis tightens with a time constant rather than a magic rate:\n# 1 - exp(-frame/TAU) of the remaining gap per frame, at ~30 fps. Half a\n# second reads as the view following the river rather than chasing it.\nTAU_Y = 0.5               # seconds\nRELAX_Y = 1.0 - np.exp(-0.033 / TAU_Y)\nNX, DX = 60, 500.         # 0.5 to 30 km\nK_XA, P_XA = 1.0, 7 / 4.  # Hack's law:  A = k_xA x**P_xA\nRUNOFF = 1e-8             # m/s, about 315 mm/yr\n\n\ndef make_steady(logK, m, n, U_mmyr, zbl):\n    """A profile started at the steady state for the given settings."""\n    lp = LongProfile()\n    lp.set_x(dx=DX, nx=NX, x0=DX)\n    lp.set_A(k_xA=K_XA, P_xA=P_XA)\n    lp.set_Q(R=RUNOFF)\n    lp.set_K(10.**logK, basis="Q")\n    lp.set_mn(m=m, n=n)\n    lp.set_uplift_rate(U_mmyr * 1e-3 / YEAR)\n    lp.set_bl(z=zbl)\n    lp.set_steady_state()\n    return lp\n\n\n# A mountain river rather than a hill: about 2 km of relief at these\n# settings, against 390 m at the previous defaults.\nLOGK0, M0, N0, U0, ZBL0 = -9.0, 0.5, 1.0, 0.5, 0.0\n# \`sim\` (NOT \`state\`, which collides with panel's global pn.state) holds the\n# evolving model between animation frames.\nsim = {"lp": make_steady(LOGK0, M0, N0, U0, ZBL0), "t": 0., "z_bl": ZBL0}\n_lp = sim["lp"]\n\n\ndef _bl_xy(z_bl):\n    return {"x": [_lp.x.min() / 1000., _lp.x.max() / 1000.], "z": [z_bl, z_bl]}\n\n\nprofile = ColumnDataSource(data={"x": _lp.x / 1000., "z": _lp.z})\nbaselevel = ColumnDataSource(data=_bl_xy(ZBL0))\n\n# 880 px against a 900 px design width, as hillcreep's panels are: the plot\n# should fill the frame it is scaled inside, not sit in the middle of it.\nfig = figure(height=420, width=880, title="t = 0.0 kyr",\n             x_axis_label="Downstream distance [km]",\n             y_axis_label="Elevation [m]")\n\n# BOTH ranges are explicit Range1d, and that is load-bearing. figure() hands\n# back a DataRange1d, which auto-ranges to the renderers' data IN THE BROWSER\n# with range_padding = 0.1. Assignments to its start and end from Python are\n# hints the client recomputes around rather than limits that govern, so a\n# per-frame assignment fights the auto-range instead of driving the axis --\n# and the axis then does not follow the profile. hillcreep replaces its ranges\n# for the same reason ("replaced on every redraw").\n#\n# This also defeated the headless tests of the tracking: reading back\n# fig.y_range.start returns whatever Python last wrote to it, whichever class\n# it is, so those checks asserted on my own assignment rather than on what\n# renders. The structural assertion is in tests/test_panel_axis.py.\nfig.x_range = Range1d(0.0, 1.0)      # set from the grid below\nfig.y_range = Range1d(0.0, 1.0)      # replaced on every redraw\nfig.line("x", "z", source=profile, line_width=3)\nfig.line("x", "z", source=baselevel, line_width=1, line_dash="dashed",\n         color="gray", legend_label="base level")\nfig.legend.location = "top_right"\nfig.x_range.start = float(_lp.x.min() / 1000.)\nfig.x_range.end = float(_lp.x_bl / 1000.)\n\nlogK = pn.widgets.FloatSlider(\n    name="Erodibility  log\u2081\u2080 K  (units depend on m and n)",\n    start=-10, end=-7, step=0.1, value=LOGK0, format="0.0")\nm_sl = pn.widgets.FloatSlider(name="Discharge exponent  m",\n                              start=0.1, end=1.0, step=0.05, value=M0,\n                              format="0.00")\nn_sl = pn.widgets.FloatSlider(name="Slope exponent  n",\n                              start=0.5, end=2.5, step=0.1, value=N0,\n                              format="0.0")\nU_sl = pn.widgets.FloatSlider(name="Rock uplift rate  U  [mm/yr]",\n                              start=0.0, end=2.0, step=0.1, value=U0,\n                              format="0.0")\n# Base level falls, and never rises on a river that already exists: stream\n# power erodes and never deposits, so nothing here can bring a drowned bed\n# back up.\n#\n# Lowering it is a forcing applied to the running profile. RAISING it rebuilds\n# the river at the new base level instead, which is a different initial\n# condition rather than an aggradation the model cannot perform. Refusing the\n# drag outright was the first attempt and it was worse: once the slider\n# reached its floor, nothing could ever bring it back and the control was\n# one-way for the rest of the session.\nzbl = pn.widgets.FloatSlider(name="Base level  [m]  (lower to force, raise to rebuild)",\n                             start=-2000, end=0, step=20, value=ZBL0)\n_bl_floor = {"z": ZBL0}\n\n\ndef on_base_level(event):\n    if _syncing["on"] or bl_lock.value:\n        return                          # the lock is driving it\n    if event.new > _bl_floor["z"]:\n        _bl_floor["z"] = event.new\n        do_reset()                      # a rise is a rebuild, not a forcing\n    else:\n        _bl_floor["z"] = event.new\n        sim["z_bl"] = event.new\n\nrun = pn.widgets.Toggle(label="\u25b6 Run", value=False)\nreset = pn.widgets.Button(label="Set to steady state", button_type="primary")\n\n# Locking base level to the uplift rate puts the outlet on the same rising\n# rock as the rest of the profile, so the WHOLE long profile goes up at U and\n# there is no RELATIVE base-level change left. The river still erodes -- it\n# removes rock at U minus whatever it is actually incising -- but it loses its\n# steady state, because the forcing that held the steady state is gone. A\n# landscape can uplift everywhere and give its rivers nothing to cut into.\n#\n# Unlocked, base level is independent and the only direction is down, because\n# stream power erodes and never deposits.\nbl_lock = pn.widgets.Toggle(label="\\U0001f513 Base level free",\n                            button_type="default", width=210)\n_syncing = {"on": False}\n\n\ndef toggle_lock(event):\n    if event.new:\n        bl_lock.label = "\\U0001f512 Locked to uplift"\n        bl_lock.button_type = "warning"\n        zbl.disabled = True\n    else:\n        bl_lock.label = "\\U0001f513 Base level free"\n        bl_lock.button_type = "default"\n        # Hand control back without a jump. The lock may have carried base\n        # level far above the slider's range -- 19 km after 38 Myr at 0.5\n        # mm/yr -- and simply clamping it would drop base level by that much\n        # in one frame. So shift the datum instead: subtract the same constant\n        # from the profile and from base level, which changes nothing physical\n        # (the model has no absolute datum, only relief and slope) and leaves\n        # the river exactly as the lock left it.\n        target = float(min(max(sim["z_bl"], zbl.start), zbl.end))\n        shift = sim["z_bl"] - target\n        sim["lp"].z = sim["lp"].z - shift\n        sim["z_bl"] = target\n        _syncing["on"] = True\n        zbl.value = target\n        _syncing["on"] = False\n        _bl_floor["z"] = target\n        zbl.disabled = False\n        profile.data = {"x": sim["lp"].x / 1000., "z": sim["lp"].z}\n        baselevel.data = _bl_xy(target)\n        _fit_y(sim["lp"])\n\n\n\ndef _fit_y(lp):\n    """Fit the elevation axis to the profile, tightly.\n\n    Steady relief spans four orders of magnitude across these sliders -- n\n    changes how hard the profile answers a given U/K -- so no fixed range\n    works and the axis has to be computed. It is fitted TIGHTLY rather than\n    reserving room for a base-level drop: the axis now follows the drop as it\n    happens, so holding empty space for one would only waste the plot. The\n    reserved version gave the river 44% of the height at these defaults.\n    """\n    lo, hi = lp.elevation_limits()\n    fig.y_range.start, fig.y_range.end = lo, hi\n\n\ndef _track_y(lp):\n    """Move the axis toward a tight fit: outward at once, inward gradually.\n\n    Outward immediately, because a profile that has left the frame looks\n    exactly like one that stopped moving. Inward over about half a second, so\n    the view tightens back after a transient instead of being stranded. The\n    expand-only rule it replaces could not tighten at all: after uplift was\n    raised to 2 mm/yr and lowered to 0.1, the river occupied 3.5% of the\n    plot's height and stayed there.\n    """\n    fig.y_range.start, fig.y_range.end = relax_limits(\n        (fig.y_range.start, fig.y_range.end), lp.elevation_limits(), RELAX_Y)\n\n\ndef step(event=None):\n    """Advance one frame, reading the sliders as live settings."""\n    lp = sim["lp"]\n    U = U_sl.value * 1e-3 / YEAR\n    lp.set_K(10.**logK.value, basis="Q")\n    lp.set_mn(m=m_sl.value, n=n_sl.value)\n    lp.set_uplift_rate(U)\n\n    if bl_lock.value:\n        sim["z_bl"] += U * DT           # the outlet rides the rising rock\n    else:\n        sim["z_bl"] = zbl.value\n    lp.set_z_bl(sim["z_bl"])\n\n    lp.evolve(nt=1, dt=DT)\n    sim["t"] += DT\n    profile.data = {"x": lp.x / 1000., "z": lp.z}\n    baselevel.data = _bl_xy(sim["z_bl"])\n    _track_y(lp)\n    fig.title.text = "t = %.1f kyr      base level = %.0f m" % (\n        sim["t"] / (1000. * YEAR), sim["z_bl"])\n\n\ndef do_reset(event=None):\n    """Restart from steady state for the current slider settings."""\n    sim["lp"] = make_steady(logK.value, m_sl.value, n_sl.value,\n                            U_sl.value, zbl.value)\n    sim["t"] = 0.\n    sim["z_bl"] = zbl.value\n    lp = sim["lp"]\n    profile.data = {"x": lp.x / 1000., "z": lp.z}\n    baselevel.data = _bl_xy(sim["z_bl"])\n    fig.title.text = "t = 0.0 kyr      base level = %.0f m" % sim["z_bl"]\n    _bl_floor["z"] = zbl.value          # a rebuild releases the ratchet\n    _fit_y(lp)\n\n\n# A single play/pause button drives the animation via a periodic callback (the\n# timer only runs while the toggle is on).\n_ticker = pn.state.add_periodic_callback(step, period=33, start=False)  # ~30 fps\n\n\ndef toggle_run(event):\n    if event.new:\n        _ticker.start()\n        run.label = "\u23f8 Pause"\n    else:\n        _ticker.stop()\n        run.label = "\u25b6 Run"\n\n\nrun.param.watch(toggle_run, "value")\nbl_lock.param.watch(toggle_lock, "value")\nzbl.param.watch(on_base_level, "value")\nreset.on_click(do_reset)\n\n_fit_y(_lp)\n\npn.Column(\n    pn.pane.Markdown(\n        "### A detachment-limited river long profile\\n"\n        "Press **\u25b6** to run, then drag the sliders while it plays.\\n\\n"\n        "Erosion is set locally by the flow here, not by a divergence of "\n        "sediment flux: *dz/dt* = *U* \u2212 *K* *Q^m* *S^n*. A perturbation "\n        "therefore travels upstream as a step rather than spreading and "\n        "flattening. (Its gravel-bed, transport-limited sibling GRLP does the "\n        "opposite.)\\n\\n"\n        "**Set to steady state** jumps to the profile that balances the "\n        "current uplift against the current erodibility, and refits the "\n        "elevation axis. Changing a slider while the model runs leaves the "\n        "profile where it is and lets it respond.\\n\\n"\n        "Base level is valid going **down**, not up. Stream power only "\n        "erodes, so the bed comes back up at the rock uplift rate and not at "\n        "all without one \u2013 a real river would aggrade, and that is GRLP's "\n        "and SRLP's job. Raising the slider above where you dropped it gives "\n        "you a drowned reach rather than a prediction.\\n\\n"\n        "Discharge is not a slider. It comes from Hack's law and a fixed "\n        "runoff rate (*A* = *x*\xb9\u22c5\u2077\u2075, *Q* = 10\u207b\u2078 "\n        "*A*), which leaves the erosion law and base level as the things you "\n        "change. The clock reads in thousands of years."),\n    pn.Row(run, reset),\n    logK, m_sl, n_sl, U_sl,\n    pn.Row(zbl, bl_lock, sizing_mode="stretch_width", max_width=DESIGN_WIDTH),\n    fig,\n    sizing_mode="stretch_width", max_width=DESIGN_WIDTH,\n).servable(title="DRLP interactive demo")\n\n\nawait write_doc()`)
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