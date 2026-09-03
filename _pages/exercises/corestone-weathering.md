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
- **Cell size** is the numerical grid, not the rock: 5 cm, 2.5 cm or 2 cm
  across the same 3 m section. Finer resolves the weathering rind more
  sharply and costs about eighteen times the computing at 2 cm, so use
  **Show result** rather than watching it animate. Note that fewer joint
  orientations and spacings are available at 2 cm – only patterns that fit a
  whole number of cells can tile the section exactly, and which ones those
  are depends on the grid.

**▶** animates from fresh rock and keeps going until there is nothing left to
watch. **View results at** with **Show** asks a different question – what does
the rock look like at 50 kyr? – and answers it directly, without the animation.

Use **Show** to compare: set a time, press it, change one slider, press it
again. It always rebuilds from fresh rock, so the answer depends only on the
settings and the time and never on what you pressed before it. Two settings
seen at the same age is a comparison; two settings seen at whatever moment you
happened to press pause is not.

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

  scrolling="no" because the frame is sized to its content and so has
  nothing to scroll. Where it can scroll, a touch drag pans the demo off
  the edge of its own frame with no obvious way back -- which is what an
  iPad did, on a rounding difference of a pixel or two.

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
      href="{{ '/exercises/apps/artesian-embed.css' | relative_url }}?v=f6188e3a">
<iframe src="{{ '/exercises/apps/corestone_panel.html' | relative_url }}" data-artesian data-design-width="900" scrolling="no"
        height="555" title="Fracture-controlled granite weathering model"></iframe>
<script src="{{ '/exercises/apps/artesian-embed.js' | relative_url }}?v=5558fdc9"></script>

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

**The rock conducts better as it dissolves, and that changes everything.**
Weathering opens connected porosity, so water is drawn into the weathered zone,
which weathers it faster still. The conductivity of the matrix is interpolated
geometrically between intact granite and fully dissolved rock,

$$k(M) = k_\mathrm{matrix}^{M}\, k_\mathrm{weathered}^{\,1-M}$$

where $M$ is the fraction of the soluble phase remaining, and the head is
re-solved as the rock changes. Watch what that does with depth: the shallow
blocks are destroyed while the deeper ones survive and taper, because water
opens the rock it passes on the way down and arrives at depth already
saturated. That is a weathering *profile*, and it is what a real saprolite
looks like. Held fixed – as this model did until it was checked – the section
weathers at nearly the same rate at every depth, which no outcrop does.

The section is **periodic left to right**. It has no side walls, because a
no-flow wall forces the lateral flow to vanish there and manufactures a
drainage divide down the middle of the domain. That is also why the joint
orientation and spacing sliders snap: only certain angles and spacings let the
joint pattern close on itself across the seam.

## Where the numbers come from

**Two are measured. The rest are placeholders**, and the difference matters if
you are tempted to read a rate off the screen.

Measured: the two ends of the matrix conductivity, $k_\mathrm{matrix}$ and
$k_\mathrm{weathered}$. Goodfellow et al. (2016) measured the hydraulic
conductivity of granodiorite *matrix* across a range of weathering grades and
found it rises three to four orders of magnitude, from 9 × 10⁻⁹ – 8 × 10⁻⁸
cm s⁻¹ in the parent rock to 9 × 10⁻⁵ – 9 × 10⁻⁴ cm s⁻¹ in the most weathered
samples, driven by the cracking that follows oxidative dissolution of biotite.
The model uses the mid-points of those ranges: 5 × 10⁻¹⁰ and 5 × 10⁻⁶ m s⁻¹.
For comparison, saprolite over granite is usually 10⁻⁷ – 10⁻⁵ m s⁻¹
(Dewandel et al. 2006; Raj 2021), and intact granitic matrix 10⁻¹¹ – 10⁻¹²
m s⁻¹.

Not measured, and simply chosen so the demo behaves on a human timescale: the
conductivity of a jointed cell, the reference dissolution length, the
activation energy $E_a$, the reaction enthalpy $\Delta H_r$, the diffusivity
and the dispersivity. **No number this model produces is a rate for any real
granite.**

The colour bar reads *none* to *all* of the soluble phase, and deliberately
not *rock* to *grus*. The model tracks one number per cell – how much of the
soluble phase has gone – and the weathering grades are not that. Fresh rock,
saprock, saprolite and grus are distinguished by fabric and mineralogy, and a
**corestone is a shape**: a rounded block surrounded by weathered rock, which
no per-cell threshold can recognise. This page used to report "grus X %,
corestone Y %" from two cut-offs that were never justified, and under which
intact bedrock at depth counted as corestone. What you see instead is the
mean fraction dissolved, which needs no cut-off.

That is not a disclaimer to skim. Until this exercise was checked against the
literature, the intact-granite conductivity in it was 10⁻⁸ m s⁻¹ – between
twelve and a hundred times too high – and the flow field never changed as the
rock weathered at all.

## References

- Goodfellow, B.W., Hilley, G.E., Webb, S.M., Sklar, L.S., Moon, S. & Olson,
  C.A. (2016). The chemical, mechanical, and hydrological evolution of
  weathering granitoid. *Journal of Geophysical Research: Earth Surface*
  **121**, 1410–1435. [doi:10.1002/2016JF003822](https://doi.org/10.1002/2016JF003822)
- Dewandel, B., Lachassagne, P., Wyns, R., Maréchal, J.C. & Krishnamurthy,
  N.S. (2006). A generalized 3-D geological and hydrogeological conceptual
  model of granite aquifers controlled by single or multiphase weathering.
  *Journal of Hydrology* **330**, 260–284.
  [doi:10.1016/j.jhydrol.2006.03.026](https://doi.org/10.1016/j.jhydrol.2006.03.026)
- Raj, J.K. (2021). Saturated hydraulic conductivity (Ks) of earth materials in
  the weathering profile over a porphyritic biotite granite at the Kuala
  Lumpur – Karak Highway in Peninsular Malaysia. *Bulletin of the Geological
  Society of Malaysia* **71**, 1–11.
  [doi:10.7186/bgsm71202101](https://doi.org/10.7186/bgsm71202101)
- Wickert, A.D. & Schildgen, T.F. (2019). Long-profile evolution of
  transport-limited gravel-bed rivers. *Earth Surface Dynamics* **7**,
  17–43. [doi:10.5194/esurf-7-17-2019](https://doi.org/10.5194/esurf-7-17-2019)
  – the companion exercise.

The model is compiled to WebAssembly with
[artesian](https://github.com/MNiMORPH/artesian) and runs via
[Pyodide](https://pyodide.org).
