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

{% include figure image_path="/assets/images/weathering/corestones-lost-creek-colorado.jpg"
   alt="Rounded granite boulders stacked on vertically jointed granite, Lost Creek Wilderness, Colorado"
   caption="Granite in the Lost Creek Wilderness, Colorado. The straight vertical partings are joints; every block between them has had its corners taken off. Photo: [Adam Baker](https://commons.wikimedia.org/wiki/File:Boulders,_Lost_Creek_Wilderness.jpg), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)." %}

What differs is the *water*. Rain enters at the surface and runs down the
**joints** – the fracture network that tectonics put in the rock long before
any weathering began. Along the way it dissolves the granite it touches, and as
it does so it approaches saturation. Water that has taken all the solute it can
hold stops weathering rock, however soluble that rock is. So weathering is a
race between how fast the joints deliver fresh water and how fast the rock
dissolves into it, and a corestone is simply the place the water never reached,
or reached already saturated.

{% include figure image_path="/assets/images/weathering/corestones-vedauwoo-wyoming.jpg"
   alt="A pile of rounded granite blocks, Turtle Rock at Vedauwoo, Wyoming"
   caption="Turtle Rock at Vedauwoo, Wyoming: Sherman Granite, weathered along its joints until what is left is a pile of rounded blocks. Photo: Carol M. Highsmith, [Library of Congress](https://lccn.loc.gov/2015632858), public domain." %}

Press **▶ Run** and watch. The left panel is **where the water goes** – its
speed in metres per year, on a logarithmic scale because it spans four orders
of magnitude. The right panel is **what the water has taken**. Cause on the
left, effect on the right.

Watch the left panel change. At the default settings the joints start out
carrying about 6 m/yr while the rock between them creeps along at 0.0003 m/yr
– twenty thousand times slower. As that rock dissolves it opens, and the water
spreads into it, which is why the weathering runs away downward from the
surface rather than staying in the joints.

- **Joint orientation** and **joint spacing** set the fracture network – the
  input from tectonics, fixed before weathering starts.
- **Infiltration rate** sets how fast rain is delivered.
- **Temperature** does two things at once, and they are worth separating. See
  below.
- **Cell size** is the numerical grid, not the rock: 5 cm, 2.5 cm or 2 cm
  across the same 3 m section. Finer resolves the weathering rind more
  sharply and costs about eighteen times the computing at 2 cm, so use
  **Show** rather than watching it animate: at 2.5 cm and 2 cm a single
  frame costs more than the animation has to give it, and **▶** slows down
  instead of keeping time. Note that fewer joint
  orientations and spacings are available at 2 cm – only patterns that fit a
  whole number of cells can tile the section exactly, and which ones those
  are depends on the grid.

**▶** animates from fresh rock and keeps going until you pause it – there is
no end. It advances the clock at the same rate whatever the sliders say –
1000 model years per frame, about 30 000 years per second – so a setting that
takes eight times as long in the model takes eight times as long to watch.
Cold rock is not slow to watch by accident; it is slow because it is slow. (At
2.5 cm and 2 cm the arithmetic cannot keep up, and that is the one case where
the guarantee lapses.) That matters at the slow settings: at 0.05 m/yr and 0 °C the section
is only a fourteenth dissolved after 2000 kyr, and a sixth after 5000, so
give it longer. **View results at** with **Show** asks a
different question – what does the rock look like at 2000 kyr? – and answers
it directly, without the animation. It reaches 15 000 kyr – long enough for the
default settings to dissolve completely, and for a cold section too; anything
slower than that is **▶**'s job.

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

{% include figure image_path="/assets/images/weathering/corestone-formation-usgs.jpg"
   alt="Diagram: jointed solid rock weathering to rounded corestones in weathered rock, with an inset showing one, two and three weathering surfaces"
   caption="The same argument, drawn: water enters along the joints, and a block loses its corners first because more of its surface is exposed there. From Huber, N.K., 1987, *The geologic story of Yosemite National Park*, [U.S. Geological Survey Bulletin 1595](https://doi.org/10.3133/b1595); public domain." %}

{% include figure image_path="/assets/images/weathering/corestones-quarry-minnesota.jpg"
   alt="Large rounded granite boulders on a gravel quarry floor, with two people sitting on them for scale"
   caption="And in Minnesota: corestones in a sand-and-gravel pit in the southwest of the state. These weathered in place; the machines moved them only because they were in the way of the Glacial River Warren sand and gravel being mined around them. So the rounding is the rock's and the arrangement is the excavator's – and the material they sit in is outwash, not the grus they formed in. Kerry Callaghan (University of Illinois Chicago) and Fiona Clubb (Durham University) give the scale. Photo: Andy Wickert, 2017, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)." %}

## What to do

*(To be written.)*

<!--
  data-design-width is the width the app lays itself out for, and it is
  ALSO recorded inside the compiled page. Two places on purpose: the
  script cannot read the compiled page while this page lays itself out,
  because an iframe starts on a blank document, and on WebKit -- every
  browser on an iPad -- that is what it sees. Without the attribute the
  demo is never scaled: it sits at its own width inside a wider frame.

  height="590" is the demo's measured height at its design width, not a
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
  these demos pull about 70 MB of Pyodide before that happens. Without
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
        height="590" title="Fracture-controlled granite weathering model"></iframe>
<script src="{{ '/exercises/apps/artesian-embed.js' | relative_url }}?v=5558fdc9"></script>

**The first load takes 10–30 seconds** while your browser downloads the Python
runtime – about 70 MB. It runs smoothly after that, and the download is cached,
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

That difference has a name and a use. $(E_a - \Delta H_r)$ = 36.9 kJ mol⁻¹
here is the **apparent activation energy of weathering** – it is what a field
study measuring weathering against temperature actually recovers, and it is
*not* $E_a$. The length scale is only about half as temperature-sensitive as
the rate constant alone would suggest. And the sign is not guaranteed: if the
ceiling rose with temperature faster than the rate did, warming would
*lengthen* the saturation length and slow the weathering down.

### Which limit are you in?

One dimensionless number decides what the pictures mean. Divide the depth of
the section by the saturation length, and you have counted how many e-foldings
of saturation a parcel of water undergoes on its way down – the **Damköhler
number**. Here it is **6.6** at the reference temperature.

- **Da ≫ 1 – saturation-limited.** The water fills up long before it runs out
  of rock. What limits weathering is how much each litre can carry away, so
  dissolution happens where fresh water arrives and nowhere else. **This is
  the regime that makes corestones**: at Da = 6.6 the water leaving the base
  is within a seventh of a percent of saturation, which is precisely what
  shelters a block interior.
- **Da ≪ 1 – reaction-limited.** Water crosses the whole section barely
  touched, the rate constant sets the pace everywhere at once, and the section
  dissolves uniformly. **No corestones** – nothing can shelter a block
  interior from water that is undersaturated everywhere.

Corestones are a saturation-limited phenomenon, and the number tells you so
before you look at a single picture. (Chemists call this limit
*transport-limited*, for the transport of solute. That name is avoided here
because in geomorphology it means something else entirely – an erosion rate set
by the capacity to move sediment – and nothing in this model moves sediment.)

Note what the Damköhler number is made of: a depth divided by a length. It is
a property of *how much rock you are looking at*, not of the rock. The same
granite, the same water and the same temperature, viewed one metre at a time
instead of three, gives Da = 2.2 and a weaker limit.

The solute the reaction produces is carried by steady groundwater flow and
spread by diffusion,

$$\nabla\cdot(q c) - \nabla\cdot(D \nabla c) = r\,(1 - c)$$

Water is routed by a Darcy solve on a conductance field where the joints
conduct and the intact granite barely does, so flow along a joint is not a
special case – it is what the head field does when a low-resistance path
exists. The diffusive term is what lets a block weather *inward*: without it a
block interior saturates and stays untouched for ever, and the model would give
dissolved joints beside pristine blocks with no rind in between.

{% include figure image_path="/assets/images/weathering/weathering-rinds-galicia.jpg"
   alt="Concentric weathering rinds in granite seen from above, with a coin for scale"
   caption="The rind, in the field: concentric shells of weathered granite around a core the water has not finished with, Estaca de Bares, Galicia. The coin gives the scale. Photo: [PePeEfe](https://commons.wikimedia.org/wiki/File:Concentric_spheroidal_weathering_in_granite.JPG), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)." %}

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

**Nothing in the chemistry or the flow is fitted any more**, which means the
weathering *timescale* is no longer something this model was told – it is
something it predicts. That is a claim you can check, and it is checked below.

Measured: the two ends of the matrix conductivity, $k_\mathrm{matrix}$ and
$k_\mathrm{weathered}$. Goodfellow et al. (2016) measured the hydraulic
conductivity of granodiorite *matrix* across a range of weathering grades and
found it rises three to four orders of magnitude, from 9 × 10⁻⁹ – 8 × 10⁻⁸
cm s⁻¹ in the parent rock to 9 × 10⁻⁵ – 9 × 10⁻⁴ cm s⁻¹ in the most weathered
samples, driven by the cracking that follows oxidative dissolution of biotite.
The model uses the mid-points of those ranges: 5 × 10⁻¹⁰ and 5 × 10⁻⁶ m s⁻¹.
Those are *matrix* conductivities, deliberately. Goodfellow et al. note that
their values sit one to three orders of magnitude below field measurements on
weathering granitoids, and attribute the difference to their having measured
the matrix directly. A field value already contains the fractures; here the
fractures are not a correction to be folded in, they are the joints, and the
model draws them separately.

For comparison, Dewandel et al. (2006) give saprolite over granite as about
10⁻⁶ m s⁻¹, and Raj (2021) measured 7 × 10⁻⁷ – 1 × 10⁻⁵ m s⁻¹ through a
weathering profile on biotite granite in Malaysia. At the other end,
Rukavičková et al. (2021) tested eight granitoids in the Bohemian Massif and
found the *matrix* most often at 10⁻¹¹ – 10⁻¹² m s⁻¹ while the *fractured*
rock around it ran 10⁻⁸ – 10⁻⁷ – the same split between matrix and fracture
that this model is built on, measured in the field.

The other two are the temperature terms. The dissolving phase here is
**plagioclase** – not because it is the most abundant mineral in a granite,
which it often is not, but because it sets the pace: at 25 °C and near-neutral
pH it dissolves 3.7 times faster than K-feldspar, and given equal surface
areas it still carries about four fifths of the dissolution. What makes grus is
the phase that goes, not the phase that survives. So the activation energy is
oligoclase's, $E_a$ = 69.8 kJ mol⁻¹ (Palandri & Kharaka 2004, neutral
mechanism; K-feldspar would be 38.0).

The reaction enthalpy $\Delta H_r$ is not a property of the dissolving mineral
at all – it is a statement about *what saturates*. Here the ceiling on the
solute is dissolved silica, so $\Delta H_r$ = 32.9 kJ mol⁻¹ is quartz's, and
quartz does not dissolve in this model for a reason rather than by decree: the
water is already at its saturation, so its driving force $(1 - C/C_{eq})$ is
zero. Read the ceiling differently – as the solution being buffered by
kaolinite, the clay that weathering actually makes – and $\Delta H_r$ turns
*negative* for calcium-rich plagioclase, and warming the rock would slow its
weathering down. That is a real regime. It is not this one, and which of the
two you are in is decided by what stops the reaction, not by the mineral.

Still not measured, and simply chosen so the demo behaves on a human
timescale: the reference dissolution length, the matrix tortuosity and the
dispersivity. **No number this model produces
is a rate for any real granite.**

### Every parameter, and where it came from

| | symbol | value | where it came from |
|---|---|---|---|
| Reference temperature | $T_\mathrm{ref}$ | 285 K (11.85 °C) | **normalisation.** Both temperature factors are exactly 1 here, which is why the slider opens at 12 °C |
| Activation energy | $E_a$ | 69.8 kJ mol⁻¹ | **measured.** Oligoclase, neutral mechanism, Palandri & Kharaka (2004) Table 13 |
| Reaction enthalpy | $\Delta H_r$ | 32.9 kJ mol⁻¹ | **measured.** Quartz dissolution at 25 °C, LLNL thermodynamic database |
| Intact matrix conductivity | $k_\mathrm{matrix}$ | 5 × 10⁻¹⁰ m s⁻¹ | **measured.** Mid-point of Goodfellow et al. (2016) parent granodiorite |
| Weathered conductivity | $k_\mathrm{weathered}$ | 5 × 10⁻⁶ m s⁻¹ | **measured.** Mid-point of their most weathered samples |
| Joint aperture | $a$ | 100 µm | **measured.** Hydraulic aperture, not the visible opening. Rukavičková et al. (2021) give 20–67 µm at borehole depth; laboratory fractures reach 250 µm unstressed. The conductivity follows by the cubic law (Witherspoon et al. 1980) |
| Saturation length | $L_\mathrm{ref}$ | 0.457 m | **derived.** $qC_{eq}/kA$, with $A$ = 900 m² m⁻³ for 2 mm grains at 30 % plagioclase |
| Water per rock volume | $\tau_\mathrm{ref}$ | 47 744 | **derived.** $M_0/C_{eq}$: 4774 mol Si m⁻³ of rock, over quartz saturation |
| Aqueous diffusivity | $D$ | 1.0 × 10⁻⁹ m² s⁻¹ at 25 °C | **measured**, and of the right species: dissolved silica (Rebreanu et al. 2008; Wollast & Garrels 1971). Scaled by Stokes–Einstein |
| Matrix tortuosity | | 10⁴ → 10 | **the cost of the detour.** A molecule diffusing through rock cannot go straight; it must follow the pore network around every grain. Tortuosity is how much that slows it, so the diffusivity in rock is the free-water value divided by it. Fresh granite has almost no connected porosity: 10⁴. Weathered rock is full of holes: 10. It follows $M$, like the conductivity |
| Dispersivity | $\alpha$ | 2 mm | **one grain.** Water threading the rock takes many paths, of different lengths and speeds, and a solute front smears out because of it. The dispersivity is how far those paths wander from one another – at the pore scale, one grain across |

**$k_0$ and $C_0$ are not in the table because the model never evaluates
them.** Both equations above are written in the textbook form, with an absolute
pre-exponential factor, but nothing here needs one: every rate is taken
relative to the reference state, so what enters the arithmetic is
$k(T)/k(T_\mathrm{ref})$ and $C_{eq}(T)/C_{eq}(T_\mathrm{ref})$, in which
$k_0$ and $C_0$ cancel. That is why $L_\mathrm{ref}$ can be a free choice
without the thermodynamics being wrong – the model has a *normalisation*
where a research model would need an absolute solubility. It is also why
$C_{eq}$ never appears on its own anywhere in the code.

### Does it get the timescale right?

Because nothing in the chemistry or the flow is fitted, how long weathering
takes is a *result*, and a result can be checked. At the default settings –
1 m joints, 0.30 m yr⁻¹, 12 °C – this model dissolves 90 % of a 3 m section in
**3788 kyr**, which is a weathering front advancing at about **0.79 m Myr⁻¹**.

Measured granite regoliths, from cosmogenic and solute budgets:

| site | front | climate |
|---|---|---|
| Panola, Georgia | 7 m Myr⁻¹ | temperate |
| Davis Run, Virginia | 4 m Myr⁻¹ | temperate |
| Rio Icacos, Puerto Rico | 43–45 m Myr⁻¹ | tropical |

The model runs at 12 °C, so the temperate pair is the comparison, and it is
**five to nine times slower than they are** – with nothing tuned. The tropical
site being an order of magnitude faster is the direction the temperature
slider moves too.

The gap is not spread evenly over the inputs; it sits in the **reactive
surface area**. This model uses the geometric area of 2 mm grains, 900 m² m⁻³,
where BET for granite is 3 × 10⁵–3 × 10⁶. Closing the rate would need a factor
of five, still five hundred times below BET – so the disagreement lives inside
a range the field itself has not resolved (White & Brantley 2003). It is
reported rather than removed. Choosing a surface area to make the rate come
out right is the one move that would make this number meaningless.

Two earlier versions of this exercise got closer and were worse. One was
calibrated, ran at 17.9 m Myr⁻¹, three times too fast, and nothing checked
it. The next derived its chemistry and reached 2.5 m Myr⁻¹, which looks like
agreement within a factor of two; but a third of the section was part-dissolved
at once, so it was not advancing a *front*, and dividing 3 m by the time was
not measuring one. Only now, with the part-dissolved zone down to a few per
cent, is this a front rate at all. A worse match, and a better measurement.

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
- Palandri, J.L. & Kharaka, Y.K. (2004). A compilation of rate parameters of
  water–mineral interaction kinetics for application to geochemical modeling.
  *U.S. Geological Survey Open-File Report* **2004-1068**, 64 pp.
  [pubs.usgs.gov/of/2004/1068](https://pubs.usgs.gov/of/2004/1068/)
- Huber, N.K. (1987). *The geologic story of Yosemite National Park.*
  U.S. Geological Survey Bulletin **1595**, 64 pp.
  [doi:10.3133/b1595](https://doi.org/10.3133/b1595) – the corestone diagram.
- Raj, J.K. (2021). Saturated hydraulic conductivity (Ks) of earth materials in
  the weathering profile over a porphyritic biotite granite at the Kuala
  Lumpur – Karak Highway in Peninsular Malaysia. *Bulletin of the Geological
  Society of Malaysia* **71**, 1–11.
  [doi:10.7186/bgsm71202101](https://doi.org/10.7186/bgsm71202101)
- Rebreanu, L., Vanderborght, J.-P. & Chou, L. (2008). The diffusion
  coefficient of dissolved silica revisited. *Marine Chemistry* **112**,
  230–233.
  [doi:10.1016/j.marchem.2008.08.004](https://doi.org/10.1016/j.marchem.2008.08.004)
  – the aqueous diffusivity, confirming Wollast & Garrels (1971).
- Rukavičková, L., Holeček, J., Holečková, P., Najser, J., Gvoždík, L. &
  Pačes, T. (2021). Comparison of hydraulic conductivity of rock matrix and
  fractured blocks of granitic rocks. *International Journal of Rock Mechanics
  and Mining Sciences* **144**, 104743.
  [doi:10.1016/j.ijrmms.2021.104743](https://doi.org/10.1016/j.ijrmms.2021.104743)

- White, A.F. & Brantley, S.L. (2003). The effect of time on the weathering of
  silicate minerals: why do weathering rates differ in the laboratory and
  field? *Chemical Geology* **202**, 479–506.
  [doi:10.1016/j.chemgeo.2003.03.001](https://doi.org/10.1016/j.chemgeo.2003.03.001)
  – why a laboratory rate constant is paired with a geometric surface area
  here rather than a BET one.
- White, A.F., Bullen, T.D., Schulz, M.S., Blum, A.E., Huntington, T.G. &
  Peters, N.E. (2001). Differential rates of feldspar weathering in granitic
  regoliths. *Geochimica et Cosmochimica Acta* **65**, 847–869.
  [doi:10.1016/S0016-7037(00)00577-9](https://doi.org/10.1016/S0016-7037\(00\)00577-9)
  – the Panola and Davis Run weathering front rates.
- Witherspoon, P.A., Wang, J.S.Y., Iwai, K. & Gale, J.E. (1980). Validity of
  cubic law for fluid flow in a deformable rock fracture. *Water Resources
  Research* **16**, 1016–1024.
  [doi:10.1029/WR016i006p01016](https://doi.org/10.1029/WR016i006p01016)
  – the joint conductivity. The "cubic law" is the Navier–Stokes solution for
  laminar flow between parallel plates, integrated across the gap.
- Wollast, R. & Garrels, R.M. (1971). Diffusion coefficient of silica in
  seawater. *Nature Physical Science* **229**, 94.
  [doi:10.1038/physci229094a0](https://doi.org/10.1038/physci229094a0)
- The enthalpies for $\Delta H_r$ and the silica saturation concentrations are
  from the LLNL thermodynamic database as distributed with
  [PHREEQC](https://www.usgs.gov/software/phreeqc-version-3) (`llnl.dat`).

The model is compiled to WebAssembly with
[artesian](https://github.com/MNiMORPH/artesian) and runs via
[Pyodide](https://pyodide.org).
