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
  data-design-width is the width the app lays itself out for, and it is
  ALSO recorded inside the compiled page. Two places on purpose: the
  script cannot read the compiled page while this page lays itself out,
  because an iframe starts on a blank document, and on WebKit -- every
  browser on an iPad -- that is what it sees. Without the attribute the
  demo is never scaled: it sits at its own width inside a wider frame.

  The stylesheet, the iframe and the script below are the whole embed.
  The stylesheet has to come FIRST and cannot be left to the script:
  the script cannot size a frame whose document has not loaded, and
  these demos pull about 60 MB of Pyodide before that happens. Without
  it the reader spends that whole time looking at the browser's default
  iframe, ~300 px wide, stretched to the fallback height below -- which
  is what "stuck loading" looked like.

  The iframe and the script below are the whole embed. artesian emits
  artesian-embed.js beside the compiled apps, shared by every exercise
  in that directory, and it does the work that used to be copied into
  each page: sizing the frame to its content (no fixed height can work,
  since the plot's height follows the reader's window) and SCALING the
  demo above its design width rather than stretching it.

  Do not reintroduce width="100%" on the frame. Every browser on an
  iPad is WebKit underneath, and WebKit sizes an iframe to its content
  rather than honouring a percentage width -- which sent both of these
  exercises off the side of the page, invisibly on every desktop.
-->
<link rel="stylesheet"
      href="{{ '/exercises/apps/artesian-embed.css' | relative_url }}">
<iframe src="{{ '/exercises/apps/grlp_panel.html' | relative_url }}" data-artesian data-design-width="900"
        height="760" title="Gravel-river long-profile model"></iframe>
<script src="{{ '/exercises/apps/artesian-embed.js' | relative_url }}"></script>

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
