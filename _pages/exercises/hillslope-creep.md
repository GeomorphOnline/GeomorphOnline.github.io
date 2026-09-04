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
-->

Every model of a soil-mantled hillslope contains one number, $k_\mathrm{hs}$,
and almost nothing you can measure in a field season goes into it. It is fitted
to topography, quoted in m² yr⁻¹, and left standing for every process that
moves soil downhill at once: worms, gophers, frost, tree throw, rainsplash,
burrowing, ploughing. Calling it a diffusivity does not make it one thing.

This exercise takes it apart. You will not set $k_\mathrm{hs}$ here. You will
set two quantities that a person can go and measure, and the model will hand
$k_\mathrm{hs}$ back to you as a consequence.

## What actually creeps

Soil does not slide downhill as a slab. It creeps fastest at the surface and
more slowly with depth, and the decline is roughly exponential. You can see
this directly: set a segmented rod into a vertical hole, come back years later
and dig it up, and it comes out bent — displaced most at the top, hardly at all
at its base. Laboratory hillslopes instrumented down to the grain scale show
the same profile (Deshpande et al., 2021), with surface creep of order
10⁻⁹ m s⁻¹, about 30 mm yr⁻¹.

Two numbers describe that bent rod:

- how fast the **surface** is moving, and
- how quickly the motion **dies away downward**.

Write the downslope velocity $u$ at depth $\zeta$ below the ground surface as

$$u(x, \zeta) = -k_u \frac{\partial z}{\partial x}\, e^{-\zeta / \Delta z_u}$$

Here $k_u$ is the surface creep velocity per unit slope, in m yr⁻¹, and
$\Delta z_u$ is the depth over which the velocity falls by a factor of
$e \approx 2.718$. Both are measurable. Neither is a diffusivity.

Now add up all the moving soil. The depth-integrated discharge of mobile
material is that velocity integrated over the moving layer,

$$q_m = \int_0^{\infty}\! u\, \mathrm{d}\zeta
      = -k_u \Delta z_u \frac{\partial z}{\partial x}$$

Compare it with the transport rule that defines a hillslope diffusivity,
$q_m = -k_\mathrm{hs}\,\mathrm{d}z/\mathrm{d}x$, and the two sit on top of each
other:

$$\boxed{\;k_\mathrm{hs} = k_u\, \Delta z_u\;}$$

**The hillslope diffusivity is a surface speed multiplied by a depth.** It was
never one thing. It is two things, and the model below lets you set them
separately and watch what each one does. The line under the sliders writes the
product out as you move them.

## Reading the demo

The **upper panel** is the hillslope, at true vertical scale, with rivers at
both ends. The dashed line is the steady form the profile is chasing — the
parabola that balances erosion against transport,
$z = -\tfrac{1}{2}(\dot\varepsilon/k_\mathrm{hs})x^2 + z_0$. The sand-coloured
band is the valley floor.

The **lower panel** is the part you cannot see in the field: the creep velocity
underneath the surface. Blue is material moving left, red is material moving
right, and white is the divide, where nothing moves sideways at all. Colour
fades downward as the exponential decays.

The lower panel has its **own depth axis**, and it has to. At the default
settings the hill stands 6.25 m above the rivers while the creep dies away over
0.5 m — a ratio of about 12 to 1, and 50 to 1 on a hillslope of realistic
length. Drawn to the same vertical scale as the topography, all of the motion
in this model would be a smear one pixel tall.

Three sliders:

- **$k_u$**, the surface creep velocity at unit slope.
- **$\Delta z_u$**, the creep e-folding depth.
- **$\dot\varepsilon$**, the rate at which the rivers cut down. Set it
  **negative** and they aggrade instead: sediment fills the valley, buries the
  foot of the hillslope, and the hillslope gets genuinely *shorter*. The
  read-out reports how much is buried.

And three buttons. **▶ Run** animates at about 30 000 model years per second.
**Flatten** starts again from a flat surface. **Jump to equilibrium** imposes
the steady form directly, instead of waiting out the 100 000-year relaxation
it would otherwise take.

## What to do

Work through these in order. Each takes a couple of minutes.

**1. Build a diffusivity.** Press **▶ Run** at the default settings and let the
hill grow until it stops changing — about ten seconds. Note $k_\mathrm{hs}$,
the height of the crest, and the surface creep velocity reported above the
lower panel. Now double $\Delta z_u$ to 1.0 m. What happened to
$k_\mathrm{hs}$? To the hill? Write down *why* the hill got flatter, in terms
of how much soil is now in motion.

**2. Two hills that are the same, and are not.** Press **Flatten**, set
$k_u = 0.010$ and $\Delta z_u = 1.00$, and press **Jump to equilibrium**.
Record the crest height and the surface velocity. Now set $k_u = 0.040$ and
$\Delta z_u = 0.25$ and jump again.

$k_\mathrm{hs}$ is 0.0100 m² yr⁻¹ in both cases, and the two hillslopes are the
same shape to within a couple of centimetres. **The surface is moving four
times faster in the second one.** Look at the lower panel in each and describe
the difference in your own words. Then answer: if you surveyed only the
topography of these two hillslopes, could you tell them apart? If you drove a
rod into the soil, could you?

**3. Predict, then test.** Go back to $\Delta z_u = 0.50$ m and try
$k_u = 0.010$, then $k_u = 0.050$, jumping to equilibrium each time. Before
each one, predict what will happen to the steady surface creep velocity.

Most people predict that five times the creep coefficient gives five times the
surface speed. It does not. At steady state every grain eroded above a point
must pass that point, so the flux is fixed by the erosion rate and the length
of the hillslope, not by $k_u$:

$$u_s = \frac{\dot\varepsilon\, x'}{\Delta z_u}$$

with $x'$ the distance from the divide. There is no $k_u$ in it. What $k_u$
sets is **how steep the hill has to get** to carry that flux: 11.83 m of relief
at $k_u = 0.010$ against 2.50 m at $k_u = 0.050$, with the surface creeping at
about 5 mm yr⁻¹ in both. Verify this, then explain it.

**4. Bury it.** Return to the defaults and press **Jump to equilibrium**. Now
drag $\dot\varepsilon$ to its most negative value and press **▶ Run**. The
rivers stop cutting down and start filling their valleys.

Watch two things at once: the read-out, which reports how many metres of
hillslope the sediment has buried, and the lower panel, where creep stops
wherever the alluvium has covered the ground — while a river is *aggrading* it
is actively regrading its floodplain, holding it flat, so nothing there creeps.

Now set $\dot\varepsilon$ to exactly **zero** and keep running. The rivers stop,
and with them the regrading: the floodplain is abandoned, and the step where it
abuts the hillslope relaxes. Watch the sharp break at the edge of the fill
soften into a smooth S-shape running all the way from the river to the divide.
That is a scarp degrading, and it is the same diffusion that shapes the hill.

Then drag $\dot\varepsilon$ to a positive value and keep running. The
sediment does not disappear: the rivers cut down through their own fill and
leave it standing on either side as a **fill terrace**. Watch what happens to
that terrace over the next few tens of thousands of years. Why does it start
to degrade only once the river has dropped below it?

**5. Check a parameter choice.** Hillslope models are often run by choosing
$k_\mathrm{hs}$ directly. Suppose someone picks $k_\mathrm{hs} = 0.5$ m² yr⁻¹
for a 1 km hillslope whose rivers incise at 0.2 mm yr⁻¹ — values that give a
50 m hill and relax over a few hundred thousand years, so they look entirely
reasonable.

Use $u_s = \dot\varepsilon\, x' / \Delta z_u$ to work out what surface creep
velocity those numbers require at the toe, taking $\Delta z_u = 0.5$ m. Compare
it with the measured rates quoted above. What does the comparison tell you —
about the hillslope, or about the parameters? This is what factoring
$k_\mathrm{hs}$ buys: a choice that was arbitrary becomes checkable.

<!--
  Frame sizing follows exercises/apps/README.md and the corestone page.

  data-design-width is the width the app lays itself out for, and it is
  ALSO recorded inside the compiled page. Two places on purpose: the
  script cannot read the compiled page while this page lays itself out,
  because an iframe starts on a blank document, and on WebKit -- every
  browser on an iPad -- that is what it sees. Without the attribute the
  demo is never scaled: it sits at its own width inside a wider frame.

  height="903" is MEASURED, not guessed: it is the app's content height at
  its 900 px design width, obtained by loading the compiled page in a
  900 px window and collapsing the body before reading scrollHeight (Panel
  fills whatever height it is given, so measuring a tall page reads back
  the height you handed it). RE-MEASURE after any change that adds or
  removes a row of controls -- this went from 860 to 903 when the
  equilibrium button and the k_hs read-out were added.

  The ?v= on the stylesheet and the script is the first eight characters of
  each file's SHA-1. BUMP THESE whenever a rebuild changes those two files.

  scrolling="no" because the frame is sized to its content. No width="100%":
  WebKit sizes an iframe to its content rather than honouring a percentage,
  which sends the demo off the side of the page on every iPad.
-->
<link rel="stylesheet"
      href="{{ '/exercises/apps/artesian-embed.css' | relative_url }}?v=f6188e3a">
<iframe src="{{ '/exercises/apps/hillcreep_panel.html' | relative_url }}" data-artesian data-design-width="900" scrolling="no"
        height="903" title="Hillslope creep and diffusion model"></iframe>
<script src="{{ '/exercises/apps/artesian-embed.js' | relative_url }}?v=5558fdc9"></script>

**The first load takes 10–30 seconds** while your browser downloads the Python
runtime – about 70 MB. It runs smoothly after that, and the download is cached,
so returning to the page is fast. Nothing is sent to a server: the model runs on
your own machine, inside the browser tab.

## Under the hood

The model is [hillcreep](https://github.com/MNiMORPH/hillcreep). Conservation
of mass on a column of mobile material gives

$$\frac{\partial z}{\partial t} =
  \frac{\partial}{\partial x}\left(k_\mathrm{hs} \frac{\partial z}{\partial x}\right)$$

which is the diffusion equation, solved here with the rivers at each end
setting the boundary elevations. Nothing about the evolving topography is new.
What is different is that $k_\mathrm{hs}$ is never supplied: it is assembled
from $k_u$ and $\Delta z_u$ every time you move a slider, and the velocity
profile it summarises is drawn underneath the hill.

The transport law is not invented here either. Integrating an exponential creep
profile over a mobile layer of finite thickness $h_m$ gives

$$q_m = -k_u \Delta z_u \left(1 - e^{-h_m/\Delta z_u}\right)
        \frac{\partial z}{\partial x}$$

which is the law of Johnstone and Hilley (2015). **This model runs the
no-bedrock limit** of it: the mobile layer is treated as deep compared with
$\Delta z_u$, the exponential term vanishes, and $k_\mathrm{hs} = k_u \Delta
z_u$ exactly. That is what makes the two sliders multiply cleanly, and it is
also what this version gives up — see below.

**Aggradation** is handled as a level set, and deposition is permanent. The
alluvial surface is one flat elevation; ground lying below it is raised to it
and held there, so the fill stays flat and the exposed hillslope gets shorter.

The hold lasts only as long as the river is **aggrading**, because that is what
holding a floodplain flat consists of — actively regrading it. A river that has
stopped, or that is cutting down, has abandoned that surface, and it becomes
ordinary topography that diffuses like everything else. So a static base level
relaxes the fill edge into a sigmoid, and a falling one leaves the sediment
standing above the river as a **fill terrace** that then degrades.

Nothing is ever lowered back: what was deposited stays.

Mass is deliberately not conserved within the hillslope. It should not be —
the river is delivering material from outside it.

## Where the numbers come from

| | symbol | value | where it came from |
|---|---|---|---|
| Hillslope width | $L$ | 100 m | **chosen.** Divide to channel, a soil-mantled hillslope in humid terrain |
| Surface creep velocity at unit slope | $k_u$ | 0.02 m yr⁻¹ | **chosen to match measurement.** Gives 5 mm yr⁻¹ at the toe, inside the measured range |
| Creep e-folding depth | $\Delta z_u$ | 0.5 m | **chosen.** Of the order of a soil profile |
| River incision rate | $\dot\varepsilon$ | 0.05 mm yr⁻¹ | **chosen.** A slowly lowering base level |
| Hillslope diffusivity | $k_\mathrm{hs}$ | 0.01 m² yr⁻¹ | **computed**, $= k_u \Delta z_u$. Within the range fitted to real hillslopes |
| Steady crest | | 6.25 m | **computed**, $\dot\varepsilon L^2 / 8k_\mathrm{hs}$ |
| Steady toe slope | | 0.25 (14.0°) | **computed.** Below where a linear creep law breaks down |
| Steady surface velocity at the toe | $u_s$ | 5.00 mm yr⁻¹ | **computed**, $\dot\varepsilon L / 2\Delta z_u$ |
| Relaxation time | | 1.0 × 10⁵ yr | **computed**, $L^2/\pi^2 k_\mathrm{hs}$ |

The whole slider range spans surface creep of roughly 1 to 25 mm yr⁻¹ — the
range that has actually been measured on creeping hillslopes.

**No number this model produces is a rate for any particular hillslope.** The
defaults are chosen so that the surface creep velocity lands inside the
measured range, which is a weaker claim than being calibrated to a site.

## What this model does not do

Stated plainly, because each is a real limitation and not a disclaimer:

- **There is no bedrock and no soil thickness.** The bottom of the lower panel
  is a viewing depth, not the base of the soil. So the model cannot show what
  happens when $\Delta z_u$ grows past the soil thickness — at which point
  deepening the mobile zone stops raising $k_\mathrm{hs}$, because there is no
  more soil to move. That is the interesting behaviour of $\Delta z_u$, and
  this version does not have it.
- **There is no weathering**, so soil is never produced and never runs out.
- **Transport is linear in slope.** Push the sliders to a steep combination —
  $\dot\varepsilon = 0.10$ mm yr⁻¹ with $\Delta z_u = 0.25$ m — and the steady
  slope reaches 45°, where hillslopes fail in landslides rather than creep.
  The model will happily draw it. Nothing warns you, because the honest answer
  is a mass-wasting model, not a warning label.
- **Only the downslope component of velocity is drawn.** Real soil also moves
  up and down as it is disturbed and as the surface lowers.
- **Both rivers share one rate**, so the divide stays in the middle. Incise one
  side faster and the divide would migrate towards it.
- **Alluvium is held perfectly flat while the river aggrades**, and creeps like
  hillslope soil the moment it stops. A real valley fill has transport of its
  own in both states, and its own grain size.
- **No sediment volume is tracked**, only a level. So the model cannot run out
  of sediment, and cannot tell you how much the river had to supply.

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

The model is compiled to WebAssembly with
[artesian](https://github.com/MNiMORPH/artesian) and runs via
[Pyodide](https://pyodide.org).
