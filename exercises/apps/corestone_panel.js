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
      await micropip.install(['bokeh-3.9.2-py3-none-any.whl', 'panel-1.9.4-py3-none-any.whl', 'pyodide-http', 'corestone-0.1.0.dev0-py3-none-any.whl', 'artesian-0.1.0.dev0-py3-none-any.whl', 'numpy', 'scipy']);
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
    const [docs_json, render_items, root_ids] = await self.pyodide.runPythonAsync(`\nimport asyncio\n\nfrom panel.io.pyodide import init_doc, write_doc\n\ninit_doc()\n\n"""\nFracture-controlled granite weathering, in the browser.\n\nThe exercise this serves has one payload, and it is a misconception:\n\n    A CORESTONE IS NOT TOUGHER ROCK.\n\nSame granite, same minerals, same temperature as the crumbling grus around it.\nIt survives because the water never reached it, or reached it already carrying\nall the solute it can hold. Weathering here is a race between how fast joints\ndeliver fresh water and how fast rock dissolves into it, and the reader runs\nthat race by pressing play.\n\nWhat is drawn, left and right:\n\n* **Where the water can still dissolve**, \`\`1 - C/C_eq\`\`. Dark green is hungry\n  water, white is water at saturation. Watch it: fresh water enters at the\n  surface, runs down the joints, and saturates as it goes.\n* **What is left of the rock**, the fraction dissolved. The joints go first,\n  then the block faces, then the corners -- a corner sheds solute to two\n  joints where a face sheds to one -- and what is left in the middle is a\n  corestone.\n\nBuild and view::\n\n    artesian build interactive_demo/corestone_panel.py -o _build \\\\\n        -p . -r numpy -r scipy --serve\n\n**Every parameter in the model is a placeholder.** None is measured. The\ndemo teaches the mechanism, and no number out of it is a result.\n"""\nimport numpy as np\nimport panel as pn\nfrom bokeh.models import ColorBar, ColumnDataSource, LinearColorMapper, Range1d\nfrom bokeh.palettes import Greens256, Oranges256\nfrom bokeh.plotting import figure\n\nfrom artesian.live import animator, reset_button, responsive\n\nfrom corestone import (FractureNetwork, Weathering, orthogonal_grid,\n                       tiling_angles, tiling_spacings, YEAR)\n\npn.extension()\n\n# ---- the section ------------------------------------------------------------\n# 3.0 x 3.05 m at 5 cm cells. Resolution is chosen for how many cells cross a\n# BLOCK, since that is what makes a corestone look round rather than stepped --\n# a 1 m joint spacing is 20 cells across.\n#\n# NEARLY SQUARE, and it stays that way. A 2:1 section was tried, because the\n# section's shape is the only thing that sets how tall the demo is on a page:\n# two panels at a 900 px design width are 450 px each, less ~55 for the depth\n# axis and ~65 for the colour bar, so the data area is 330 px wide and a square\n# one is 330 px tall. Halving the depth halves that. But it also halves the\n# rock: the blocks come out as letterbox slots rather than the roughly\n# equidimensional joint-bounded cubes that a granite outcrop actually has, and\n# a corestone that is twice as wide as it is tall is not the thing this demo\n# exists to show. Reverted. The box is taller; the geometry is right.\nDX = 0.05                       # cell size [m]\nNX, NZ = 60, 61                 # 3.0 x 3.05 m\nLX, LZ = NX * DX, NZ * DX\n\n#: Rotations at which the joint pair tiles the periodic width exactly. The\n#: index cap is not arbitrary: a high-index angle tiles only at a very fine\n#: spacing (nine divisions of a three-metre section), so its spacing slider\n#: would carry a single choice. Capping at 4 keeps the angles that offer a\n#: real range of spacings -- 0, 14.0, 18.4, 26.6, 33.7, 36.9 and 45 degrees.\nANGLES = tiling_angles(NX, max_index=4)\n\n#: Which snapped spacings to offer. Below 0.3 m a block is 6 cells across and\n#: looks square however long it runs; above 3 m there is no block inside the\n#: section at all.\nSPACING_LOW, SPACING_HIGH = 0.3, 3.0\n\n#: Stop here. 200 kyr dissolves the section at the default settings, so there\n#: is nothing further to watch.\nEND_KYR = 200.0\n\n#: Tighter than the model's own default of 0.03, for two reasons that happen\n#: to agree. One frame is one step, so the budget sets how long the animation\n#: lasts: 0.03 is 58 frames, under two seconds at 30 fps, which is over before\n#: a reader has focused on it. 0.01 is 180 frames, about six seconds. It also\n#: cuts the error by roughly three, since the error is close to linear in this.\n#: A step costs 2.9 ms here, so six seconds of animation is 0.5 s of arithmetic\n#: and the frame budget is nowhere near threatened.\nC_DRIFT_MAX = 0.01\n\n# Lay the app out to look right at this width; the embedding page scales the\n# whole thing above it, so everything enlarges together rather than the figures\n# growing while the sliders stay 18 px tall.\n#\n# It is also a HARD CAP on the layout, and that is not decoration. Left\n# uncapped, a stretch-to-fit app inside an iframe that sizes itself to its\n# content is a feedback loop with no fixed point: the app is as wide as it is\n# given, the frame is as wide as the app, and nothing settles it. Desktop\n# browsers pin the frame and hide the problem; iOS Safari and every iPad\n# browser (they are all WebKit) size an iframe to its content, and the demo\n# ran away wider than the page. Capping here gives the loop a fixed point,\n# from the app's side, in one place, whatever the browser does.\nDESIGN_WIDTH = 900\n#: A third of the width each, since the three sit on one row. Stacked, each\n#: took a label line and a track line and the three of them were 150 px of an\n#: 809 px app -- and the embedding page scales that height along with the\n#: width, so every pixel here is multiplied on a wide screen.\nSLIDER_WIDTH = DESIGN_WIDTH // 4 - 16\n#: Wider than it is tall, because a figure is not its data area: the depth\n#: axis and its label take about 55 px on the left and the colour bar another\n#: 60 on the right, while only the distance axis (~55 px) is below. Sized 1:1\n#: the DATA would come out visibly taller than it is wide; 460 x 400 makes the\n#: data square, which is what a 3.0 x 3.05 m section is.\nFIG_W, FIG_H = 460, 400\n\n\n#: The model's reference temperature, in the units the slider speaks. Both\n#: temperature factors are exactly 1 here by construction.\nT_REF_C = 285.0 - 273.15\n\n\ndef _spacings(angle_deg):\n    """The snapped spacings available at this angle, coarse to fine."""\n    a, b = next((a, b) for ang, a, b in ANGLES if abs(ang - angle_deg) < 1e-6)\n    return tiling_spacings(LX, a, b, SPACING_LOW, SPACING_HIGH)\n\n\n# ---- widgets ----------------------------------------------------------------\n# The angle and spacing sliders SNAP. A joint pair rotated by theta has\n# along-x periods S/cos(theta) and S/sin(theta), and the section is periodic\n# left-to-right -- it has no side walls, because a no-flow wall manufactures a\n# domain-scale circulation. Both periods must divide the width for the joints\n# to close on themselves, which needs tan(theta) = b/a for integers and\n# quantises the spacing too. Off those values the joints fail to line up\n# across the seam.\nangle = pn.widgets.DiscreteSlider(\n    name="Joint orientation [\xb0]",\n    options={"%.1f\xb0" % a: a for a, _, _ in ANGLES}, value=0.0,\n    sizing_mode="stretch_width", max_width=SLIDER_WIDTH)\nspacing = pn.widgets.DiscreteSlider(\n    name="Joint spacing [m]",\n    options={"%.2f m" % s: s for s in _spacings(0.0)}, value=1.0,\n    sizing_mode="stretch_width", max_width=SLIDER_WIDTH)\ninfiltration = pn.widgets.FloatSlider(\n    name="Infiltration [m/yr]", start=0.05, end=1.00, step=0.05,\n    value=0.30, format="0.00",\n    sizing_mode="stretch_width", max_width=SLIDER_WIDTH)\n# Offered in degrees Celsius, because a reader thinks in a climate rather than\n# in kelvin; the model is given kelvin. The default is the model's own\n# reference temperature, 285 K, so the demo opens with both temperature\n# factors at exactly 1 and the slider is the only thing that moves them.\ntemperature = pn.widgets.FloatSlider(\n    name="Temperature [\xb0C]", start=0.0, end=30.0, step=1.0,\n    value=T_REF_C, format="0",\n    sizing_mode="stretch_width", max_width=SLIDER_WIDTH)\n\n\ndef _build():\n    """A fresh network and a fresh model at the current slider settings."""\n    net = FractureNetwork(NZ, NX, DX, periodic_x=True).seed(\n        sets=orthogonal_grid(spacing.value, rotation=angle.value),\n        rng=np.random.default_rng(12345))\n    m = Weathering(net)\n    m.set_infiltration(infiltration.value / YEAR)\n    m.set_temperature(temperature.value + 273.15)\n    m.c_drift_max = C_DRIFT_MAX\n    m.initialize()\n    m.c = m.solve_solute(m.reaction_coefficient)\n    return net, m\n\n\n# \`sim\`, never \`state\`: panel exports pn.state, and shadowing it fails silently.\nsim = {}\n\n\ndef step():\n    """One weathering step per frame, and stop at the end of the run."""\n    m = sim["model"]\n    target = END_KYR * 1e3 * YEAR\n    if m.t >= target - 1e-9 * YEAR:\n        run.value = False                      # reached the end; pause\n        return\n    m.update(dt_limit=target - m.t)\n    _redraw()\n\n\ndef do_reset():\n    """Rebuild from the sliders. Every slider here is structural."""\n    net, m = _build()\n    sim["net"], sim["model"] = net, m\n    _joints()\n    _redraw()\n\n\ndef _joints():\n    """The joint traces, as segments in metres."""\n    net = sim["net"]\n    seg = np.array([[p0[0], p0[1], p1[0], p1[1]]\n                    for p0, p1 in net.segments]) if net.segments else \\\n        np.zeros((0, 4))\n    for src in (joints_left, joints_right):\n        src.data = {"x0": seg[:, 0], "y0": seg[:, 1],\n                    "x1": seg[:, 2], "y1": seg[:, 3]}\n\n\ndef _redraw():\n    m = sim["model"]\n    affinity.data = {"image": [m.affinity]}\n    dissolved.data = {"image": [m.dissolved_fraction]}\n    fig_left.title.text = "Where the water can still dissolve"\n    fig_right.title.text = "What is left of the rock"\n    readout.object = (\n        "**%.0f kyr** &nbsp;\xb7&nbsp; grus **%.0f %%** &nbsp;\xb7&nbsp; "\n        "corestone **%.0f %%**"\n        % (m.t / YEAR / 1e3, 100 * m.is_grus.mean(),\n           100 * m.is_corestone.mean()))\n\n\n# ---- figures ----------------------------------------------------------------\n# Depth increases DOWNWARD, so the y range runs from LZ at the bottom of the\n# axis to 0 at the top. Row 0 of the array is the ground surface, and bokeh\n# draws row 0 at the anchor and later rows at increasing y, which with a\n# reversed range puts the surface at the top where it belongs -- no flip.\naffinity = ColumnDataSource(data={"image": [np.zeros((NZ, NX))]})\ndissolved = ColumnDataSource(data={"image": [np.zeros((NZ, NX))]})\njoints_left = ColumnDataSource(data={"x0": [], "y0": [], "x1": [], "y1": []})\njoints_right = ColumnDataSource(data={"x0": [], "y0": [], "x1": [], "y1": []})\n\n\ndef _panel(source, joints, palette, label):\n    """One map of the section, with its colour bar and joint traces."""\n    fig = figure(width=FIG_W, height=FIG_H,\n                 x_axis_label="Distance [m]", y_axis_label="Depth [m]",\n                 x_range=Range1d(0, LX), y_range=Range1d(LZ, 0),\n                 tools="", toolbar_location=None)\n    mapper = LinearColorMapper(palette=palette, low=0.0, high=1.0)\n    fig.image(image="image", x=0, y=0, dw=LX, dh=LZ, source=source,\n              color_mapper=mapper)\n    fig.segment("x0", "y0", "x1", "y1", source=joints,\n                color="#2a2a2a", line_width=1, alpha=0.45)\n    bar = ColorBar(color_mapper=mapper, width=8, title=label,\n                   label_standoff=6, padding=4)\n    fig.add_layout(bar, "right")\n    # Half the design width each, since the two sit side by side. Without a\n    # bound, responsive() defaults to 1200 PER FIGURE, so the row is entitled\n    # to 2400 -- far wider than the app is laid out for.\n    responsive(fig, aspect_ratio=float(FIG_W) / FIG_H,\n               max_width=DESIGN_WIDTH // 2)\n    return fig\n\n\n# Palettes reversed so that 0 is pale and 1 is saturated: bokeh's 256-step\n# ramps run dark to light.\nfig_left = _panel(affinity, joints_left, Greens256[::-1], "1 \u2212 C/Ceq")\nfig_right = _panel(dissolved, joints_right, Oranges256[::-1],\n                   "fraction dissolved")\n\nreadout = pn.pane.Markdown("", sizing_mode="stretch_width")\nrun = animator(step)\nreset = reset_button(do_reset, name="Fresh rock")\n\n# Every slider rebuilds: the joint geometry is the initial condition, and the\n# infiltration rate sets a flow field that is solved once and held. None of\n# them is a forcing that can be turned while the rock evolves, so changing one\n# starts the clock again rather than pretending otherwise.\nfor w in (angle, spacing, infiltration, temperature):\n    w.param.watch(lambda event: do_reset(), "value")\n\n\n@pn.depends(angle.param.value, watch=True)\ndef _resnap_spacing(a):\n    """Which spacings tile depends on the angle, so the options move with it."""\n    opts = _spacings(a)\n    nearest = min(opts, key=lambda s: abs(s - spacing.value))\n    spacing.options = {"%.2f m" % s: s for s in opts}\n    spacing.value = nearest\n\n\ndo_reset()\n\n# ONE line, not four paragraphs. This app is embedded in a page that already\n# explains the mechanism directly above the frame, so prose here is read twice\n# and paid for once in height: the three paragraphs that used to sit here were\n# 180 px of an 809 px app, and the frame is sized to its content. What has to\n# stay is the placeholder warning, which belongs with the numbers rather than\n# with the teaching, and enough of a title that the app still makes sense\n# opened on its own.\npn.Column(\n    pn.pane.Markdown(\n        "**Why a corestone survives** \u2013 press **\u25b6** and watch the blocks "\n        "round inward. *Every parameter is a placeholder; this teaches the "\n        "mechanism, not a rate.*",\n        margin=(0, 10, 5, 10), sizing_mode="stretch_width"),\n    pn.Row(run, reset, readout),\n    pn.Row(angle, spacing, infiltration, temperature,\n           sizing_mode="stretch_width", max_width=DESIGN_WIDTH),\n    pn.Row(fig_left, fig_right, sizing_mode="stretch_width",\n           max_width=DESIGN_WIDTH),\n    # Centred, not jammed left. The cap means the app can be narrower than the\n    # frame -- whenever the embedding page has not scaled the frame to the\n    # design width -- and left-aligned that reads as a broken layout with a\n    # slab of empty space beside it rather than as a demo.\n    sizing_mode="stretch_width", max_width=DESIGN_WIDTH, align="center",\n).servable(title="corestone \u2013 fracture-controlled granite weathering")\n\n\nawait write_doc()`)
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