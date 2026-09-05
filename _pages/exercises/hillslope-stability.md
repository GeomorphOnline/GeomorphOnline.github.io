---
title: "Exercise: what holds a hillslope up"
layout: single
permalink: /exercises/hillslope-stability/
author_profile: false
sitemap: false
classes: wide full-bleed
---

<!--
  UNLINKED PAGE. `sitemap: false` keeps it out of sitemap.xml, which reduces
  search indexing. It is NOT private: this repository and this site are public,
  so anyone with the URL can reach the page. Do not put solutions here.

  Partner to /exercises/hillslope-creep/. That one is the slow process and
  this one is the sudden process, and they are deliberately built the same
  way: a number everyone quotes is taken apart into things you could measure.
  There k_hs is never an input; here the depth of failure is never an input.
-->

A hillslope that creeps will not creep for ever. Push it steeper and at some
point it stops moving grain by grain and goes all at once. The
[companion exercise]({{ '/exercises/hillslope-creep/' | relative_url }}) is
about the slow way; this one is about the sudden way.

The question that matters in the field is not only *whether* a slope will fail.
It is **how deep the failure will be** – whether you are looking at a metre of
soil peeling off, or ten metres of hillside on the move. Those are different
events, they kill different numbers of people, and they need different
engineering. So the depth is the thing this model solves for. **You never set
it.**

## What actually holds a hillslope up

Take any plane inside the hillside, parallel to the surface, at depth $z$. The
weight of everything above it does two things at once: part of that weight
presses the plane together, and part of it drags the material downslope. The
**factor of safety** is the ratio of what resists to what drives,

$$FS(z) = \frac{c' + \left[\sigma(z) - u(z)\right]\tan\phi'}
                {\tau(z)}$$

and the slope fails on any plane where $FS$ drops to one. Three ingredients
resist: **cohesion** $c'$, which holds the material together on its own;
**friction** $\phi'$, which needs the plane pressed together to work; and the
**normal stress** $\sigma$ doing the pressing. One ingredient attacks:
**pore-water pressure** $u$, which pushes the grains apart and so subtracts
from the stress that friction depends on.

The asymmetry is the whole physics, and it is easy to get backwards. Water in
the pores makes the hillside **heavier**, so it drives harder. Water pressure
in those same pores **floats the grains apart**, so friction resists less.
Water therefore appears on both sides of the balance and loses on neither:
it is the most effective way to bring a hillslope down.

{% include figure image_path="/assets/images/hillslope/infinite-slope-states.png"
   alt="Three hillside sections: stable with no failure plane, a required depth deeper than the hillside, and a failure with a red slab"
   caption="The three things this model can tell you. Left: nothing fails at any depth. Middle: a failure plane exists, but deeper than this hillside can supply. Right: the plane lies inside the hillside, and the shaded slab is what moves." %}

<!--
  data-design-width is the width the app lays itself out for, and it is
  ALSO recorded inside the compiled page. Two places on purpose: the
  script cannot read the compiled page while this page lays itself out,
  because an iframe starts on a blank document, and on WebKit -- every
  browser on an iPad -- that is what it sees. Without the attribute the
  demo is never scaled: it sits at its own width inside a wider frame.

  height="840" is the demo's measured height at its design width, not a
  guess: it is what the reader looks at while ~60 MB of Pyodide arrives,
  and the script only replaces it once the app has rendered. Too small and
  the figures are clipped during the whole load.

  The ?v= on the stylesheet and the script is the first eight characters
  of each file's SHA-1. GitHub Pages serves them with max-age=600 and
  no way to set a header, so without it a reader who visited in the last
  ten minutes silently gets the old one. BUMP THESE whenever artesian is
  rebuilt into exercises/apps. They are unchanged from the other exercises
  here, because this build did not alter artesian-embed.css or .js.

  scrolling="no" because the frame is sized to its content and so has
  nothing to scroll. Where it can scroll, a touch drag pans the demo off
  the edge of its own frame with no obvious way back.

  Do not reintroduce width="100%" on the frame. Every browser on an
  iPad is WebKit underneath, and WebKit sizes an iframe to its content
  rather than honouring a percentage width.
-->
<link rel="stylesheet"
      href="{{ '/exercises/apps/artesian-embed.css' | relative_url }}?v=f6188e3a">
<iframe src="{{ '/exercises/apps/infiniteslope_panel.html' | relative_url }}" data-artesian data-design-width="900" scrolling="no"
        height="840" title="Infinite-slope stability model"></iframe>
<script src="{{ '/exercises/apps/artesian-embed.js' | relative_url }}?v=5558fdc9"></script>

**The first load takes 10–30 seconds** while your browser downloads the Python
runtime – about 40 MB. It runs smoothly after that, and the download is cached,
so returning to the page is fast. Nothing is sent to a server: the model runs on
your own machine, inside the browser tab.

Nothing here animates, and there is no **▶**. Failure is a criterion rather
than a process: you are asking whether a hillside *would* go, not watching it
go. Move a slider and the answer is recomputed.

## What to do

**1. Find the angle of repose, and prove it is the friction angle.** Set
$c' = 0$ and drag the water table down to 20 m, so the hillside is dry.
Now raise $\theta$ until the readout flips to failure. Compare the angle you
found with $\phi'$. Change $\phi'$ and find the new one. Write down the rule
you have just discovered, in one line.

**2. Now drown it.** With $c'$ still zero, set $\theta = 30°$ and $\phi' = 35°$
– a slope your rule from Part 1 says is safe – and drag the water table to the
surface. Find the new angle at which it fails. It should be near 20°. The
stable gradient has roughly **halved**. Using the fact that saturated soil is
about twice as dense as water, explain where the factor of two comes from.

**3. Density does almost nothing.** Set $c' = 0$ and drain the hillside again.
Now sweep the grain density $\rho_r$ across its whole range and watch the
*Cohesionless balance* number in the readout. It does not move. Sweep porosity
$n$: it does not move either. Now put the water table back at the surface and
repeat both sweeps. Explain why density is irrelevant in a dry slope and
matters in a wet one.

**4. Cohesion does not decide whether – it decides how deep.** Set
$\theta = 30°$, $\phi' = 35°$, water table at 0.5 m. Raise $c'$ from 0 to
50 kPa in steps and record the failure depth $t_c$ each time. Two things to
notice: $t_c$ is *proportional* to $c'$, and the *Cohesionless balance* number
never moves at all. Cohesion is divided by depth in the equation above, so it
vanishes from the deep limit. State in one sentence what cohesion is and is not
able to do for a hillside.

**5. Clearcut, plantation, old growth.** Most of the cohesion in a shallow soil
is **roots**. Measured lateral root cohesion in the Oregon Coast Range runs
$\le$ 10 kPa in clearcuts, 6.8–23.2 kPa under industrial forest, and
25.6–94.3 kPa under natural conifer. Set $\theta = 35°$ with the water table at
0.5 m, and step $c'$ through 5, 20 and 50 kPa. Report the failure depth at each.
Then answer: a hillslope is logged, and the roots decay over the following
decade. What happens, and *when* – immediately, or at the next big storm?

**6. When the model quits.** Set $c' = 20$ kPa, $\theta = 25°$, and drag the
water table steadily downward. At some point the readout stops saying
**FAILURE** and starts saying **NO FAILURE** – but read what it actually says.
The failure plane has not gone away; it has gone deeper than the hillside can
supply. Explain why "the required plane is below the hill" is not the same
statement as "the hill is safe", and what you would go and measure to find out
which it is.

## Under the hood

The model is [infiniteslope](https://github.com/GeomorphOnline/infiniteslope).
It is the **infinite-slope** idealisation: the failure plane, the water table
and the ground surface are all parallel, and the slope is long enough that
what happens at its ends does not matter. With slope-parallel seepage and a
water table at vertical depth $d_w$,

$$\sigma(z) = W(z)\,g\cos^2\theta, \qquad
  \tau(z)   = W(z)\,g\sin\theta\cos\theta, \qquad
  u(z)      = \rho_w g (z - d_w)\cos^2\theta$$

where $W(z)$ is the mass of the column above unit horizontal area. Two details
are worth stating because they are the ones most often got wrong:

**There is no porosity in the pore pressure.** Pressure is a property of the
water phase, not an average over the bulk. Porosity governs how much water is
present, and therefore how much weight it adds – it does not govern the
pressure.

**The driving stress carries the total wet weight; the friction carries the
buoyant weight.** Below the water table the effective normal stress goes as
$(1-n)(\rho_r - \rho_w)$, not $(1-n)\rho_r$. Getting this wrong overestimates
the friction by about 60% at typical porosities, which is enough to report a
saturated 30° slope as stable when it is not.

The depth of failure is then the **critical thickness** $t_c$, the shallowest
plane at which $FS = 1$. Because $FS$ decreases monotonically with depth in
homogeneous soil, everything below $t_c$ is unstable too, and the criterion on
its own would put the failure at the deepest plane available. What bounds it
here is the hillside itself.

## Where the numbers come from

Every default is a published central value rather than a convenient one.
Friction angles are peak values for flysch-derived colluvium, $\phi' = 35°$,
with residual values near 31° and 23–29° in the shallowest few metres. Root
cohesion is from the Oregon Coast Range, quoted in Part 5 above. Grain density
and porosity are ordinary values for a quartz-rich soil and are yours to move.

## What this model does not do

- **Nothing moves.** Failure is a criterion here, not a process. The model
  tells you a slope would fail and how deep; it does not run the landslide,
  deposit it, or change the hillside afterwards.
- **There is no bedrock.** The hillside is soil all the way down, so the only
  thing bounding the failure depth is the relief. A real soil–bedrock contact
  usually bounds it first, and that is a shallower and more dangerous answer.
- **The water table is hydrostatic.** Real storms drive a wetting front
  downward and the pressure is *not* hydrostatic while that is happening,
  which can put the most dangerous plane at an intermediate depth rather than
  the deepest one.
- **Suction is ignored.** Above the water table, water held under tension adds
  strength – it is why a sandcastle stands. Leaving it out makes the model
  conservative there.

## References

Cruikshank, K. *Theory of Slope Stability*, Portland State University G483/583.

Lambe, T.W. and Whitman, R.V. (1969) *Soil Mechanics*. Wiley.

Schmidt, K.M., Roering, J.J., Stock, J.D., Dietrich, W.E., Montgomery, D.R. and
Schaub, T. (2001) The variability of root cohesion as an influence on shallow
landslide susceptibility in the Oregon Coast Range. *Canadian Geotechnical
Journal* 38, 995–1024.
