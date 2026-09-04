---
title: "Exercise: hillslope diffusivity, taken apart"
layout: single
permalink: /exercises/hillslope-creep/
author_profile: false
sitemap: false
classes: wide full-bleed
---

<!--
  UNLINKED PAGE. `sitemap: false` keeps it out of sitemap.xml, which reduces
  search indexing. It is NOT private: this repository and this site are public,
  so anyone with the URL can reach the page. Do not put solutions here.

  Not linked from the schedule, matching the other two exercises. Adding a
  link under "Week 4: Hillslopes" is a one-line change to _pages/schedule.md
  and is Andy's call, since it makes the page discoverable.
-->

Every model of a soil-mantled hillslope contains one number, $k_\mathrm{hs}$,
and almost nothing you can measure in a field season goes into it. The course
notes are blunt about what it is:

> It's a black box – an admission of defeat before we even start. It's
> geomorphologists saying, *it is really incredibly difficult to decide whether
> this rate of downslope sediment transport resulted from worms or gophers or
> frost or trees tipping over or mineral breakdown or rainsplash or feral pigs
> digging.*

This exercise opens the box. You will not set $k_\mathrm{hs}$ here. You will
set two quantities that a person can go and measure, and the model will hand
$k_\mathrm{hs}$ back to you as a consequence.

## What actually creeps

Soil does not slide downhill as a slab. It creeps fastest at the surface and
more slowly with depth, and the decline is roughly exponential. Roger Hooke
measured this directly in the Minnesota River Valley: segmented wooden rods
were set into vertical holes at the Bevens Creek creep stations in 1968 and dug
up 9.5 years later, and the rods came out bent – displaced most at the top,
hardly at all at their base. The figure is in your
[hillslope course notes]({{ '/assets/notes/02_03_Hillslopes.pdf' | relative_url }}).

Two numbers describe that bent rod:

- how fast the **surface** is moving, and
- how quickly the motion **dies away downward**.

Write the downslope velocity $u$ at depth $\zeta$ below the ground surface as

$$u(x, \zeta) = -k_u \frac{\partial z}{\partial x}\, e^{-\zeta / \Delta z_u}$$

Here $k_u$ is the surface creep velocity per unit slope, in m yr⁻¹, and
$\Delta z_u$ is the depth over which the velocity falls by a factor of
$e \approx 2.718$. Both are measurable. Neither is a diffusivity.

Now add up all the moving soil. The depth-integrated discharge of mobile
material is the integral of that velocity over the moving layer,

$$q_m = \int_0^{\infty}\! u\, \mathrm{d}\zeta
      = -k_u \Delta z_u \frac{\partial z}{\partial x}$$

and comparing that with the transport rule from the notes,
$q_m = -k_\mathrm{hs}\,\mathrm{d}z/\mathrm{d}x$, gives the whole point of this
exercise:

$$\boxed{\;k_\mathrm{hs} = k_u\, \Delta z_u\;}$$

**The hillslope diffusivity is a surface speed multiplied by a depth.** It was
never one thing. It is two things, and the model below lets you set them
separately and watch what each one does.

## Reading the demo

The **upper panel** is the hillslope, at true vertical scale, with rivers
incising at both ends. The dashed line is the steady form the profile is
chasing – the parabola from your notes,
$z = -\tfrac{1}{2}(\dot\varepsilon/k_\mathrm{hs})x^2 + z_0$.

The **lower panel** is the part you cannot see in the field: the creep velocity
underneath the surface. Blue is material moving left, red is material moving
right, and white is the divide, where nothing moves sideways at all. Colour
fades downward as the exponential decays.

The lower panel has its **own depth axis**, and it has to. At the default
settings the hill stands 6.25 m above the rivers while the creep dies away over
0.5 m – a ratio of about 12 to 1, and 50 to 1 at the scale of a real Minnesota
hillslope. Drawn to the same vertical scale as the topography, all of the
motion in this model would be a smear one pixel tall.

Three sliders:

- **$k_u$**, the surface creep velocity at unit slope.
- **$\Delta z_u$**, the creep e-folding depth.
- **$\dot\varepsilon$**, the rate at which the rivers at both ends cut down.
  Negative means they aggrade instead; the model stops when the sediment
  reaches the foot of the hill, because burying a hillslope toe is a problem it
  does not solve yet.

$k_\mathrm{hs}$ is printed above the upper panel. You cannot set it directly.

## What to do

Work through these in order. Each one takes a couple of minutes.

**1. Build a diffusivity.** Press **▶ Run** at the default settings and let the
hill grow until it stops changing – about ten seconds. Note $k_\mathrm{hs}$,
the height of the crest, and the surface creep velocity reported above the
lower panel. Now double $\Delta z_u$ to 1.0 m. What happened to
$k_\mathrm{hs}$? To the hill? Write down *why* the hill got flatter, in terms
of how much soil is now in motion.

**2. Two hills that are the same, and are not.** Press **Flatten**, set
$k_u = 0.010$ and $\Delta z_u = 1.00$, and run to steady state. Record the
crest height and the surface velocity. Now press **Flatten** again, set
$k_u = 0.040$ and $\Delta z_u = 0.25$, and run again.

$k_\mathrm{hs}$ is 0.0100 m² yr⁻¹ in both cases, and the two hillslopes are the
same shape to within a couple of centimetres. **The surface is moving four
times faster in the second one.** Look at the lower panel in each and describe
the difference in your own words. Then answer: if you surveyed only the
topography of these two hillslopes, could you tell them apart? If you drove a
rod into the soil, could you?

**3. Predict, then test.** Go back to $\Delta z_u = 0.50$ m and try
$k_u = 0.010$, then $k_u = 0.050$. Before you run each one, predict what will
happen to the steady surface creep velocity.

Most people predict that five times the creep coefficient gives five times the
surface speed. It does not. At steady state every grain eroded above a point
must pass that point, so the flux is fixed by the erosion rate and the length
of the hillslope, not by $k_u$:

$$u_s = \frac{\dot\varepsilon\, x'}{\Delta z_u}$$

with $x'$ the distance from the divide. There is no $k_u$ in it. What $k_u$
sets is **how steep the hill has to get** to carry that flux: 11.83 m of relief
at $k_u = 0.010$ against 2.50 m at $k_u = 0.050$, with the surface creeping at
about 5 mm yr⁻¹ in both. Verify this, then explain it.

**4. Check the textbook.** The hillslope model you ran in class uses
$k_\mathrm{hs} = 0.5$ m² yr⁻¹ on a 1 km hillslope incising at 0.2 mm yr⁻¹. Use
$u_s = \dot\varepsilon x' / \Delta z_u$ to work out what surface creep velocity
those numbers imply, taking $\Delta z_u = 0.5$ m. Compare it with the
measured rates in the table below. What does the comparison tell you – about
the hillslope, or about the parameters?

<!--
  Frame sizing follows exercises/apps/README.md and the corestone page.

  data-design-width is the width the app lays itself out for, and it is
  ALSO recorded inside the compiled page. Two places on purpose: the
  script cannot read the compiled page while this page lays itself out,
  because an iframe starts on a blank document, and on WebKit -- every
  browser on an iPad -- that is what it sees. Without the attribute the
  demo is never scaled: it sits at its own width inside a wider frame.

  height="860" is MEASURED, not guessed: it is the app's content height at
  its 900 px design width, obtained by loading the compiled page in a
  900 px window and collapsing the body before reading scrollHeight (Panel
  fills whatever height it is given, so measuring a tall page reads back
  the height you handed it). It is what the reader looks at while ~70 MB of
  Pyodide arrives, and the script only replaces it once the app renders.

  The ?v= on the stylesheet and the script is the first eight characters of
  each file's SHA-1. This build did not change either file -- both are
  byte-identical to the versions the other two exercises already reference
  -- so the hashes here match theirs and nothing needed bumping. BUMP THESE
  whenever a rebuild does change them.

  scrolling="no" because the frame is sized to its content. No width="100%":
  WebKit sizes an iframe to its content rather than honouring a percentage,
  which sends the demo off the side of the page on every iPad.
-->
<link rel="stylesheet"
      href="{{ '/exercises/apps/artesian-embed.css' | relative_url }}?v=f6188e3a">
<iframe src="{{ '/exercises/apps/hillcreep_panel.html' | relative_url }}" data-artesian data-design-width="900" scrolling="no"
        height="860" title="Hillslope creep and diffusion model"></iframe>
<script src="{{ '/exercises/apps/artesian-embed.js' | relative_url }}?v=5558fdc9"></script>

**The first load takes 10–30 seconds** while your browser downloads the Python
runtime – about 70 MB. It runs smoothly after that, and the download is cached,
so returning to the page is fast. Nothing is sent to a server: the model runs on
your own machine, inside the browser tab.

## Under the hood

The model is [hillcreep](https://github.com/MNiMORPH/hillcreep). It solves the
same equation as the hillslope model in your notes,

$$\frac{\partial z}{\partial t} =
  \frac{\partial}{\partial x}\left(k_\mathrm{hs} \frac{\partial z}{\partial x}\right)$$

by conservation of mass, with the rivers at each end setting the boundary
elevations. Nothing about the evolving topography is new: this is linear
diffusion, the same as the script you ran in class. What is different is that
$k_\mathrm{hs}$ is never supplied. It is assembled from $k_u$ and $\Delta z_u$
every time you move a slider, and the velocity profile it summarises is drawn
underneath the hill.

The transport law is not invented here either. Integrating an exponential creep
profile over the mobile layer gives, with a finite soil thickness $h_m$,

$$q_m = -k_u \Delta z_u \left(1 - e^{-h_m/\Delta z_u}\right)
        \frac{\partial z}{\partial x}$$

which is the law of Johnstone and Hilley (2015), and the same expression
derived in the course notes from Hooke's Bevens Creek profiles. **This model
runs the no-bedrock limit** of it: the mobile layer is treated as deep compared
with $\Delta z_u$, the exponential term vanishes, and $k_\mathrm{hs} = k_u
\Delta z_u$ exactly. That is what makes the two sliders multiply cleanly, and
it is also what this version gives up – see below.

## Where the numbers come from

| | symbol | value | where it came from |
|---|---|---|---|
| Hillslope width | $L$ | 100 m | **chosen.** Divide to channel, a soil-mantled hillslope in humid terrain |
| Surface creep velocity at unit slope | $k_u$ | 0.02 m yr⁻¹ | **chosen to match measurement.** Gives 5 mm yr⁻¹ at the toe, within the measured range below |
| Creep e-folding depth | $\Delta z_u$ | 0.5 m | **chosen.** Of the order of a soil profile, consistent with Hooke's rods |
| River incision rate | $\dot\varepsilon$ | 0.05 mm yr⁻¹ | **chosen.** A slowly lowering base level |
| Hillslope diffusivity | $k_\mathrm{hs}$ | 0.01 m² yr⁻¹ | **computed**, $= k_u \Delta z_u$. Within the range fitted to real hillslopes |
| Steady crest | | 6.25 m | **computed**, $\dot\varepsilon L^2 / 8k_\mathrm{hs}$ |
| Steady toe slope | | 0.25 (14.0°) | **computed.** Below where a linear creep law breaks down |
| Steady surface velocity at the toe | $u_s$ | 5.00 mm yr⁻¹ | **computed**, $\dot\varepsilon L / 2\Delta z_u$ |
| Relaxation time | | 1.0 × 10⁵ yr | **computed**, $L^2/\pi^2 k_\mathrm{hs}$ |

For comparison, Deshpande et al. (2021) report field surface creep velocities
of order 10⁻⁹ m s⁻¹, which is about **30 mm yr⁻¹**. The default settings here
sit a little below that, and the whole slider range spans roughly 1 to 25 mm
yr⁻¹ – the range that has actually been measured on creeping hillslopes.

That is the comparison that makes exercise 4 bite. Run the class script's
parameters through $u_s = \dot\varepsilon L / 2\Delta z_u$ and you get a
surface creeping at **200 mm yr⁻¹** – an order of magnitude faster than
anything anyone has measured on a creeping hillslope, and into the range where
a slope is failing rather than creeping. Those parameters were chosen so the
hill relaxes in a class-sized 400 kyr, and they do that perfectly well. They
are simply not consistent with a creep profile. **That is what factoring
$k_\mathrm{hs}$ buys you**: parameter choices stop being arbitrary and start
being checkable.

## What this model does not do

Stated plainly, because each one is a real limitation and not a disclaimer:

- **There is no bedrock and no soil thickness.** The bottom of the lower panel
  is a viewing depth, not the base of the soil. So the model cannot show what
  happens when $\Delta z_u$ grows past the soil thickness – at which point
  deepening the mobile zone stops raising $k_\mathrm{hs}$, because there is no
  more soil to move. That is the interesting behaviour of $\Delta z_u$, and
  this version does not have it.
- **There is no weathering**, so soil is never produced and never runs out.
- **Transport is linear in slope.** Push the sliders to a steep combination –
  $\dot\varepsilon = 0.10$ mm yr⁻¹ with $\Delta z_u = 0.25$ m – and the steady
  slope reaches 45°, where hillslopes fail in landslides rather than creep.
  The model will happily draw it. Nothing warns you, because the honest answer
  is a mass-wasting model, not a warning label.
- **Only the downslope component of velocity is drawn.** Real soil also moves
  up and down as it is disturbed and as the surface lowers.
- **Both rivers share one incision rate**, so the divide stays in the middle.
  Incise one side faster and the divide would migrate towards it.

## References

- Deshpande, N.S., Furbish, D.J., Arratia, P.E. & Jerolmack, D.J. (2021). The
  perpetual fragility of creeping hillslopes. *Nature Communications* **12**,
  3909. [doi:10.1038/s41467-021-23979-z](https://doi.org/10.1038/s41467-021-23979-z)
  – the measured exponential decay of creep velocity with depth.
- Heimsath, A.M., Furbish, D.J. & Dietrich, W.E. (2005). The illusion of
  diffusion: field evidence for depth-dependent sediment transport. *Geology*
  **33**, 949–952. [doi:10.1130/G21868.1](https://doi.org/10.1130/G21868.1)
  – field evidence that transport depends on soil depth as well as slope.
- Johnstone, S.A. & Hilley, G.E. (2015). Lithologic control on the form of
  soil-mantled hillslopes. *Geology* **43**, 83–86.
  [doi:10.1130/G36052.1](https://doi.org/10.1130/G36052.1) – the
  depth-dependent transport law this model runs.
- Roering, J.J. (2004). Soil creep and convex-upward velocity profiles:
  theoretical and experimental investigation of disturbance-driven sediment
  transport on hillslopes. *Earth Surface Processes and Landforms* **29**,
  1597–1612. [doi:10.1002/esp.1112](https://doi.org/10.1002/esp.1112)
- The Bevens Creek creep profiles are Roger Hooke's, measured in the Minnesota
  River Valley; the figure is in the
  [hillslope course notes]({{ '/assets/notes/02_03_Hillslopes.pdf' | relative_url }}).

The model is compiled to WebAssembly with
[artesian](https://github.com/MNiMORPH/artesian) and runs via
[Pyodide](https://pyodide.org).
