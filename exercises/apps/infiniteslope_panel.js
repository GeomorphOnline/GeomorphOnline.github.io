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
      await micropip.install(['bokeh-3.9.2-py3-none-any.whl', 'panel-1.9.4-py3-none-any.whl', 'pyodide-http', 'infiniteslope-0.1.0.dev0-py3-none-any.whl', 'artesian-0.1.0.dev0-py3-none-any.whl', 'numpy']);
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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n"""infiniteslope as a browser demo: where the failure plane goes, and why.\n\nThe depth of failure is not a slider.  A student sets slope, cohesion,\nfriction angle, water-table depth and material properties, and the critical\nthickness \`\`t_c\`\` -- the shallowest plane whose factor of safety reaches one --\nis solved for and drawn.\n\nThere is no Run button.  Failure here is a criterion, not a process: nothing\nevolves in time, so the figure recomputes on change rather than animating.\n\nBuild and view it with::\n\n    artesian build interactive_demo/infiniteslope_panel.py -o _artesian_build \\\n        -p . -r numpy --serve\n"""\nimport numpy as np\nimport panel as pn\nfrom bokeh.models import ColumnDataSource, Label, Range1d, Span\nfrom bokeh.plotting import figure\n\nfrom artesian.live import reset_button, responsive\nfrom infiniteslope.stability import InfiniteSlope\n\npn.extension()\n\n#: The width this app is laid out for.  \`\`artesian build\`\` reads this constant\n#: out of the source and records it in the compiled page; the embedding page\n#: repeats it as \`\`data-design-width\`\`.  900 matches the other exercises on\n#: GeomorphOnline.\nDESIGN_WIDTH = 900\n\n#: Sliders stop here rather than spanning the pane.  Wider than hillcreep's\n#: because these labels carry a symbol, a unit and a parenthetical.\nSLIDER_WIDTH = 440\n\nSURFACE = "#666666"\nFAILURE = "#d62728"\nOUTOFREACH = "#111111"\nWATER = "#1f77b4"\n\n# Slider bounds.  Every default is a published central value; see README.\nTHETA_MIN, THETA_MAX, THETA0 = 5.0, 45.0, 30.0          # [deg]\nC_MIN, C_MAX, C0 = 0.0, 50.0, 5.0                       # [kPa]\nPHI_MIN, PHI_MAX, PHI0 = 20.0, 40.0, 35.0               # [deg]\nDW_MIN, DW_MAX, DW0 = 0.0, 20.0, 0.5                    # [m]\nRHO_MIN, RHO_MAX, RHO0 = 2500.0, 2900.0, 2650.0         # [kg/m3]\nN_MIN, N_MAX, N0 = 0.25, 0.50, 0.35                     # [-]\nRELIEF_MIN, RELIEF_MAX, RELIEF0 = 5.0, 50.0, 20.0       # [m]\n\n#: How far down the FS panel reaches, as a multiple of t_c, when the hillside\n#: does fail.  Deriving it from the model's own depth scale rather than fixing\n#: it in metres means the panel follows a rescaled model.  At 5x the crossing\n#: sits in the upper fifth with plenty of unstable ground shown below it; the\n#: full hillside would squash the crossing against the surface, since t_c is\n#: typically a metre or two against tens of metres of relief.\nZ_DISPLAY_IN_TC = 5.0\n\nN_PROFILE = 400\n\n\ndef _model():\n    return InfiniteSlope(slope_angle=theta.value, cohesion=c.value * 1e3,\n                         friction_angle=phi.value, water_table_depth=d_w.value,\n                         grain_density=rho_r.value, porosity=n.value,\n                         relief=relief.value)\n\n\ndef _depth_axis(s):\n    """Bottom of the FS panel's depth axis [m].  A viewing choice, not physics."""\n    t_c, bound = s.critical_thickness, s.failure_depth_bound\n    if not np.isfinite(t_c):\n        return bound\n    if s.state == "failure":\n        return min(bound, max(Z_DISPLAY_IN_TC * t_c, 4.0))\n    return 1.2 * min(t_c, 3.0 * bound)\n\n\ndef _redraw(*events):\n    s = _model()\n    t_c, state = s.critical_thickness, s.state\n    L = s.relief / np.tan(np.radians(s.slope_angle))\n    ymin = -0.35 * s.relief\n\n    ground.data = {"x": [[0.0, L, L, 0.0]],\n                   "y": [[s.relief, 0.0, ymin, ymin]]}\n    surface.data = {"x": [0.0, L], "y": [s.relief, 0.0]}\n\n    if np.isfinite(s.water_table_depth) and s.water_table_depth < s.relief:\n        water.data = {"x": [0.0, L],\n                      "y": [s.relief - s.water_table_depth, -s.water_table_depth]}\n    else:\n        water.data = {"x": [], "y": []}\n\n    # The slab that MOVES is the material above the plane, not below it.\n    if state == "failure" and t_c == 0.0:\n        # Cohesionless and steeper than the stable angle: FS is below one at\n        # every depth, so there is no shallowest failing plane.  A zero-thick\n        # slab drawn at the surface would say the opposite of what is true.\n        slab.data = {"x": [[0.0, L, L, 0.0]],\n                     "y": [[s.relief, 0.0, ymin, ymin]]}\n        plane.data = {"x": [], "y": []}\n        offscale.text = ""\n    elif state == "failure":\n        slab.data = {"x": [[0.0, L, L, 0.0]],\n                     "y": [[s.relief, 0.0, -t_c, s.relief - t_c]]}\n        plane.data = {"x": [0.0, L], "y": [s.relief - t_c, -t_c]}\n        plane_line.glyph.line_color = FAILURE\n        plane_line.glyph.line_width = 5\n        plane_line.glyph.line_dash = "solid"\n        offscale.text = ""\n    elif state == "unreachable" and t_c <= 1.25 * s.relief:\n        slab.data = {"x": [], "y": []}\n        plane.data = {"x": [0.0, L], "y": [s.relief - t_c, -t_c]}\n        plane_line.glyph.line_color = OUTOFREACH\n        plane_line.glyph.line_width = 3\n        plane_line.glyph.line_dash = "dashed"\n        offscale.text = ""\n    else:\n        slab.data = {"x": [], "y": []}\n        plane.data = {"x": [], "y": []}\n        # Off-scale, or no failure at all: say so rather than draw a line that\n        # is not there.\n        offscale.text = ("" if not np.isfinite(t_c) else\n                         "failure needs %.1f m of soil \u2013 "\n                         "deeper than this %.0f m hillside" % (t_c, s.relief))\n        offscale.x, offscale.y = 0.5 * L, 0.55 * ymin\n\n    fig_x.x_range.start, fig_x.x_range.end = 0.0, L\n    fig_x.y_range.start, fig_x.y_range.end = ymin, 1.12 * s.relief\n\n    zmax = _depth_axis(s)\n    z = np.linspace(0.02, zmax, N_PROFILE)\n    curve.data = {"fs": np.clip(s.factor_of_safety(z), 0.0, 4.0), "z": z}\n\n    if np.isfinite(t_c) and t_c <= zmax:\n        tc_span.location = t_c\n        tc_span.visible = True\n        tc_span.line_color = FAILURE if state == "failure" else OUTOFREACH\n        tc_span.line_dash = "solid" if state == "failure" else "dashed"\n        unstable.data = {"fs": [[0.0, 4.0, 4.0, 0.0]],\n                         "z": [[t_c, t_c, zmax, zmax]]}\n    else:\n        tc_span.visible = False\n        unstable.data = {"fs": [], "z": []}\n\n    if s.failure_depth_bound < zmax:\n        beyond.data = {"fs": [[0.0, 4.0, 4.0, 0.0]],\n                       "z": [[s.failure_depth_bound, s.failure_depth_bound,\n                              zmax, zmax]]}\n    else:\n        beyond.data = {"fs": [], "z": []}\n    fig_z.y_range.start, fig_z.y_range.end = zmax, 0.0\n\n    depth = "no plane fails at any depth" if not np.isfinite(t_c) else \\\n            "t_c = %.2f m" % t_c\n    verdict = {"stable": "**STABLE** \xb7 " + depth,\n               "unreachable": "**NO FAILURE** \xb7 a plane exists at %.1f m, "\n                              "deeper than this %.0f m hillside can supply \u2013 "\n                              "the infinite-slope idealisation has stopped "\n                              "applying, which is not the same as being safe"\n                              % (t_c, s.relief) if np.isfinite(t_c) else "",\n               "failure": ("**FAILURE AT EVERY DEPTH** \xb7 cohesionless and "\n                           "steeper than the stable angle, so there is no "\n                           "shallowest failure plane \u2013 the whole column goes"\n                           if t_c == 0.0 else\n                           "**FAILURE** \xb7 the slab is **%.2f m** thick" % t_c)\n                          if np.isfinite(t_c) else ""}[state]\n    readout.object = (\n        "%s\\n\\n*Cohesionless balance* (what decides whether it can fail at "\n        "all): FS = %.3f.  Cohesion is divided by depth, so it drops out of "\n        "this and only sets **how deep** the failure has to reach."\n        % (verdict, s.deep_limit_factor_of_safety))\n    fig_x.title.text = ("\u03b8 = %.0f\xb0   c' = %.1f kPa   \u03d5' = %.0f\xb0"\n                        "   d_w = %.1f m" % (s.slope_angle, c.value,\n                                             s.friction_angle,\n                                             s.water_table_depth))\n\n\ndef _slider(name, lo, hi, step, value, fmt):\n    return pn.widgets.FloatSlider(sizing_mode="stretch_width",\n                                  max_width=SLIDER_WIDTH, name=name,\n                                  start=lo, end=hi, step=step, value=value,\n                                  format=fmt)\n\n\ntheta = _slider("Slope angle  \u03b8  [\xb0]", THETA_MIN, THETA_MAX, 1.0, THETA0, "0")\nc = _slider("Effective cohesion  c'  [kPa]   (clearcut \u22648, forest 7\u201323, "\n            "old growth 26\u201394)", C_MIN, C_MAX, 0.5, C0, "0.0")\nphi = _slider("Angle of internal friction  \u03d5'  [\xb0]",\n              PHI_MIN, PHI_MAX, 1.0, PHI0, "0")\nd_w = _slider("Water-table depth below the surface  d_w  [m]   (0 = saturated "\n              "to the surface)", DW_MIN, DW_MAX, 0.25, DW0, "0.00")\nrho_r = _slider("Grain density  \u03c1_r  [kg/m\xb3]",\n                RHO_MIN, RHO_MAX, 50.0, RHO0, "0")\nn = _slider("Porosity  n  [\u2013]", N_MIN, N_MAX, 0.01, N0, "0.00")\nrelief = _slider("Hillside relief  [m]", RELIEF_MIN, RELIEF_MAX, 1.0, RELIEF0, "0")\n\nreadout = pn.pane.Markdown("", sizing_mode="stretch_width",\n                           styles={"font-size": "1.05em"})\n\n# -- the section -------------------------------------------------------------\nfig_x = figure(height=380, width=560, match_aspect=True,\n               x_axis_label="distance, x  [m]",\n               y_axis_label="elevation, z  [m]",\n               tools="", toolbar_location=None)\nground = ColumnDataSource(data={"x": [], "y": []})\nsurface = ColumnDataSource(data={"x": [], "y": []})\nwater = ColumnDataSource(data={"x": [], "y": []})\nslab = ColumnDataSource(data={"x": [], "y": []})\nplane = ColumnDataSource(data={"x": [], "y": []})\nfig_x.patches("x", "y", source=ground, fill_color="#f0ece6", line_color=None)\nfig_x.patches("x", "y", source=slab, fill_color=FAILURE, fill_alpha=0.30,\n              line_color=None)\nfig_x.line("x", "y", source=surface, line_color=SURFACE, line_width=4,\n           legend_label="land surface")\nfig_x.line("x", "y", source=water, line_color=WATER, line_width=2,\n           line_dash="dashed", legend_label="water table")\nplane_line = fig_x.line("x", "y", source=plane, line_color=FAILURE,\n                        line_width=5, legend_label="failure plane")\noffscale = Label(x=0, y=0, text="", text_font_size="10pt", text_align="center",\n                 text_color=OUTOFREACH)\nfig_x.add_layout(offscale)\nfig_x.legend.location = "top_right"\nfig_x.legend.label_text_font_size = "8pt"\nfig_x.legend.background_fill_alpha = 0.9\n\n# -- the factor-of-safety profile --------------------------------------------\nfig_z = figure(height=380, width=320, x_range=Range1d(0.0, 4.0),\n               y_range=Range1d(1.0, 0.0),\n               x_axis_label="factor of safety",\n               y_axis_label="depth below surface, z  [m]",\n               tools="", toolbar_location=None)\ncurve = ColumnDataSource(data={"fs": [], "z": []})\nunstable = ColumnDataSource(data={"fs": [], "z": []})\nbeyond = ColumnDataSource(data={"fs": [], "z": []})\nfig_z.patches("fs", "z", source=beyond, fill_color="#bbbbbb", fill_alpha=0.35,\n              line_color=None)\nfig_z.patches("fs", "z", source=unstable, fill_color=FAILURE, fill_alpha=0.10,\n              line_color=None)\nfig_z.line(x=[1.0, 1.0], y=[-1e4, 1e4], line_color="#333333", line_width=1.5)\nfig_z.line("fs", "z", source=curve, line_color="#333333", line_width=2.5)\ntc_span = Span(location=0.0, dimension="width", line_color=FAILURE,\n               line_width=2.5, visible=False)\nfig_z.add_layout(tc_span)\n\nresponsive(fig_x)\nresponsive(fig_z)\n\nfor w in (theta, c, phi, d_w, rho_r, n, relief):\n    w.param.watch(_redraw, "value")\n\n\ndef do_reset():\n    for w, v in ((theta, THETA0), (c, C0), (phi, PHI0), (d_w, DW0),\n                 (rho_r, RHO0), (n, N0), (relief, RELIEF0)):\n        w.value = v\n    _redraw()\n\n\n_redraw()\n\npn.Column(\n    pn.Row(pn.Column(theta, c, phi, d_w, sizing_mode="stretch_width"),\n           pn.Column(rho_r, n, relief, reset_button(do_reset),\n                     sizing_mode="stretch_width"),\n           sizing_mode="stretch_width"),\n    readout,\n    pn.Row(fig_x, fig_z, sizing_mode="stretch_width"),\n    sizing_mode="stretch_width",\n).servable()\n\n\nawait write_doc()`)
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