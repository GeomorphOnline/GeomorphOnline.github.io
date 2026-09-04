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

  Two demos on one page. The scarp comes first because it is the simpler
  boundary problem -- nothing holds it, it just relaxes -- and because its
  closed-form solution motivates the hillslope one. Both iframes carry
  loading="lazy": each boots its own ~70 MB Pyodide runtime, so the second
  should not start until a reader has scrolled to it.
-->

Every model of a soil-mantled landscape contains one number, $k_\mathrm{hs}$,
and almost nothing you can measure in a field season goes into it. It is fitted
to topography, quoted in m² yr⁻¹, and left standing for every process that
moves soil downhill at once: worms, gophers, frost, tree throw, rainsplash,
burrowing, ploughing. Calling it a diffusivity does not make it one thing.

These two experiments take it apart. You will not set $k_\mathrm{hs}$ anywhere
on this page. You will set two quantities that a person can go and measure, and
the models will hand $k_\mathrm{hs}$ back to you as a consequence.

## What actually creeps

Soil does not slide downhill as a slab. It creeps fastest at the surface and
more slowly with depth, and the decline is roughly exponential. You can see
this directly: set a segmented rod into a vertical hole, come back years later
and dig it up, and it comes out bent — displaced most at the top, hardly at all
at its base.

{% include figure image_path="/assets/images/hillslope/hooke-bevens-creek-creep-profiles.png"
   alt="Six soil creep profiles from 0 to 42 cm depth, each showing displacement concentrated in the uppermost centimetres and decreasing to nothing with depth"
   caption="Exactly that experiment. Segmented wooden dowels were set into vertical holes at the Bevens Creek creep stations, Minnesota River Valley, in 1968 and dug up 9.5 years later; the horizontal axis is how far each segment had moved, in centimetres. Read two things off it. **The whole soil is 42 cm deep**, and most of the movement is in the top 5–15 cm — that is the e-folding depth. And the surface moved 1.0–8.0 cm in 9.5 years, which is **1.1–8.4 mm per year**. Measurements by Roger Hooke." %}

Laboratory hillslopes instrumented down to the grain scale show the same
exponential shape (Deshpande et al., 2021).

**Every number in these models comes from that figure.** The sliders open at a
0.10 m e-folding depth and produce 5 mm yr⁻¹ of surface creep, which is where
Hooke's stations sit.

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
never one thing. It is two things, and both demos below let you set them
separately and watch what each one does. The line under the sliders writes the
product out as you move them.

Both experiments run the same transport law. They differ only in what happens
at their **edges** — and that turns out to matter more than you might expect.

---

# Part 1 — A fault scarp, left alone

Start here: it is the simpler of the two, because nothing holds it.

An earthquake breaks the ground and leaves a step. The fault made it in
seconds; nothing about it was built by the slow processes that will now take it
apart. From the moment it exists, soil creep starts rounding it off.

The scarp starts as a straight face at **30°**, flat above and flat below, with
the high side on the left — so creep carries material from left to right.
Thirty degrees is far steeper than creep would ever produce; the fault did not
consult the transport law. There are no rivers here and nothing to carry
material out of the picture, so the scarp's **volume never changes**. It does
not wear away; it spreads into itself, and what leaves the face lands at its
foot.

**Reading it.** The upper panel is the scarp: dashed as it was cut, solid as it
is now. The lower panel is the creep underneath, on its own depth axis — white
is no motion, deeper red is faster. Everything moves one way here, so the whole
panel is one colour, and what you are watching is *where* the motion is.

The read-out gives the **morphologic age**, $k_\mathrm{hs}\,t$, in square
metres. Watch that rather than the clock; the reason is in the solution below.

<link rel="stylesheet"
      href="{{ '/exercises/apps/artesian-embed.css' | relative_url }}?v=f6188e3a">
<iframe src="{{ '/exercises/apps/scarp_panel.html' | relative_url }}" data-artesian data-design-width="900" scrolling="no"
        height="835" loading="lazy" title="A fault scarp diffusing"></iframe>

**The first load takes 10–30 seconds** while your browser downloads the Python
runtime – about 70 MB. It runs smoothly after that, and the download is cached.
Nothing is sent to a server: the model runs on your own machine, in the tab.

## What to do — the scarp

**1. Watch it go.** Press **▶** at the default settings. Note the morphologic
age at which the steepest slope has halved to 15°, and again at which it
reaches 5°. Does the second take as long as the first?

**2. Change the rate, not the shape.** Press **Re-cut the scarp**, set
$k_u = 0.010$, and run until $k_\mathrm{hs}\,t$ reaches **100 m²**; note the
clock time and sketch the profile. Re-cut, set $k_u = 0.040$, and run to the
same **100 m²**. The two profiles are identical; the clock times differ by a
factor of four. Explain why.

**3. The catch.** You are in the field with a total station and a scarp. You
survey it, fit the model, and recover $k_\mathrm{hs}\,t = 100$ m². Your
colleague asks how old the fault is. Write down what you would need to answer,
and where you would get it — then notice that the quantity you are missing is
$k_u \Delta z_u$, which is what Part 2 is about. Morphologic dating is only as
good as the diffusivity someone measured somewhere else.

**4. Same age, different ground.** Set $k_u = 0.040$ with
$\Delta z_u = 0.05$ m, then $k_u = 0.010$ with $\Delta z_u = 0.20$ m. Both give
$k_\mathrm{hs} = 0.002$ m²/yr, so both scarps degrade identically. Look at the
lower panel in each. What is different about the ground, and would surveying
the scarp ever tell you?

---

# Part 2 — A hillslope between two rivers

Now put edges on it. A hillslope is not left alone: rivers at both ends are
cutting down, and they never stop taking material away.

**Reading it.** The upper panel is the hillslope at true vertical scale. The
dashed line is the steady form it is chasing — the parabola that balances
erosion against transport,
$z = -\tfrac{1}{2}(\dot\varepsilon/k_\mathrm{hs})x^2 + z_0$. The sand-coloured
band is the valley floor.

**The blue arrows are the rivers, and they are the reason for everything else.**
The vertical axis is elevation *above the rivers*, so the rivers sit at zero
however fast they are cutting — the one thing on the figure that is always
moving is the one thing that looks still. The arrows point down while the
rivers incise and up while they aggrade, and their length follows the rate.

The lower panel is again the creep underneath, on its own depth axis. Blue is
material moving left, red is moving right, and white is the divide, where
nothing moves sideways at all.

That lower panel has to have its own axis. At the default settings the hill
stands 6.25 m above the rivers while the creep dies away over 0.10 m — a ratio
of over 60 to 1. Drawn to the same vertical scale as the topography, all of the
motion would be a smear well under one pixel tall. The depth axis reaches
0.40 m, which is the window Hooke plotted.

Three sliders: $k_u$ and $\Delta z_u$ as before, plus $\dot\varepsilon$, the
rate at which the rivers cut down. Set it **negative** and they aggrade
instead: sediment fills the valley, buries the foot of the hillslope, and the
hillslope gets genuinely *shorter*.

And three buttons. **▶ Run** animates at about 30 000 model years per second.
**Flatten** starts again from a flat surface. **Jump to equilibrium** imposes
the steady form directly, instead of waiting out the 100 000-year relaxation.

<iframe src="{{ '/exercises/apps/hillcreep_panel.html' | relative_url }}" data-artesian data-design-width="900" scrolling="no"
        height="903" loading="lazy" title="Hillslope creep and diffusion model"></iframe>
<script src="{{ '/exercises/apps/artesian-embed.js' | relative_url }}?v=5558fdc9"></script>

## What to do — the hillslope

**1. Build a diffusivity.** Press **▶ Run** at the default settings and let the
hill grow until it stops changing — about ten seconds. Note $k_\mathrm{hs}$,
the height of the crest, and the surface creep velocity above the lower panel.
Now double $\Delta z_u$ to 0.20 m. What happened to $k_\mathrm{hs}$? To the
hill? Write down *why* the hill got flatter, in terms of how much soil is now
in motion.

**2. Two hills that are the same, and are not.** Press **Flatten**, set
$k_u = 0.010$ and $\Delta z_u = 0.20$, and press **Jump to equilibrium**.
Record the crest height and the surface velocity. Now set $k_u = 0.040$ and
$\Delta z_u = 0.05$ and jump again.

$k_\mathrm{hs}$ is 0.0020 m² yr⁻¹ in both cases, and both hillslopes stand at
exactly 6.25 m. **The surface is moving four times faster in the second one** —
2.5 mm yr⁻¹ against 10 mm yr⁻¹. Look at the lower panel in each and describe
the difference. Then answer: if you surveyed only the topography of these two
hillslopes, could you tell them apart? If you drove a rod into the soil, could
you?

**3. Predict, then test.** Go back to $\Delta z_u = 0.10$ m and try
$k_u = 0.010$, then $k_u = 0.050$, jumping to equilibrium each time. Before
each, predict what will happen to the steady surface creep velocity.

Most people predict that five times the creep coefficient gives five times the
surface speed. It does not. At steady state every grain eroded above a point
must pass that point, so the flux is fixed by the erosion rate and the length
of the hillslope, not by $k_u$:

$$u_s = \frac{\dot\varepsilon\, x'}{\Delta z_u}$$

with $x'$ the distance from the divide. There is no $k_u$ in it. What $k_u$
sets is **how steep the hill has to get** to carry that flux: 12.50 m of relief
at $k_u = 0.010$ against 2.50 m at $k_u = 0.050$, with the surface creeping at
exactly 5 mm yr⁻¹ in both. Verify this, then explain it.

**4. Bury it.** Return to the defaults and press **Jump to equilibrium**. Drag
$\dot\varepsilon$ to its most negative value — watch the arrows turn over — and
press **▶ Run**. The rivers stop cutting down and start filling their valleys.

Watch the read-out, which reports how many metres of hillslope the sediment has
buried, and the lower panel, where creep stops wherever the alluvium has
covered the ground: while a river is *aggrading* it is actively regrading its
floodplain, holding it flat, so nothing there creeps.

Now set $\dot\varepsilon$ to exactly **zero**. The rivers stop, and with them
the regrading: the floodplain is abandoned, and the step where it abuts the
hillslope relaxes into a smooth S-shape running from the river to the divide.
That is a scarp degrading — the same thing you watched in Part 1, and the same
diffusion that shapes the hill.

Then drag $\dot\varepsilon$ positive again. The sediment does not disappear:
the rivers cut down through their own fill and leave it standing on either side
as a **fill terrace**, which then degrades in its turn.

**5. Check a parameter choice.** Hillslope models are often run by choosing
$k_\mathrm{hs}$ directly. Suppose someone picks $k_\mathrm{hs} = 0.5$ m² yr⁻¹
for a 1 km hillslope whose rivers incise at 0.2 mm yr⁻¹ — values that give a
50 m hill and relax over a few hundred thousand years, so they look entirely
reasonable. Use $u_s = \dot\varepsilon\, x' / \Delta z_u$ to work out what
surface creep velocity those numbers require at the toe, taking Hooke's
$\Delta z_u = 0.10$ m, and compare it with his measured 1.1–8.4 mm yr⁻¹.
What does the comparison tell you — about the hillslope, or about the
parameters? This is what factoring $k_\mathrm{hs}$ buys: a choice that was
arbitrary becomes checkable.

---

## Under the hood

Both models are [hillcreep](https://github.com/MNiMORPH/hillcreep), and they
share a transport law: the only thing that differs is what happens at the
edges. Conservation of mass on a column of mobile material gives

$$\frac{\partial z}{\partial t} =
  \frac{\partial}{\partial x}\left(k_\mathrm{hs} \frac{\partial z}{\partial x}\right)$$

which is the diffusion equation. What is different here is that
$k_\mathrm{hs}$ is never supplied: it is assembled from $k_u$ and
$\Delta z_u$ every time you move a slider, and the velocity profile it
summarises is drawn underneath.

The transport law is not invented here either. Integrating an exponential creep
profile over a mobile layer of finite thickness $h_m$ gives

$$q_m = -k_u \Delta z_u \left(1 - e^{-h_m/\Delta z_u}\right)
        \frac{\partial z}{\partial x}$$

which is the law of Johnstone and Hilley (2015). **These models run the
no-bedrock limit** of it: the mobile layer is treated as deep compared with
$\Delta z_u$, the exponential term vanishes, and $k_\mathrm{hs} = k_u \Delta
z_u$ exactly.

### The scarp has a closed form

Differentiate the diffusion equation and the *slope* of a straight-faced scarp
is a diffusing rectangular pulse — a difference of error functions. Integrating
that back, with $a$ half the scarp height and $w = a/\tan\theta$ half the width
of the face,

$$\beta = 2\sqrt{k_\mathrm{hs}\,t}$$

$$z(x,t) = -\frac{a}{2w}\left[(x{+}w)\,\mathrm{erf}\frac{x{+}w}{\beta}
 - (x{-}w)\,\mathrm{erf}\frac{x{-}w}{\beta}
 + \frac{\beta}{\sqrt{\pi}}\left(e^{-((x+w)/\beta)^2}
 - e^{-((x-w)/\beta)^2}\right)\right]$$

Checked against the numerical solution: they agree to 1.2 × 10⁻⁶ m, and the
mean elevation does not move at all, because nothing leaves.

**Look at where $k_\mathrm{hs}$ and $t$ appear.** Only inside $\beta$, and only
as the product $k_\mathrm{hs}\,t$. A scarp has no way of separating them. A
fast scarp seen early and a slow one seen late are not merely similar — they
are the same profile, to the last decimal. That single fact is what morphologic
dating rests on and what limits it. At long times the slope at a scarp's
midpoint falls as $a/\sqrt{\pi k_\mathrm{hs} t}$, which is the classic result
that lets one mid-point measurement stand in for a whole profile
(Nash, 1980).

### The hillslope's edges

Aggradation is handled as a level set, and deposition is permanent. The
alluvial surface is one flat elevation; ground lying below it is raised to it
and held there, so the fill stays flat and the exposed hillslope gets shorter.
The hold lasts only as long as the river is **aggrading**, because that is what
holding a floodplain flat consists of — actively regrading it. A river that has
stopped, or that is cutting down, has abandoned that surface, and it becomes
ordinary topography that diffuses like everything else.

Mass is deliberately not conserved within the hillslope. It should not be — the
river delivers material from outside it. In the scarp, by contrast, both ends
are closed and the volume is constant to machine precision.

## Where the numbers come from

| | symbol | value | where it came from |
|---|---|---|---|
| Creep e-folding depth | $\Delta z_u$ | 0.10 m | **measured.** Hooke's profiles: motion in the top 5–15 cm of a 42 cm soil |
| Surface creep velocity at unit slope | $k_u$ | 0.02 m yr⁻¹ | **measured, via $k_u = u_s/S$.** Hooke's 5 mm yr⁻¹ at the 14° toe slope below |
| Diffusivity | $k_\mathrm{hs}$ | 0.002 m² yr⁻¹ | **computed**, $= k_u \Delta z_u$. Within the range fitted to real hillslopes |
| *Scarp:* height | | 5 m | **chosen.** Readable against a 240 m domain and resolved by a 1 m grid |
| *Scarp:* initial face angle | $\theta$ | 30° | **chosen**, and deliberately outside what creep produces |
| *Hillslope:* width | $L$ | 100 m | **chosen.** Divide to channel, soil-mantled, humid terrain |
| *Hillslope:* river incision rate | $\dot\varepsilon$ | 0.01 mm yr⁻¹ | **forced,** not chosen: $u_s = \dot\varepsilon L/2\Delta z_u$ with Hooke's two numbers leaves no freedom |
| *Hillslope:* steady crest | | 6.25 m | **computed**, $\dot\varepsilon L^2 / 8k_\mathrm{hs}$ |
| *Hillslope:* steady toe slope | | 0.25 (14.0°) | **computed.** Below where a linear creep law breaks down |
| *Hillslope:* steady $u_s$ at the toe | | 5.00 mm yr⁻¹ | **computed**, $\dot\varepsilon L / 2\Delta z_u$ |

At the default incision rate the sliders span surface creep of **1.25 to
10 mm yr⁻¹**, which brackets Hooke's measured 1.1–8.4 almost exactly. That is
not a coincidence — it is where the defaults came from.

**No number these models produce is a rate for any particular hillslope or
scarp.** But the parameters are no longer free: two of the three are read off a
figure, and the third follows from them.

## What these models do not do

- **Transport is linear in slope, and for a scarp this is known to be wrong.**
  Andrews and Bucknam (1987) fitted degraded shoreline scarps on Lakes
  Bonneville and Lahontan and found transport must rise *faster* than linearly
  with slope, adopting $k_0(1+5s^2)$. A 30° face is exactly where that matters,
  and real scarp-dating practice does not use a purely linear law. On the
  hillslope the same limit shows up differently: push $\dot\varepsilon = 0.010$
  mm yr⁻¹ with $k_u = 0.010$ and $\Delta z_u = 0.05$ m and the steady slope
  reaches 45°, where
  hillslopes fail in landslides rather than creep. Nothing warns you, because
  the honest answer is a mass-wasting model, not a warning label.
- **There is no bedrock and no soil thickness.** The bottom of each lower panel
  is a viewing depth, not the base of the soil. So neither model can show what
  happens when $\Delta z_u$ grows past the soil thickness — at which point
  deepening the mobile zone stops raising $k_\mathrm{hs}$, because there is no
  more soil to move.
- **There is no weathering**, so soil is never produced and never runs out.
- **Only the downslope component of velocity is drawn.** Real soil also moves
  up and down as it is disturbed and as the surface lowers.
- **The scarp is cut once**, on ground with no background slope. A fault that
  moves repeatedly leaves a compound scarp, and one morphologic age fitted to
  it averages several events rather than dating any of them.
- **Both rivers share one rate**, so the hillslope's divide stays in the
  middle. Incise one side faster and it would migrate towards it.

## References

- Andrews, D.J. & Bucknam, R.C. (1987). Fitting degradation of shoreline scarps
  by a nonlinear diffusion model. *Journal of Geophysical Research: Solid Earth*
  **92**, 12857–12867.
  [doi:10.1029/JB092iB12p12857](https://doi.org/10.1029/JB092iB12p12857)
  – and the reason a linear law is not what scarp dating actually uses.
- Deshpande, N.S., Furbish, D.J., Arratia, P.E. & Jerolmack, D.J. (2021). The
  perpetual fragility of creeping hillslopes. *Nature Communications* **12**,
  3909. [doi:10.1038/s41467-021-23979-z](https://doi.org/10.1038/s41467-021-23979-z)
  – the measured exponential decay of creep velocity with depth.
- Heimsath, A.M., Furbish, D.J. & Dietrich, W.E. (2005). The illusion of
  diffusion: field evidence for depth-dependent sediment transport. *Geology*
  **33**, 949–952. [doi:10.1130/G21868.1](https://doi.org/10.1130/G21868.1)
- Johnstone, S.A. & Hilley, G.E. (2015). Lithologic control on the form of
  soil-mantled hillslopes. *Geology* **43**, 83–86.
  [doi:10.1130/G36052.1](https://doi.org/10.1130/G36052.1) – the
  depth-dependent transport law these models run.
- Nash, D.B. (1980). Morphologic dating of degraded normal fault scarps.
  *The Journal of Geology* **88**, 353–360.
  [doi:10.1086/628513](https://doi.org/10.1086/628513)
- Roering, J.J. (2004). Soil creep and convex-upward velocity profiles:
  theoretical and experimental investigation of disturbance-driven sediment
  transport on hillslopes. *Earth Surface Processes and Landforms* **29**,
  1597–1612. [doi:10.1002/esp.1112](https://doi.org/10.1002/esp.1112)

The models are compiled to WebAssembly with
[artesian](https://github.com/MNiMORPH/artesian) and run via
[Pyodide](https://pyodide.org).
