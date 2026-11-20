---
title: "Exercise: landscape evolution"
layout: single
permalink: /exercises/landscape-evolution/
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

  The two opening paragraphs are Andy's own, from the 2020 lessons at
  /landscape-evolution/base_equation/ and /landscape-evolution/steady_state/,
  with the equation written in two dimensions and the lessons' k_h written D,
  as the app and the lecture slides have it.
-->

By coupling equations for [hillslope diffusion](/exercises/hillslope-creep/)
and [bedrock-river incision](/exercises/bedrock-river-erosion/) and adding in
tectonic uplift, we can derive a straightforward and broadly-used expression for
[landscape evolution](/landscape-evolution/base_equation/):

$$ \frac{\partial z}{\partial t} = U - K A^m S^n + D \nabla^2 z $$

Rock rises at $U$. Streams remove it at a rate set by drainage area $A$ and
slope $S$, with erodibility $K$. Hillslopes remove it at a rate set by the
curvature of the surface, $\nabla^2 z$, with diffusivity $D$.

Uplift increases slope; slope increases erosion. A
[steady-state landscape](/landscape-evolution/steady_state/) develops under
constant uplift, in which the rate of rock uplift equals the rate of erosion of
the landscape. In a stream, $U = K A^m S^n$: uplift produces steep rivers. On a
hilltop, $U = -D \nabla^2 z$: a higher uplift rate will produce a more sharply
curved hilltop.

<!--
  The stylesheet is not optional and must come first. The script cannot size a
  frame whose document has not loaded, and this demo pulls about 67 MB of
  Pyodide and Landlab before that happens. Without it the reader spends that
  whole time looking at the browser's default iframe, ~300 px wide, stretched
  to the fallback height below.

  Do not reintroduce width="100%" on the frame. Every browser on an iPad is
  WebKit underneath, and WebKit sizes an iframe to its content rather than
  honoring a percentage width.

  `height` is the demo's measured height at its design width, and is what the
  reader looks at while Pyodide arrives: 1167 px at 900 px wide, measured in
  headless Chrome on 2026-11-20 (see exercises/apps/README.md).
-->
<link rel="stylesheet"
      href="{{ '/exercises/apps/artesian-embed.css' | relative_url }}?v=f6188e3a">
<iframe src="{{ '/exercises/apps/lem_panel.html' | relative_url }}" data-artesian data-design-width="900" scrolling="no"
        height="1268" title="Landscape-evolution model: uplift, stream power, and hillslope diffusion"></iframe>
<script src="{{ '/exercises/apps/artesian-embed.js' | relative_url }}?v=5558fdc9"></script>

**The first load takes 10–30 seconds** while your browser downloads the Python
runtime and Landlab – about 67 MB. It runs smoothly after that, and the download
is cached, so returning to the page is fast. Nothing is sent to a server: the
model runs on your own machine, inside the browser tab.

## What the controls do

**▶** runs the clock, which reads in thousands of years above the map and
advances 2000 years per frame. **Speed** sets how many thousands of years pass
each second by changing the time between frames, and the landscape is the same
at any speed. Change a slider while it runs and the landscape is left where it is
and allowed to respond. **Start from a flat surface** begins again from a
surface that is flat to within a millimeter, at the current slider settings.
Click the map to choose the stream. Shift-click it to choose the hillcrest. In
some browsers a right-click does this too. On a touch screen, tap for the
stream and press and hold for the hillcrest.

| | |
|---|---|
| $U$ | rock uplift rate, the same everywhere on the block |
| $K$ | erodibility. With $m = 0.5$ and $n = 1$ its units are 1/yr |
| $D$ | hillslope diffusivity, the $k_\mathrm{hs}$ of [the hillslope exercise](/exercises/hillslope-creep/) |

The exponents are not sliders: $m = 0.5$ and $n = 1$. The block is 2 km on a
side, on a grid of 100 × 100 nodes spaced 20 m apart. Its south edge is held at
an elevation of zero and its other three edges are closed, so that all of the
water leaves to the south.

## What the plots show

| | |
|---|---|
| map | shaded relief colored by elevation, with the stream in blue, the hillslope profile in dark gray, and its crest marked. The title gives the time and the elevation of the highest point on the block |
| hillcrest | the hillcrest nearest your shift-click, with the profile that runs from it down the steepest descent to the valley on either side. Before any click it is the highest point on the block. The dashed parabola has the curvature of the crest. The title gives that curvature, $\nabla^2 z$, and $-D \nabla^2 z$ |
| long profile | the stream nearest your click, from its head to the south edge. Before any click it is the trunk stream, which brings the most drainage area to the south edge |
| slope–area | the slope at each node of that stream against its drainage area, on logarithmic axes |

The open circle on the map, the long profile, and the slope–area plot is the
channel–hillslope transition: the first point down the stream where the surface
is not convex ($\nabla^2 z \geq 0$).

The checkboxes above the map each draw a set of lines on it, in the
checkbox's own color:

| | |
|---|---|
| channel–hillslope transition | the line $\nabla^2 z = 0$ over the whole map |
| ridgelines | the ridges between the streams that drain at least 0.04 km² |
| channels | every channel. A channel starts where 1600 m² drain to it, and no higher than its transition |

While the channels are drawn, they can be colored, and a halo then marks the
chosen stream:

| | |
|---|---|
| Strahler order | darker blues with the order, from first to sixth and above |
| $k_{sn}$ | the steepness of each link of a channel, $k_{sn} = S A^{0.5}$, from blue through orange to red on a logarithmic scale from 2.5 m to 250 m |

The drainage density appears beside them: the length of the channels over the
area of the block.

Check **fit** to draw $S = k_s A^{-\theta}$ through the chosen stream on the
slope–area plot, from its transition down. The plot's title gives $\theta$ and
$k_s$ with both free ($k_s$ is in m$^{2\theta}$), and $k_{sn}$ with $\theta$
held at 0.5.

Hover over a node on the long profile to read its downstream distance,
elevation, drainage area, and slope. Hover over a point on the slope–area plot
to read the same node's drainage area, slope, and downstream distance. Hover
over the map to read elevation, drainage area, and curvature $\nabla^2 z$,
which is negative on a hilltop. Hover over a node on the hillslope to read its
distance from the crest, elevation, drainage area, and curvature.

## Two things this model will not do

**Hillslopes erode and never deposit.** The hillslope term lowers the surface
where it is convex and does nothing where it is concave: soil that reaches a
hollow is taken to leave with the stream. Allow deposition and soil fills the
valley floors, and the streams steepen past $U = K A^m S^n$.

**Uplift is uniform and base level is fixed.** The south edge stays at zero
elevation and every other node rises at $U$. There are no faults and no tilting.

## Under the hood

The model is built from [Landlab](https://github.com/landlab/landlab)
components. `FlowAccumulator` sends the water at each node to the steepest of
its eight neighbors and adds up the drainage area. `FastscapeEroder` solves
stream-power incision implicitly, from the outlet upstream (Braun and Willett,
2013). `LinearDiffuser` takes the hillslope term. Each frame does four things in order:
it uplifts the block, diffuses the hillslopes, routes the water, and incises
the streams.

The whole thing runs in your browser: Landlab compiled to WebAssembly, on a page
built by [artesian](https://github.com/MNiMORPH/artesian). There is no server.
