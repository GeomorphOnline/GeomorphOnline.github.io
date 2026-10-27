---
title: "Exercise: bedrock river erosion"
layout: single
permalink: /exercises/bedrock-river-erosion/
author_profile: false
sitemap: false
classes: wide full-bleed
---

<!--
  UNLINKED PAGE. `sitemap: false` keeps it out of sitemap.xml, which reduces
  search indexing. It is NOT private: this repository and this site are public,
  so anyone with the URL can reach the page. Do not put solutions here.

  THE EXERCISE TASK ITSELF IS DELIBERATELY NOT WRITTEN. What to vary, what to
  observe and what to explain are the instructor's to choose, and a model that
  decides them in advance will have decided them wrongly. The framing below
  describes the equation and what each control does, and stops there.

  The slug is `bedrock-river-erosion` while the model is named DRLP, for
  detachment-limited. That is intentional: the stream-power law is a
  parameterization of detachment-limited incision and does not know what the
  bed is made of, so the "bedrock" name is reserved for a mechanistic model of
  abrasion, plucking, tools and cover. The URL was in circulation first and is
  kept.
-->

A bedrock river cuts down into rock. How fast it cuts depends on how much water
is in it and how steeply it falls, and the usual way to write that is the
**stream-power law**:

$$ \frac{\partial z}{\partial t} = U - K Q^m S^n $$

Rock rises at $U$ and the river removes it at a rate set by discharge $Q$ and
slope $S$, with $K$ collecting everything about the rock and the channel that
the two exponents do not. What makes this equation behave the way it does is
that the erosion rate is set **locally**, by the flow at that point, and not by
any difference between what arrives and what leaves.

Compare that with [the gravel river](/exercises/gravel-river-long-profile/),
where the bed goes up or down according to whether sediment is arriving faster
than it departs. A gravel river answers a disturbance by spreading it out. A
bedrock river answers by sending it upstream as a step, which keeps its edge as
it travels. Drop base level in both and watch the difference.

<!--
  The stylesheet is not optional and must come first. The script cannot size a
  frame whose document has not loaded, and these demos pull about 60 MB of
  Pyodide before that happens. Without it the reader spends that whole time
  looking at the browser's default iframe, ~300 px wide, stretched to the
  fallback height below.

  Do not reintroduce width="100%" on the frame. Every browser on an iPad is
  WebKit underneath, and WebKit sizes an iframe to its content rather than
  honoring a percentage width.

  `height` is the demo's measured height at its design width, and is what the
  reader looks at while Pyodide arrives. THIS VALUE IS AN ESTIMATE and has not
  been measured in a browser: 760 px measured for grlp_panel, plus two further
  sliders and a longer blurb. Measure it and correct it.
-->
<link rel="stylesheet"
      href="{{ '/exercises/apps/artesian-embed.css' | relative_url }}?v=f6188e3a">
<iframe src="{{ '/exercises/apps/drlp_panel.html' | relative_url }}" data-artesian data-design-width="900" scrolling="no"
        height="1030" title="Detachment-limited river long-profile model"></iframe>
<script src="{{ '/exercises/apps/artesian-embed.js' | relative_url }}?v=5558fdc9"></script>

**The first load takes 10–30 seconds** while your browser downloads the Python
runtime – about 60 MB. It runs smoothly after that, and the download is cached,
so returning to the page is fast. Nothing is sent to a server: the model runs on
your own machine, inside the browser tab.

## What the controls do

**Set to steady state** puts the river at the profile that exactly balances the
current uplift against the current erodibility, and refits the elevation axis.
**▶** runs the clock, which reads in thousands of years. Change a slider while
it runs and the profile is left where it is and allowed to respond.

| | |
|---|---|
| $\log_{10} K$ | erodibility. Its units depend on $m$ and $n$, so the number on its own is not comparable between settings |
| $m$ | the exponent on discharge |
| $n$ | the exponent on slope. $n = 1$ makes the equation linear, and the knickpoint travels at a speed that does not depend on how steep it is |
| $U$ | rock uplift rate, a **rate**: it does nothing until time passes |
| base level | the elevation of the downstream end, an **elevation**: it moves the moment you drag it. Falls only, unless locked to the uplift rate |

Discharge is not a slider. It is built from the two things that stand between a
position on the river and the water flowing past it: drainage area grows
downstream by Hack's law, $A = x^{7/4}$, and discharge follows from area by a
fixed runoff rate, $Q = 10^{-8} A$.

## Two things this model will not do

**Base level goes down, or it rides the uplift.** Stream power erodes and never
deposits, so nothing here can bring a drowned bed back up: a real river
aggrades, and that is what the
[gravel](/exercises/gravel-river-long-profile/) and sand models are for. So the
base-level slider only falls. Drag it down and the running river responds; drag
it up and the river is rebuilt there instead, which is a different starting
point rather than a filling the model cannot do.

The 🔓 button beside it **locks base level to the uplift rate**. Locked, the
outlet rides the same rising rock as everything else, the whole long profile
goes up at $U$ together, and no *relative* base-level change is left. The river
keeps eroding and loses its steady state: relief closes toward zero while every
elevation climbs. A landscape can be uplifting everywhere and still give its
rivers nothing to cut into.

**There is only one channel.** No tributaries, no confluences, and no
accumulation of discharge from a branching network: just a single long profile
from headwater to outlet.

## Under the hood

The model is [DRLP](https://github.com/MNiMORPH/DRLP), the detachment-limited
member of the same family as [GRLP](https://github.com/MNiMORPH/GRLP) and SRLP.
It solves the equation implicitly, sweeping from the outlet upstream so that
every point is solved after the point it drains into, which is exact in one pass
and stable at any time step when $n = 1$. For other $n$ each point needs a root
found, which is done on a bracket that is guaranteed to contain the answer.

The whole thing runs in your browser, compiled to WebAssembly by
[artesian](https://github.com/MNiMORPH/artesian). There is no server.
