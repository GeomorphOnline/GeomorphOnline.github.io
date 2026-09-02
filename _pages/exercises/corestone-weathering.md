---
title: "Exercise: why a corestone survives"
layout: single
permalink: /exercises/corestone-weathering/
author_profile: false
sitemap: false
classes: wide full-bleed
---

<!--
  UNLINKED PAGE. `sitemap: false` keeps it out of sitemap.xml, which reduces
  search indexing. It is NOT private: this repository and this site are public,
  so anyone with the URL can reach the page. Do not put solutions here.

  THE EXERCISE TASK ITSELF IS STILL TO BE WRITTEN -- what to vary, what to
  observe, what to explain. Replace the "What to do" section.
-->

Walk up to a weathered granite outcrop and you will find rounded boulders
sitting in a matrix of crumbling sand. It is natural to assume the boulders are
made of tougher stuff. **They are not.** A **corestone** is the same granite,
with the same minerals, that has sat at the same temperature as the **grus**
falling apart around it.

What differs is the *water*. Rain enters at the surface and runs down the
**joints** — the fracture network that tectonics put in the rock long before
any weathering began. Along the way it dissolves the granite it touches, and as
it does so it approaches saturation. Water that has taken all the solute it can
hold stops weathering rock, however soluble that rock is. So weathering is a
race between how fast the joints deliver fresh water and how fast the rock
dissolves into it, and a corestone is simply the place the water never reached,
or reached already saturated.

Press **▶ Run** and watch. The left panel shows how much capacity the water has
left, $1 - C/C_{eq}$: dark green is hungry water, white is water at saturation.
The right panel shows how much of the rock has gone.

- **Joint orientation** and **joint spacing** set the fracture network — the
  input from tectonics, fixed before weathering starts.
- **Infiltration rate** sets how fast rain is delivered.

Each slider rebuilds the rock and restarts the clock, because each one is a
property of the starting state rather than something you can change halfway
through.

Watch the *order* in which the rock goes: the joints first, then the faces of
each block, then — last — the middles. And watch the corners: a corner sheds
its solute into two joints where a face sheds into one, so corners retreat
faster. That is what rounds a block into a corestone.

## What to do

*(To be written.)*

<!--
  The frame sizes itself to its contents. A fixed height cannot work here: the
  plot scales with width, so its height depends on the reader's window, and
  anything we hard-code is either too short (scroll bar, figure cut off) or too
  tall (a slab of blank space). The app is served from this same origin, so the
  page is allowed to measure it.

  Wider than the app's design width, the frame is SCALED rather than stretched,
  so the text, the slider handles and the plot all enlarge together. Stretching
  alone grows the figure while the controls keep their physical size, and they
  end up small and fiddly beside it.

  The measurement collapses the frame first. Panel's layout stretches to fill
  whatever height the frame has, so measuring a tall frame just reports back
  the height we last set.

  height="900" below is only the value before the script runs, and the fallback
  if it cannot: with scripting off the frame stays scrollable rather than
  clipping the model.

  DESIGN_WIDTH below must match DESIGN_WIDTH in corestone_panel.py. Nothing
  enforces that; see the "known wart" in the corestone handoff note.
-->
<iframe id="corestone-demo" src="{{ '/exercises/apps/corestone_panel.html' | relative_url }}"
        width="100%" height="900" style="border: none; display: block;"
        title="Fracture-controlled granite weathering model"></iframe>

<script>
(function () {
  var frame = document.getElementById('corestone-demo');
  var observer = null;
  var adjusting = false;

  // The width the app is laid out for (DESIGN_WIDTH in corestone_panel.py).
  // Wider than this we SCALE the whole app rather than stretch it, so the
  // text, the slider handles and the plot all enlarge together.
  var DESIGN_WIDTH = 900;

  function document_of(frame) {
    try {
      return frame.contentDocument || frame.contentWindow.document;
    } catch (e) {
      return null;                 // different origin: leave everything alone
    }
  }

  function available_width() {
    // Measure the PARENT, never the frame. Once the frame is zoomed, its own
    // clientWidth is reported in its local coordinates -- it would read back
    // DESIGN_WIDTH, give a factor of 1, and oscillate. The parent is not
    // zoomed, so its width is the honest one.
    var host = frame.parentElement;
    if (host && host.clientWidth) { return host.clientWidth; }
    return frame.getBoundingClientRect().width;
  }

  function scale_factor(width) {
    // Below the design width, stay at 1 and let the app lay itself out
    // responsively -- a phone should reflow, not render a shrunken 900 px page.
    if (!width || width <= DESIGN_WIDTH) { return 1; }
    return width / DESIGN_WIDTH;
  }

  function fit() {
    if (adjusting) { return; }     // ignore the events our own writes cause
    var doc = document_of(frame);
    if (!doc || !doc.body) { return; }

    adjusting = true;

    // Zoom the frame itself, not its contents. `zoom` scales layout as well as
    // paint, so the frame's interior measures DESIGN_WIDTH across and the plot
    // re-renders at full resolution instead of being upscaled and blurred.
    var available = available_width();
    var factor = scale_factor(available);
    if (factor === 1) {
      frame.style.zoom = '';
      frame.style.width = '100%';
    } else {
      // Give the frame an explicit DESIGN_WIDTH in its own coordinates: a
      // percentage width would resolve against the parent and then be scaled
      // up by the zoom, overflowing the page.
      frame.style.zoom = factor;
      frame.style.width = DESIGN_WIDTH + 'px';
    }

    var previous = frame.style.height;
    // Collapse before measuring: Panel's layout fills whatever height it is
    // given, so measuring a tall frame reports back the height we last set.
    frame.style.height = '0px';
    var height = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
    frame.style.height = height > 0 ? Math.ceil(height) + 'px'
                                    : (previous || '900px');

    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(function () { adjusting = false; });
    } else {
      setTimeout(function () { adjusting = false; }, 0);
    }
  }

  function watch() {
    fit();
    // Panel renders asynchronously, and the first render waits on Pyodide
    // downloading -- tens of seconds. Watch the body rather than measure once.
    if (typeof ResizeObserver === 'undefined') { return; }
    var doc = document_of(frame);
    if (!doc || !doc.body) { return; }
    if (observer) { observer.disconnect(); }
    observer = new ResizeObserver(fit);
    observer.observe(doc.body);
  }

  frame.addEventListener('load', watch);
  window.addEventListener('resize', fit);
  if (frame.contentDocument
      && frame.contentDocument.readyState === 'complete') {
    watch();                       // already loaded from cache
  }
})();
</script>

**The first load takes 10–30 seconds** while your browser downloads the Python
runtime – about 60 MB. It runs smoothly after that, and the download is cached,
so returning to the page is fast. Nothing is sent to a server: the model runs on
your own machine, inside the browser tab.

## Under the hood

The model is [corestone](https://github.com/MNiMORPH/corestone). Rock dissolves
at an Arrhenius rate multiplied by how far the pore water is from saturation,

$$R = k(T)\,A\,(1 - C/C_{eq})$$

and the solute it produces is carried by steady groundwater flow and spread by
diffusion,

$$\nabla\cdot(q c) - \nabla\cdot(D \nabla c) = r\,(1 - c)$$

Water is routed by a Darcy solve on a conductance field where the joints
conduct and the intact granite barely does, so flow along a joint is not a
special case — it is what the head field does when a low-resistance path
exists. The diffusive term is what lets a block weather *inward*: without it a
block interior saturates and stays untouched for ever, and the model would give
dissolved joints beside pristine blocks with no rind in between.

The section is **periodic left to right**. It has no side walls, because a
no-flow wall forces the lateral flow to vanish there and manufactures a
drainage divide down the middle of the domain. That is also why the joint
orientation and spacing sliders snap: only certain angles and spacings let the
joint pattern close on itself across the seam.

**Every parameter in the model is a placeholder.** None of them is measured
against a real granite, so the demo teaches the *mechanism* and no number that
comes out of it should be read as a rate. It is compiled to WebAssembly with
[artesian](https://github.com/MNiMORPH/artesian) and runs via
[Pyodide](https://pyodide.org).
