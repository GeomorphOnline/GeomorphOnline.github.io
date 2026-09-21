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
is only a fourteenth dissolved after 2000 kyr, and about a sixth after 5000, so
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

Two assignments run on the same model, and the **Reaction** control at the top
of the demo switches between them.

### In class: feldspar dissolution

*(To be written.)*

### Problem set: biotite oxidation

Set **Reaction** to *Biotite oxidation* and read
[the section at the end of this page](#what-actually-goes-first-iron-in-biotite)
first. The transport is identical; the chemistry is not, and several of the
answers you found in class come out the other way round.

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
  these demos pull about 40 MB of Pyodide before that happens. Without
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
runtime – about 40 MB. It runs smoothly after that, and the download is cached,
so returning to the page is fast. Nothing is sent to a server: the model runs on
your own machine, inside the browser tab.

## Under the hood

Weathering is a race between **how fast water arrives** and **how fast rock
reacts with it**. This section builds that race in four steps — water, solute,
rock, reaction — one equation each. Every equation is a statement about a box
you could draw on an outcrop.

### Notation

Weathering sits where hydrogeology and geochemistry meet, and the two fields
collide on one letter. **$K_\mathrm{sat}$ is hydraulic conductivity; $k$ is a
reaction rate constant.** They are unrelated.

| symbol | meaning | units |
|---|---|---|
| $q$ | specific discharge (Darcy flux) | m s⁻¹ |
| $K_\mathrm{sat}$ | saturated hydraulic conductivity | m s⁻¹ |
| $h$ | hydraulic head | m |
| $n$ | porosity, 0 to 1 | – |
| $C$ | concentration of the reacting solute | mol m⁻³ |
| $C_{eq}$ | the ceiling on $C$ | mol m⁻³ |
| $c = C/C_{eq}$ | normalised concentration | – |
| $k$ | reaction rate constant, per unit mineral surface | mol m⁻² s⁻¹ |
| $A$ | reactive mineral surface area per rock volume | m² m⁻³ |
| $\dot{N}$ | reaction rate per rock volume — moles released (or consumed) | mol m⁻³ s⁻¹ |
| $r = kA/C_{eq}$ | reaction coefficient: how fast undersaturation is used up | s⁻¹ |
| $D$ | dispersion coefficient | m² s⁻¹ |
| $N_0$ | moles of reactive mineral per m³ of fresh rock | mol m⁻³ |
| $M$ | fraction of reactive mineral remaining | – |
| $X = 1-M$ | extent of reaction — what the colour bar shows | – |
| $\tau$ | volumes of water needed per volume of rock | – |
| $L$ | saturation length | m |
| $E_a$, $\Delta H_r$ | activation energy, enthalpy of reaction | J mol⁻¹ |
| $T$ | absolute temperature | K |
| $t$ | time | s |
| $R$ | universal gas constant, 8.314 | J mol⁻¹ K⁻¹ |

### 1. Water: Darcy's law

Water moves through rock the way it moves through a sponge: along connected
pores and cracks, from where its energy is high to where it is low. That energy
is the **hydraulic head** $h$ — in the field, the height water stands in a well.
Water flows from high head to low head.

Henry Darcy established in 1856, pumping water through sand columns, that the
flow rate is **proportional to the head gradient**:

$$q = -K_\mathrm{sat}\,\frac{\partial h}{\partial z}$$

- $q$ — **specific discharge** (m s⁻¹): volume of water per unit area of rock
  per unit time. Not the speed of a water molecule — the pores are only part of
  the rock, so molecules move faster than $q$ by roughly $1/n$.
- $K_\mathrm{sat}$ — **saturated hydraulic conductivity** (m s⁻¹): how easily
  this material transmits water *when its pores are full*. It is the
  widest-ranging property in this exercise — about thirteen orders of
  magnitude from gravel to unfractured crystalline rock (Freeze & Cherry,
  1979, the same textbook the porosity table in your notes comes from).
  - **The subscript is a real assumption, not decoration.** Corestones form
    above the water table, where pores are only partly full and the true
    conductivity is lower and depends on how wet the rock is. This model uses
    the saturated value everywhere, which is the wet-end limit: it routes
    water down the joints correctly, and it will overstate how fast the
    matrix transmits water between storms.
- $\partial h/\partial z$ — the head gradient (dimensionless), the steepness of
  the energy slope.
- The **minus sign** puts flow *down* the gradient, from high head to low.

Two statements, and you have a flow model. Darcy's law says where water goes;
conservation says it cannot pile up:

$$\nabla\cdot(K_\mathrm{sat}\,\nabla h) = 0$$

- $\nabla\cdot$ — the divergence: net flow out of a point. Setting it to zero
  says **what flows in, flows out**.

Everything interesting is in $K_\mathrm{sat}$. **A joint is not a special rule
in this model; it is a large $K_\mathrm{sat}$.** Intact granite is about $5\times10^{-10}$ m s⁻¹; a
100 µm joint smeared over a 5 cm cell is about thirty thousand times more
conductive. Solve the equation on that field and water runs down the joints —
not because anything told it to, but because that is what the head field does
when a low-resistance path exists.

### 2. Solute: the box

Draw a box of rock, $\Delta x$ wide and $\Delta z$ tall. Ask what happens to
the dissolved material inside it. Four things can:

1. water **carries solute in and out** — *advection*;
2. solute **spreads** from more to less — *dispersion*;
3. the rock **adds** solute, or **removes** it;
4. the amount inside **changes**.

As rates, in mol s⁻¹:

$$\underbrace{\big[qC\big]_{\rm in} - \big[qC\big]_{\rm out}}_{\text{advection}}
\;+\; \underbrace{\big[-D\nabla C\big]_{\rm in} - \big[-D\nabla C\big]_{\rm out}}_{\text{dispersion}}
\;+\; \underbrace{\dot{N}\,\Delta x\,\Delta z}_{\text{reaction}}
\;=\; \underbrace{\frac{\partial (nC)}{\partial t}\,\Delta x\,\Delta z}_{\text{storage}}$$

- $qC$ — solute carried by flowing water (mol m⁻² s⁻¹): water flux × what it
  carries.
- $-D\nabla C$ — **Fick's law**: spreading is proportional to the concentration
  gradient, from high to low, hence the minus sign.
- $\dot{N}$ — what the rock gives up per unit volume (mol m⁻³ s⁻¹). The dot
  is a rate, as in your notes; $N_0$ is the stock it is drawn from.
- $nC$ — solute *stored* in the pore water; only the pore fraction $n$ holds
  water.

Shrink the box, and in-minus-out becomes a divergence:

$$-\nabla\cdot(qC) + \nabla\cdot(D\nabla C) + \dot{N} = \frac{\partial (nC)}{\partial t}$$

**Now drop the storage term.** Water crosses this section in years; the rock
takes hundreds of thousands. The solute field settles long before the rock it
is dissolving has measurably changed, so at any moment we solve for the
concentration that *balances*. (This is also why porosity never appears in the
answer: storage was the only place $n$ entered.)

$$\nabla\cdot(qC) - \nabla\cdot(D\nabla C) = \dot{N}$$

**In words: what the water carries away, plus what spreads away, equals what
the rock gives up.** Every term is mol m⁻³ s⁻¹.

### 3. Rock: the same balance, from the other side

The moles the water gained are the moles the rock lost:

$$N_0\,\frac{\partial M}{\partial t} = -\dot{N}$$

- $N_0$ — moles of the reactive mineral in a cubic metre of fresh rock.
- $M$ — the fraction of it still there; $M = 1$ fresh, $M = 0$ gone.
- The **minus sign**: the rock loses what the water gains.

That is the entire model. Everything below is about **$\dot{N}$** — what sets
the reaction rate.

### 4. The reaction, one: feldspar dissolution

The in-class activity. Plagioclase dissolving into water:

$$\dot{N} = k(T)\,A\,\left(1 - \frac{C}{C_{eq}}\right)$$

- $k(T)$ — the **dissolution rate constant** (mol m⁻² s⁻¹): how fast this
  mineral reacts per unit of its own surface, in water carrying nothing. It is
  a property of the *mineral*, measured in the laboratory and tabulated — for
  plagioclase, by Palandri & Kharaka (2004). Writing it $k(T)$ only says that
  it depends on temperature.
- $A$ — how much of that surface the water can reach, per m³ of rock.
- $\left(1 - C/C_{eq}\right)$ — the **affinity**: how far the water is from
  being finished. It is 1 in fresh water and **0 at saturation**.

**That bracket is the whole idea of this exercise.** Rock does not survive
because it is tough. It survives because the water that reached it had already
finished working.

**Temperature enters this equation twice**, in two different places, and the
two do different jobs.

*First, in the rate constant.* Warming makes molecules collide harder and more
often, so more of them clear the barrier to reacting. The **Arrhenius
equation** describes that:

$$k(T) = k_0 \exp\!\left(-\frac{E_a}{R\,T}\right)$$

- $E_a$ — **activation energy** (J mol⁻¹): the energy barrier the reaction has
  to clear. The larger it is, the more temperature matters.
- $k_0$ — the **pre-exponential factor** (mol m⁻² s⁻¹): the rate the reaction
  would run at if there were no barrier at all. It sets the scale; $E_a$ sets
  the sensitivity.
- $T$ — absolute temperature (K). It sits in the *denominator* of the
  exponent, so warming makes the exponent less negative and $k$ larger.

*Second, in the ceiling.* $C_{eq}$ is the most solute the water can hold before
the reaction stops — and that depends on temperature too, because how much of a
solid dissolves at equilibrium is itself temperature-dependent. The **van 't
Hoff equation** describes *that*:

$$C_{eq}(T) = C_0 \exp\!\left(-\frac{\Delta H_r}{R\,T}\right)$$

- $\Delta H_r$ — the **enthalpy of the reaction** that sets the ceiling
  (J mol⁻¹): the heat it takes in or gives out. Positive means dissolving
  absorbs heat, so warming shifts the equilibrium toward *more* dissolved — a
  higher ceiling.
- $C_0$ — a reference scale, playing the same role $k_0$ does above.

**These are not the same effect, and confusing them is the commonest mistake
here.** Arrhenius makes the rock dissolve faster *where it stands*. Van 't Hoff
does not speed the reaction up at all — it raises the ceiling, so each litre of
water can leave carrying more before it has to stop. One is about **speed**,
the other about **capacity**.

The consequence is worth testing against your intuition with the slider:
**raising the temperature does not simply make weathering proportionally
faster.** Which of the two effects dominates depends on where the water is and
how far it has already got.

### 5. The reaction, two: biotite oxidation

The problem set. Dissolved oxygen oxidising the iron in biotite:

$$\dot{N} = k_{ox}\,A\,C$$

- $k_{ox}$ — the oxidation rate constant.
- $C$ — dissolved oxygen. **No bracket**, and that is the point.

Dissolving, the solute is a **product**: it starts at zero, the rock makes it,
and it accumulates until the water is full and the reaction stops. Oxidising,
oxygen is a **reactant**: it arrives at its ceiling in the rain, the rock
consumes it, and the reaction stops where it runs out.

So the driving force flips from $(1-c)$ to $c$, the inlet concentration flips
from 0 to 1, and **nothing in sections 1–3 changes at all**. That is the idea
to carry away:

> A reaction stops when the water can no longer do work. It gets there two
> ways: **the reactant runs out, or the product fills up.** Ask of any
> weathering system which one it is.

Oxidation carries no Arrhenius term here, and that is a finding rather than an
omission: no activation energy has ever been measured for oxidation of
structural Fe(II) by dissolved O₂. Temperature still acts — through oxygen
*solubility*, and because oxygen is a gas, warm water holds **less**.

### 6. Two length scales and one ratio

Divide through by $C_{eq}$ so concentration runs 0 to 1:

$$\nabla\cdot(q c) - \nabla\cdot(D \nabla c) = r\,(1 - c),
\qquad r \equiv \frac{k A}{C_{eq}}$$

- $c = C/C_{eq}$ — normalised concentration.
- $r$ — the reaction coefficient (s⁻¹): how fast undersaturation is used up.

**The saturation length.** How far does water travel before it is spent?

$$L = \frac{q}{r} = \frac{q\,C_{eq}}{k\,A}$$

Here $L = 0.46$ m. It is *not* a distance at which equilibrium is reached: $c$
approaches 1 asymptotically and never arrives. After $L$, the undersaturation
is $1/e$ of what it was.

Notice what $L$ is made of: it grows with flux, shrinks with reactivity, and
because it goes as $C_{eq}/k$, its temperature dependence is the **difference**
$(E_a - \Delta H_r) = 36.9$ kJ mol⁻¹ — not $E_a$ alone. That difference is the
**apparent activation energy of weathering**, and it is what a field study
measuring rate against temperature actually recovers.

**The water requirement.** How many volumes of saturated water strip one volume
of rock?

$$\tau = \frac{N_0}{C_{eq}}$$

Here $\tau \approx 48{,}000$ — the plagioclase in a cubic metre of granite needs
forty-eight thousand cubic metres of saturated water. *That* is why weathering
is slow, not the rate constant. On oxygen the same rock needs about 680.

**The ratio that decides the picture.** Divide the section depth by $L$:

$$\mathrm{Da} = \frac{\text{depth}}{L}$$

the **Damköhler number**, counting e-foldings of saturation on the way down.
Here $\mathrm{Da} = 6.6$.

- **Da ≫ 1 — saturation-limited.** Water fills up long before it runs out of
  rock. Weathering happens where fresh water arrives, and nowhere else. At
  Da = 6.6, water leaving the base is within 0.14 % of saturation.
- **Da ≪ 1 — reaction-limited.** Water crosses barely touched; the rate
  constant sets the pace everywhere at once.

Dissolving, this section is firmly in the first limit, and that is what
shelters a block interior. **Oxidising, it is in the second** — Da = 0.02,
oxygen reaching every joint at nearly full strength — and corestones still
form, because what shelters them there is how far oxygen can *diffuse* into
intact rock before it is consumed: a few centimetres. Two mechanisms, and both
come out as *the water never got there*.

Da is a depth over a length, so it is a property of **how much rock you are
looking at**, not of the rock. The same granite viewed one metre at a time
gives Da = 2.2.

### 7. The feedback: weathered rock conducts better

Weathering opens connected porosity, so $K_\mathrm{sat}$ rises as the rock
reacts — interpolated geometrically between intact granite and weathered
material:

$$K_\mathrm{sat}(M) = K_\mathrm{sat,intact}^{\,M}\, K_\mathrm{sat,weathered}^{\,1-M}$$

- Geometric, because it is linear in $\log K_\mathrm{sat}$, and conductivity
  varies over orders of magnitude rather than by small increments — so the
  straight line to draw between two values is a straight line in the
  logarithm.

The head is re-solved as the rock changes, which closes a loop: **water opens
rock, and open rock draws more water.** Watch what that does with depth —
shallow blocks destroyed while deeper ones survive and taper, because water
opens the rock it passes on the way down and arrives at depth already spent.
That is a weathering *profile*, and it is what a saprolite looks like. Held
fixed, the section weathers at nearly the same rate at every depth, which no
outcrop does.

{% include figure image_path="/assets/images/weathering/weathering-rinds-galicia.jpg"
   alt="Concentric weathering rinds in granite seen from above, with a coin for scale"
   caption="The rind, in the field: concentric shells of weathered granite around a core the water has not finished with, Estaca de Bares, Galicia. The coin gives the scale. Photo: [PePeEfe](https://commons.wikimedia.org/wiki/File:Concentric_spheroidal_weathering_in_granite.JPG), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)." %}

The section is **periodic left to right** — it has no side walls, because a
no-flow wall forces lateral flow to vanish and manufactures a drainage divide
down the middle. That is also why the orientation and spacing sliders snap:
only certain angles and spacings let the joint pattern close across the seam.

## Where the numbers come from

**Nothing in the chemistry or the flow is fitted any more**, which means the
weathering *timescale* is no longer something this model was told – it is
something it predicts. That is a claim you can check, and it is checked below.

Measured: the two ends of the matrix conductivity, $K_\mathrm{sat,intact}$ and
$K_\mathrm{sat,weathered}$. Goodfellow et al. (2016) measured the hydraulic
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
| Intact matrix conductivity | $K_\mathrm{sat,intact}$ | 5 × 10⁻¹⁰ m s⁻¹ | **measured.** Mid-point of Goodfellow et al. (2016) parent granodiorite |
| Weathered conductivity | $K_\mathrm{sat,weathered}$ | 5 × 10⁻⁶ m s⁻¹ | **measured.** Mid-point of their most weathered samples |
| Joint aperture | $a$ | 100 µm | **measured.** Hydraulic aperture, not the visible opening. Rukavičková et al. (2021) give 20–67 µm at borehole depth; laboratory fractures reach 250 µm unstressed. The conductivity follows by the cubic law (Witherspoon et al. 1980) |
| Saturation length | $L_\mathrm{ref}$ | 0.457 m | **derived.** $qC_{eq}/kA$, with $A$ = 900 m² m⁻³ for 2 mm grains at 30 % plagioclase |
| Water per rock volume | $\tau_\mathrm{ref}$ | 47 744 | **derived.** $M_0/C_{eq}$: 4774 mol Si m⁻³ of rock, over quartz saturation |
| Aqueous diffusivity | $D$ | 1.0 × 10⁻⁹ m² s⁻¹ at 25 °C | **measured**, and of the right species: dissolved silica (Rebreanu et al. 2008; Wollast & Garrels 1971). Scaled by Stokes–Einstein |
| Matrix tortuosity |  | 10⁴ → 10 | **measured range.** The factor by which the connected pore path lengthens and constricts diffusion relative to free solution, $D_\mathrm{eff} = D_w/\tau$. 10⁴ in intact crystalline rock, 10 in saprolite at ~30 % porosity; interpolated with $M$, like the conductivity |
| Dispersivity | $\alpha$ | 2 mm | **the grain diameter.** Mechanical dispersion per unit pore velocity, $D_\mathrm{mech} = \alpha\lvert v\rvert$; $\alpha$ measures the spread of flow-path velocities, which at the pore scale is set by the grain size |

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
**3713 kyr**, which is a weathering front advancing at about **0.81 m Myr⁻¹**.

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

### One mineral, where a rock has many

A granite is quartz, two feldspars, biotite and a little else, and they do not
weather by one mechanism or at one rate. **This model carries a single soluble
phase**, and that is a simplification made for teaching rather than a claim
about rock.

The one worth knowing about is the order of events. Plagioclase dissolving is
what removes mass and turns rock into sand – but it is not what sets the pace.
That job belongs to iron in biotite, and it gets a section of its own at the
end of this page.

What survives the simplification is the part this exercise is about: water
reaches the rock through joints, saturates as it goes, and the rock it never
reaches survives. That argument does not depend on which mineral is dissolving.

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

## What actually goes first: iron in biotite

Everything above treats weathering as **dissolution**, because that is the
reaction to learn first: a rate constant, a solubility ceiling, and water that
stops working once it is full. Granite does not begin there.

The first reaction in a granite is **oxidation of the iron in biotite**, and
it is not a dissolution reaction at all. Rain arrives carrying dissolved
oxygen. The oxygen diffuses into the rock, finds Fe(II) sitting in the
octahedral sheet of a biotite crystal, and takes an electron from it. Nothing
has yet left the rock.

Goodfellow et al. (2016) watched this happen, crystal by crystal, with a
synchrotron X-ray microprobe on 26 biotite grains across ten thin sections.
Their sentences are worth reading in order, because they are the mechanism:

> "Biotite weathering begins with oxidation of parts of biotite crystals that
> are being accessed by diffusing oxygen."
>
> "To maintain charge balance during Fe oxidation, K⁺ ions from the interlayer
> are released into solution."
>
> "In the most weathered crystals, over 85% of the Fe has oxidized, K is
> heavily depleted, and biotite crystals have fragmented along cleavage
> planes."

Read that as a chain: (1) oxygen oxidises the iron, (2) the sheet loses
negative charge, so the potassium holding the layers together is no longer
held and leaves, (3) the layers swell, and (4) the crystal splits along its
cleavage. A biotite grain is a stack of sheets, and oxidising the iron inside
it prises the stack apart.

That last step is the one that matters for the rock, because **biotite is
a few per cent of a granite and it is wedging the rest apart**. The swelling
is small – Goodfellow measure the layer spacing going from 10 Å to 10.5 Å, a
five per cent expansion – but it is happening inside a rigid crystalline solid
that has nowhere to move, and rock is far weaker in tension than in
compression. Fletcher, Buss & Brantley (2006) worked out the energy budget:
fracture when the elastic strain energy stored by the expansion exceeds the
energy needed to make new crack surface. The cracks let water in, water
dissolves the feldspar, and the model on this page takes over.

**Oxidation paces and opens; dissolution removes.** Three lines of evidence
put them in that order:

1. Buss et al. (2008) imaged oxidised biotite **2.7 cm inside** nominally
   fresh corestone at Rio Icacos, with **no** plagioclase weathering there.
   The iron had reacted where the feldspar had not.
2. Behrens et al. (2015) measured both fronts in a Sri Lankan profile and
   found the oxygen-consumption front lying **below** the plagioclase
   dissolution front. Oxidation is the deeper reaction.
3. Goodfellow et al. (2016) measured matrix hydraulic conductivity rising by
   three to four orders of magnitude, and attribute it to "early stages of
   biotite oxidation" – the same measurement this model uses for its
   `k_matrix` and `k_weathered`.

### Running it: the same model, the other reaction

Set **Reaction** to *Biotite oxidation* and everything above still applies –
the same joints, the same flow field, the same advection, diffusion and
reaction. **One thing changes, and it changes the sign of everything.**

In class the solute was a **product**. It started at zero, the rock made it,
and it accumulated until the water was full and the reaction stopped.
Weathering was limited by getting the product *away*.

Now the solute is a **reactant**. It arrives at its ceiling in the rain, the
rock consumes it, and the reaction stops where it runs out. Weathering is
limited by getting the reactant *in*.

That single swap is the concept worth carrying out of this exercise, because
it is everywhere: oxygen against organic matter in a river, a nutrient against
a waste product in a culture, a reactant front against a product front in any
porous medium. Ask of each: **is this limited by supply, or by removal?** The
Damköhler number answers it the same way in both cases.

Three things to watch for, because they are not what class led you to expect.

1. **Turn the temperature up and the weathering slows down.** Oxygen is a
   *gas*, and gases leave solution as water warms – cold water carries
   0.457 mol m⁻³ of dissolved oxygen against 0.236 at 30 °C. There is no
   activation energy pushing the other way, because none has ever been
   measured for this reaction. (This does not say cold *places* weather more
   slowly. Rio Icacos gets four metres of rain a year, and water supply is a
   separate dial – try it.)
2. **The rind stops being a front and becomes a gradient.** Dissolving, the
   joint cell goes to *all* and the block core stays at *none*, with a sharp
   step between – measured at 30 % of the section reacted, 1.00 at the joint
   and 0.03 twenty centimetres in. Oxidising, the same comparison runs 0.58 to
   0.25: the joint never saturates and the core is never untouched. Both
   reach the 20–60 cm scale of field rindlet zones eventually, but only one
   of them looks like a gradient the whole way.
3. **The section stops having a profile with depth.** Granite holds little
   iron, so the oxygen is barely touched crossing three metres and reaches
   every depth at nearly full strength – at Rio Icacos, pore water 8.5 m down
   still carries 88 % of its atmospheric saturation. What limits a corestone
   here is not depth but the few centimetres oxygen can diffuse into intact
   rock.

**A warning that comes with the mode.** For plagioclase there is a published
compilation of measured rate constants and activation energies. For oxidation
of structural Fe(II) by dissolved O₂ there is no measured activation energy at
all, and the two values this model could have used differ by a factor of four
thousand – the larger of them back-calculated from a measured denudation rate
rather than measured in a laboratory. This mode is built on the softest ground in the model, and you
should treat its *timescales* as indicative and its *mechanism* as sound.


## References

- Freeze, R.A. & Cherry, J.A. (1979). *Groundwater.* Prentice-Hall, 604 pp.
  – the classic ranges for hydraulic conductivity and porosity.
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

- Fletcher, R.C., Buss, H.L. & Brantley, S.L. (2006). A spheroidal weathering
  model coupling porewater chemistry to soil thicknesses during steady state
  erosion. *Earth and Planetary Science Letters* **244**, 444–457.
  [doi:10.1016/j.epsl.2006.01.055](https://doi.org/10.1016/j.epsl.2006.01.055)
  – the elastic-energy criterion for oxidation-driven fracturing.
- Behrens, R., Bouchez, J., Schuessler, J.A., Dultz, S., Hewawasam, T. & von
  Blanckenburg, F. (2015). Mineralogical transformations set slow weathering
  rates in low-porosity metamorphic bedrock on mountain slopes in a tropical
  climate. *Chemical Geology* **411**, 283–298.
  [doi:10.1016/j.chemgeo.2015.07.008](https://doi.org/10.1016/j.chemgeo.2015.07.008)
  – the oxygen-consumption front measured below the plagioclase front.
- Navarre-Sitchler, A., Brantley, S.L. & Rother, G. (2015). How porosity
  increases during incipient weathering of crystalline silicate rocks.
  *Reviews in Mineralogy and Geochemistry* **80**, 331–354.
  [doi:10.2138/rmg.2015.80.10](https://doi.org/10.2138/rmg.2015.80.10)
  – why a low-iron rock lets oxidation run deep.

- Buss, H.L., Sak, P.B., Webb, S.M. & Brantley, S.L. (2008). Weathering of the
  Rio Blanco quartz diorite, Luquillo Mountains, Puerto Rico: coupling
  oxidation, dissolution, and fracturing. *Geochimica et Cosmochimica Acta*
  **72**, 4488–4507.
  [doi:10.1016/j.gca.2008.06.020](https://doi.org/10.1016/j.gca.2008.06.020)
  – biotite oxidation as the fracture-inducing reaction.
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
