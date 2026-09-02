---
title: "Exercise: the gravel-river long profile"
layout: single
permalink: /exercises/gravel-river-long-profile/
author_profile: false
sitemap: false
classes: wide full-bleed
---

<!--
  UNLINKED PAGE. `sitemap: false` keeps it out of sitemap.xml, which reduces
  search indexing. It is NOT private: this repository and this site are public,
  so anyone with the URL can reach the page. Do not put solutions here.

  The framing below is carried over from the GRLP documentation
  (https://grlp.readthedocs.io/en/latest/interactive.html) so the page is not
  empty. THE EXERCISE TASK ITSELF IS STILL TO BE WRITTEN -- what to vary, what
  to observe, what to explain. Replace the "What to do" section.
-->

This model evolves a **single-segment gravel river** through time. Press
**▶ Run**, then drag the sliders *while the simulation runs* and watch the long
profile respond:

- **Water discharge $Q$** – more water lowers the equilibrium slope, giving a
  gentler profile.
- **Bed-load sediment input $Q_s$** – more sediment steepens it.
- **Base level** – raising or lowering the downstream boundary aggrades or
  incises the profile.

These are the three controls of Lane's balance, played out dynamically. Use
**Set to equilibrium** to jump to the steady state for the current settings.

## What to do

*(To be written.)*

<!--
  The frame sizes itself to its contents. A fixed height cannot work here: the
  plot scales with width, so its height depends on the reader's window, and
  anything we hard-code is either too short (scroll bar, figure cut off) or too
  tall (a slab of blank space). The app is served from this same origin, so the
  page is allowed to measure it.

  height="760" below is only the value before the script runs, and the fallback
  if it cannot: with scripting off the frame stays scrollable rather than
  clipping the model.
-->
<iframe id="grlp-demo" src="{{ '/exercises/apps/grlp_panel.html' | relative_url }}"
        width="100%" height="760" style="border: none; display: block;"
        title="Gravel-river long-profile model"></iframe>

<script>
(function () {
  var frame = document.getElementById('grlp-demo');
  var observer = null;

  function fit() {
    var doc;
    try {
      doc = frame.contentDocument || frame.contentWindow.document;
    } catch (e) {
      return;                      // different origin: keep the fallback height
    }
    if (!doc || !doc.body) { return; }
    var height = Math.max(doc.body.scrollHeight, doc.body.offsetHeight,
                          doc.documentElement.scrollHeight,
                          doc.documentElement.offsetHeight);
    if (height <= 0) { return; }
    var wanted = height + 8;                      // 8px: no rounding scrollbar
    // Only act on a real change. We resize the element whose size we are
    // observing, so reacting to sub-pixel differences could oscillate.
    if (Math.abs(wanted - frame.clientHeight) < 4) { return; }
    frame.style.height = wanted + 'px';
  }

  function watch() {
    fit();
    // Panel renders asynchronously, and the first render waits on Pyodide
    // downloading -- tens of seconds. Watch the body instead of measuring once.
    if (typeof ResizeObserver === 'undefined') { return; }
    var doc;
    try {
      doc = frame.contentDocument || frame.contentWindow.document;
    } catch (e) {
      return;
    }
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

The model is [GRLP](https://github.com/MNiMORPH/GRLP), which solves for the
long profile of a gravel-bed river under a threshold-channel assumption
(Wickert & Schildgen, 2019). It is compiled to WebAssembly with
[artesian](https://github.com/MNiMORPH/artesian) and runs via
[Pyodide](https://pyodide.org).
