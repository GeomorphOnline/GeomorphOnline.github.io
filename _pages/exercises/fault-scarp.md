---
title: "Exercise: dating a fault scarp"
layout: single
permalink: /exercises/fault-scarp/
author_profile: false
sitemap: false
classes: wide full-bleed
---

<!--
  UNLINKED PAGE. `sitemap: false` keeps it out of sitemap.xml, which reduces
  search indexing. It is NOT private: this repository and this site are public,
  so anyone with the URL can reach the page. Do not put solutions here.

  Companion to /exercises/hillslope-creep/. Same model, same two sliders, no
  rivers. Read that one first: this page assumes k_hs = k_u * Delta z_u.
-->

An earthquake breaks the ground and leaves a step. The fault made it in
seconds; nothing about it was built by the slow processes that will now take it
apart. From the moment it exists, soil creep starts rounding it off — and it
keeps going, at a rate that depends on nothing but the material and the shape
that is left.

So the scarp is a **clock**. Survey one carefully enough and you can say how
long it has been degrading. That is *morphologic dating*, and this exercise is
about what it does and does not tell you.

## The setup

A flat surface, cut by a fault. The scarp starts as a straight face at **30°**,
flat above and flat below, with the high side on the left — so creep carries
material from left to right.

Thirty degrees is far steeper than creep would ever produce. That is the point:
the fault did not consult the transport law. There are no rivers here and
nothing to carry material out of the picture, so the scarp's **volume never
changes**. It does not wear away; it spreads into itself, and what leaves the
face lands at its foot.

## Reading the demo

The **upper panel** is the scarp. The dashed line is how it was cut; the solid
line is where it has got to.

The **lower panel** is the creep underneath, on its own depth axis. White is no
motion, deeper red is faster. Everything moves one way here — there is no
divide, as there was on the hillslope — so the whole panel is one colour, and
what you are watching is *where* the motion is, not which way.

Two sliders, the same two as the hillslope exercise: the surface creep velocity
at unit slope $k_u$, and the depth $\Delta z_u$ over which that motion dies
away. Their product is the diffusivity $k_\mathrm{hs}$, written out under them.

The read-out also gives the **morphologic age**, $k_\mathrm{hs}\,t$, in square
metres. Watch that rather than the clock. It is the quantity the shape actually
depends on, and the reason is in the solution below.

## What to do

**1. Watch it go.** Press **▶** at the default settings. The face starts at 30°
and the read-out tracks the steepest slope anywhere on the profile. Note the
morphologic age at which the slope has halved to 15°, and again at which it
reaches 5°. Does the second take as long as the first?

**2. Change the rate, not the shape.** Press **Re-cut the scarp**, set
$k_u = 0.010$, and run until $k_\mathrm{hs}\,t$ reaches **100 m²**; note the
clock time and sketch the profile. Re-cut, set $k_u = 0.040$, and run to the
same **100 m²**.

The two profiles are identical. The clock times differ by a factor of four.
Explain why, using the fact that $k_\mathrm{hs}$ and $t$ appear in the solution
only as their product.

**3. The catch.** You are in the field with a total station and a scarp. You
survey it, fit the model, and recover $k_\mathrm{hs}\,t = 100$ m². Your
colleague asks how old the fault is.

Write down what you would need to answer, and where you would get it. Then
notice that the quantity you are missing is $k_u \Delta z_u$ — the two numbers
from the [hillslope exercise]({{ '/exercises/hillslope-creep/' | relative_url }}),
which are measurable by driving a rod into the soil and coming back years
later. Morphologic dating is only as good as the diffusivity someone measured
somewhere else.

**4. Same age, different ground.** Set $k_u = 0.040$ with
$\Delta z_u = 0.25$ m, then $k_u = 0.010$ with $\Delta z_u = 1.00$ m. Both give
$k_\mathrm{hs} = 0.01$ m²/yr, so both scarps degrade identically. Look at the
lower panel in each. What is different about the ground, and would surveying
the scarp ever tell you?

<!--
  Frame sizing follows exercises/apps/README.md and the other exercises.
  height="835" is MEASURED at the 900 px design width, by loading the compiled
  page in a 900 px window and collapsing the body before reading scrollHeight.
  RE-MEASURE after any change that adds or removes a row of controls.
  The ?v= values are the first eight characters of each file's SHA-1; bump them
  whenever a rebuild changes those two files.
-->
<link rel="stylesheet"
      href="{{ '/exercises/apps/artesian-embed.css' | relative_url }}?v=f6188e3a">
<iframe src="{{ '/exercises/apps/scarp_panel.html' | relative_url }}" data-artesian data-design-width="900" scrolling="no"
        height="835" title="A fault scarp diffusing"></iframe>
<script src="{{ '/exercises/apps/artesian-embed.js' | relative_url }}?v=5558fdc9"></script>

**The first load takes 10–30 seconds** while your browser downloads the Python
runtime – about 70 MB. It runs smoothly after that, and the download is cached,
so returning to the page is fast. Nothing is sent to a server: the model runs on
your own machine, inside the browser tab.

## Under the hood

The model is [hillcreep](https://github.com/MNiMORPH/hillcreep), the same one
that runs the hillslope exercise, with the same transport law and different
edges: both ends are closed, so no material leaves.

Unlike the hillslope, this problem has a **closed-form solution**. Differentiate
the diffusion equation and the *slope* of a straight-faced scarp is a diffusing
rectangular pulse — a difference of error functions. Integrating that back, with
$a$ half the scarp height and $w = a/\tan\theta$ half the width of the face,

$$\beta = 2\sqrt{k_\mathrm{hs}\,t}$$

$$z(x,t) = -\frac{a}{2w}\left[(x{+}w)\,\mathrm{erf}\frac{x{+}w}{\beta}
 - (x{-}w)\,\mathrm{erf}\frac{x{-}w}{\beta}
 + \frac{\beta}{\sqrt{\pi}}\left(e^{-((x+w)/\beta)^2}
 - e^{-((x-w)/\beta)^2}\right)\right]$$

Checked against the numerical solution: they agree to 1.2 × 10⁻⁶ m, and the
mean elevation does not move at all, because nothing leaves.

**Look at where $k_\mathrm{hs}$ and $t$ appear.** Only inside $\beta$, and only
as the product $k_\mathrm{hs}\,t$. A scarp has no way of separating them. A fast
scarp seen early and a slow one seen late are not merely similar — they are the
same profile, to the last decimal. That single fact is what morphologic dating
rests on and what limits it.

At long times a scarp of finite width behaves like a step, and the slope at its
midpoint falls as $a/\sqrt{\pi k_\mathrm{hs} t}$ — the classic result that lets
a single mid-point slope measurement stand in for a whole profile
(Nash, 1980).

## Where the numbers come from

| | symbol | value | where it came from |
|---|---|---|---|
| Scarp height | | 5 m | **chosen.** Readable against a 240 m domain, and resolved by a 1 m grid |
| Initial face angle | $\theta$ | 30° | **chosen**, and deliberately far outside what creep produces |
| Domain width | | 240 m | **chosen** wide enough that the ends stay flat; the read-out warns when the scarp reaches them, because the closed form assumes an infinite surface |
| Surface creep velocity at unit slope | $k_u$ | 0.02 m/yr | **chosen to match measurement** |
| Creep e-folding depth | $\Delta z_u$ | 0.5 m | **chosen.** Of the order of a soil profile |
| Diffusivity | $k_\mathrm{hs}$ | 0.01 m² yr⁻¹ | **computed**, $=k_u \Delta z_u$ |

## What this model does not do

- **Transport is linear in slope, and for a scarp this is known to be wrong.**
  Andrews and Bucknam (1987) fitted degraded shoreline scarps on Lakes
  Bonneville and Lahontan and found that transport has to rise *faster* than
  linearly with slope, adopting $k_0(1+5s^2)$. A 30° face is exactly where that
  matters. This model will happily degrade it linearly anyway; the shapes it
  produces early on are therefore too slow to round off, and real scarp-dating
  practice does not use a purely linear law.
- **No background slope.** Real scarps are cut across ground that already tilts,
  and the fitting has to allow for it.
- **The scarp is cut once.** A fault that moves repeatedly leaves a compound
  scarp, and a single morphologic age fitted to one is a weighted average of
  several events rather than the age of any of them.
- **No bedrock, no weathering, and the alluvium at the foot does not behave
  differently from the ground above it** — as on the hillslope, this is one
  material all the way down.

## References

- Nash, D.B. (1980). Morphologic dating of degraded normal fault scarps.
  *The Journal of Geology* **88**, 353–360.
  [doi:10.1086/628513](https://doi.org/10.1086/628513)
- Andrews, D.J. & Bucknam, R.C. (1987). Fitting degradation of shoreline scarps
  by a nonlinear diffusion model. *Journal of Geophysical Research: Solid Earth*
  **92**, 12857–12867.
  [doi:10.1029/JB092iB12p12857](https://doi.org/10.1029/JB092iB12p12857)
  – and the reason a linear law is not what scarp dating actually uses.
- Deshpande, N.S., Furbish, D.J., Arratia, P.E. & Jerolmack, D.J. (2021). The
  perpetual fragility of creeping hillslopes. *Nature Communications* **12**,
  3909. [doi:10.1038/s41467-021-23979-z](https://doi.org/10.1038/s41467-021-23979-z)
  – the measured exponential decay of creep velocity with depth.
- Johnstone, S.A. & Hilley, G.E. (2015). Lithologic control on the form of
  soil-mantled hillslopes. *Geology* **43**, 83–86.
  [doi:10.1130/G36052.1](https://doi.org/10.1130/G36052.1) – the
  depth-dependent transport law this model runs.

The model is compiled to WebAssembly with
[artesian](https://github.com/MNiMORPH/artesian) and runs via
[Pyodide](https://pyodide.org).
