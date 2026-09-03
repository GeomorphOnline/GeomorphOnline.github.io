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
**joints** – the fracture network that tectonics put in the rock long before
any weathering began. Along the way it dissolves the granite it touches, and as
it does so it approaches saturation. Water that has taken all the solute it can
hold stops weathering rock, however soluble that rock is. So weathering is a
race between how fast the joints deliver fresh water and how fast the rock
dissolves into it, and a corestone is simply the place the water never reached,
or reached already saturated.

Press **▶ Run** and watch. The left panel shows how much capacity the water has
left, $1 - C/C_{eq}$: dark green is hungry water, white is water at saturation.
The right panel shows how much of the rock has gone.

- **Joint orientation** and **joint spacing** set the fracture network – the
  input from tectonics, fixed before weathering starts.
- **Infiltration rate** sets how fast rain is delivered.
- **Temperature** does two things at once, and they are worth separating. See
  below.

Each slider rebuilds the rock and restarts the clock, because each one is a
property of the starting state rather than something you can change halfway
through.

Watch the *order* in which the rock goes: the joints first, then the faces of
each block, then – last – the middles. And watch the corners: a corner sheds
its solute into two joints where a face sheds into one, so corners retreat
faster. That is what rounds a block into a corestone.

## What to do

*(To be written.)*

<!--
  data-design-width is the width the app lays itself out for, and it is
  ALSO recorded inside the compiled page. Two places on purpose: the
  script cannot read the compiled page while this page lays itself out,
  because an iframe starts on a blank document, and on WebKit -- every
  browser on an iPad -- that is what it sees. Without the attribute the
  demo is never scaled: it sits at its own width inside a wider frame.

  height="530" is the demo's measured height at its design width, not a
  guess: it is what the reader looks at while ~60 MB of Pyodide arrives,
  and the script only replaces it once the app has rendered. Too small and
  the figures are clipped during the whole load, which is what 400 did.

  The ?v= on the stylesheet and the script is the first eight characters
  of each file's SHA-1. GitHub Pages serves them with max-age=600 and
  no way to set a header, so without it a reader who visited in the last
  ten minutes silently gets the old one -- which cost most of a morning
  to diagnose, twice, because it looks exactly like a fix not working.
  BUMP THESE whenever artesian is rebuilt into exercises/apps.

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
      href="{{ '/exercises/apps/artesian-embed.css' | relative_url }}?v=e23dc239">
<iframe src="{{ '/exercises/apps/corestone_panel.html' | relative_url }}" data-artesian data-design-width="900"
        height="530" title="Fracture-controlled granite weathering model"></iframe>
<script src="{{ '/exercises/apps/artesian-embed.js' | relative_url }}?v=6b38e05a"></script>

**The first load takes 10–30 seconds** while your browser downloads the Python
runtime – about 60 MB. It runs smoothly after that, and the download is cached,
so returning to the page is fast. Nothing is sent to a server: the model runs on
your own machine, inside the browser tab.

## Under the hood

The model is [corestone](https://github.com/MNiMORPH/corestone). Rock dissolves
at a rate set by temperature, multiplied by how far the pore water is from
saturation,

$$R = k(T)\,A\,(1 - C/C_{eq})$$

where $A$ is the reactive surface area. The rate constant $k$ follows the
**Arrhenius equation**,

$$k(T) = k_0 \exp\!\left(-\frac{E_a}{R_g T}\right)$$

with $E_a$ the activation energy and $R_g$ the gas constant: warming the rock
makes the reaction go faster, steeply.

**That is only half of what temperature does, and in this model it is the
smaller half.** The solubility $C_{eq}$ depends on temperature too, through the
van 't Hoff relation,

$$C_{eq}(T) = C_0 \exp\!\left(-\frac{\Delta H_r}{R_g T}\right)$$

so warm water can hold more before it stops dissolving anything. Move the
temperature slider and watch which one you are seeing. Almost everywhere in
this section the water reaches saturation long before it runs out of rock to
attack, so what limits weathering is how much each litre can carry away, not
how fast the reaction runs. The distance over which water approaches
saturation goes as $C_{eq}/k$, so its temperature dependence is set by the
*difference* $(E_a - \Delta H_r)$ and not by the activation energy alone.

Both are worth trying against intuition: raise the temperature and the rock
does not simply dissolve proportionally faster.

The solute the reaction produces is carried by steady groundwater flow and
spread by diffusion,

$$\nabla\cdot(q c) - \nabla\cdot(D \nabla c) = r\,(1 - c)$$

Water is routed by a Darcy solve on a conductance field where the joints
conduct and the intact granite barely does, so flow along a joint is not a
special case – it is what the head field does when a low-resistance path
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
