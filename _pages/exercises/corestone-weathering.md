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
sitting in crumbling sand. It is natural to assume the boulders are made of
tougher stuff. **They are not.** A **corestone** is the same granite, with the
same minerals, that has sat at the same temperature as the **grus** – the
loose sand that granite falls apart into – around it.

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

**What the model is.** A vertical **section** of granite – a slice seen
edge-on – 3 m across and 3 m deep. The top edge is the ground surface, rain
enters there, and water drains out of the bottom. It has no sides: the left and
right edges wrap onto each other, so a block near one edge sees rock rather than a wall. Cutting
through it is a network of **joints** – the fractures tectonics and unloading
leave in granite – and those are where water moves freely. The solid rock
between them is called the **matrix**, and it is the same granite, just
unfractured.

<!--
  data-design-width is the width the app lays itself out for, and it is
  ALSO recorded inside the compiled page. Two places on purpose: the
  script cannot read the compiled page while this page lays itself out,
  because an iframe starts on a blank document, and on WebKit -- every
  browser on an iPad -- that is what it sees. Without the attribute the
  demo is never scaled: it sits at its own width inside a wider frame.

  height="590" is the demo's measured height at its design width, not a
  guess: it is what the reader looks at while the runtime arrives,
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
  these demos pull tens of megabytes of Pyodide before that happens. The
  self-hosted half is 11.7 MB and is the only half artesian measures; the
  runtime and the packages it bundles come from the Pyodide CDN and are not
  counted anywhere, which is why no exact total is quoted. Without
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

**The first load takes 10–30 seconds** while your browser downloads the model
and the Python runtime it needs (a few tens of megabytes). It runs smoothly
after that, and the download is cached, so coming back to the page is fast.
Nothing is sent to a server: the model runs on your own machine, inside the
browser tab.

Press **▶ Run** and watch. The left panel is **where the water goes** – the
water flux in metres per year, on a logarithmic scale because it spans four
orders of magnitude. (Flux rather than speed: it is the volume crossing a
square metre of rock each year, and the water itself threads through the pores
faster than that.) The right panel is **what the water has taken**. Cause on the
left, effect on the right.

Watch the left panel change. At the default settings the joints start out
carrying about 6 m/yr while the rock between them creeps along at 0.0003 m/yr
– twenty thousand times slower. As that rock dissolves it opens, and the water
spreads into it, which is why the weathering runs away downward from the
surface rather than staying in the joints.

- **Joint orientation** and **joint spacing** set the fracture network – the
  input from tectonics, fixed before weathering starts. Spacing reaches
  **none** at its far end, which removes the fractures altogether.
- **Rainfall** sets how fast water arrives at the surface. How much of it gets
  *in* is up to the rock: with joints, all of it; without them, about a
  twenty-fourth of it, and the rest runs off.
- **Temperature** does two things at once, and they are worth separating. See
  below.
- **Cell size** is the numerical grid, not the rock: 5 cm, 2.5 cm or 2 cm
  across the same 3 m section. Finer resolves the weathering **rind** – the
  shell of part-reacted rock between a joint and an untouched core – more
  sharply and costs about eighteen times the computing at 2 cm. Use **Show**
  there rather than **▶**, which cannot keep time at that cost. Note that
  fewer joint
  orientations and spacings are available at 2 cm – only patterns that fit a
  whole number of cells can tile the section exactly, and which ones those
  are depends on the grid.

**▶** animates from fresh rock and keeps going until you pause it. It advances
the clock at the same rate whatever the sliders say (1000 model years per
frame, about 30 000 years per second), which means a setting that takes eight
times as long in the model takes eight times as long to watch. **Cold rock is
not slow to watch by accident. It is slow because it is slow**, and that is
the comparison you are here to make. Give the slow settings longer: at
0.05 m/yr and 0 °C the section is only a fourteenth dissolved after 2000 kyr,
and about a sixth after 5000. **View results at** with **Show** asks a
different question – what does the rock look like at 2000 kyr? – and answers
it directly, without the animation. It reaches 15 000 kyr, which is long
enough for the default settings to dissolve completely and for a cold section
too. Settings slower than that exist, and for those you need **▶**, which has
no end.

Use **Show** to compare: set a time, press it, change one slider, press it
again. It always rebuilds from fresh rock, so the answer depends only on the
settings and the time and never on what you pressed before it. Two settings
seen at the same age is a comparison; two settings seen at whatever moment you
happened to press pause is not.

Each slider rebuilds the rock and restarts the clock, because each one is a
property of the starting state rather than something you can change halfway
through. **Fresh rock** does the same on demand: it puts the section back to
unweathered at the current settings, which is how you start a fair second run.

**Reaction** is the one control that is not a parameter. It switches which
chemical reaction the model solves – feldspar dissolution or biotite oxidation
– and [the last part of this page](#what-actually-goes-first-iron-in-biotite)
takes the two apart. The exercise below uses *Feldspar dissolution*, which is
where it opens.

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

### What does it do?

You are an experimentalist with one apparatus and no theory yet. The theory is
below, and it is better met second. Find out what the model **does**, and the
explanation will be waiting when you want it.

Write your prediction down *before* you run anything, every time. A prediction
you keep in your head is one you can revise after the fact without noticing.

**1. Watch one run, and say what you see.** Leave every slider where it opens.
Press **▶** and watch until roughly half the section has reacted.

- Where does the rock react first? Where does it react last?
- What *shape* do the untouched blocks take as the run goes on? Sketch one.
- The left panel is how fast the water is moving, and the right panel is how
  far the reaction has got. Which one changes during the run, and which one
  looks much the same at the end as at the start?

**2. Now change one thing at a time.** For each control below, predict first,
then press **Fresh rock** and run again. You are after the *direction* of the
effect and roughly how big it is, not a number.

- **Joint spacing.** Closer joints, or wider?
- **Rainfall.** More rain, or less?
- **Temperature.** (Do this one last. Getting the direction right is the easy
  half. It is also the biggest lever of the three, and it has two causes
  rather than one, which **Under the hood** takes apart.)

**3. One of these is not like the others.** Change **Cell size** and run again.

- What happens to the answer?
- What *should* happen to the answer, and why? (Cell size is not a property of
  the rock. It is how finely the computer chops the rock up.)
- If the answer does move, is that a discovery about granite or a warning
  about the model?

**4. Write it up, about a page.** A sketch of a block from step 1, your three
predictions with what actually happened, and one paragraph on this: **two
blocks of the same granite, the same minerals, and the same temperature, and
one is grus while the other is a corestone. Why?** Answer from what you
watched, not from what you have read elsewhere.

Then read **Under the hood** and see which of your answers the equations agree
with.

## Under the hood

Weathering is a race. Water arrives at some rate, rock reacts with it at
another, and the slower of the two sets the pace. Which one is slower turns out
to depend on where you are standing in the outcrop, and that is the whole point
of what follows.

You will build that race in four steps – water, solute, rock, reaction – with
one equation each, and every one of them is a statement about a box you could
chalk on a roadcut.

### Notation

Weathering sits where hydrogeology meets geochemistry, and the two fields
collide on one letter. **Capital $K$ here is always a hydraulic conductivity,
and lower-case $k$ always a reaction rate constant.** That is this page's rule
rather than a law of either field – Fletcher, Buss & Brantley (2006) write
$K = kS$ for a lumped kinetic parameter, and White & Brantley (2003) use $K_s$
for a solubility constant – so both carry subscripts here.

Two of them carry their standard Arrhenius meanings: $k$, the reaction rate
constant in s⁻¹, and $A$, the Arrhenius frequency.

| symbol | meaning | units |
|---|---|---|
| $x$ | horizontal distance across the section | m |
| $z$ | vertical coordinate, positive **upward** | m |
| $q$ | specific discharge (Darcy flux) | m s⁻¹ |
| $K_\mathrm{sat}$ | saturated hydraulic conductivity | m s⁻¹ |
| $h$ | hydraulic head | m |
| $n$ | porosity, 0 to 1 | – |
| $C$ | concentration of the reacting solute | mol m⁻³ |
| $C_{eq}$ | equilibrium concentration of the dissolved species, and so the ceiling on $C$ | mol m⁻³ |
| $C_\mathrm{eq,0}$ | the entropy term in $C_{eq}(T)$, $\propto\exp(\Delta S_r/R)$ | mol m⁻³ |
| $\Omega$ | saturation state of the fluid, $C/C_{eq} = Q/K$ | – |
| $k$ | reaction rate constant, dissolution | s⁻¹ |
| $k_\mathrm{ox}$ | reaction rate constant, oxidation | s⁻¹ |
| $A$ | Arrhenius frequency: interactions per unit time, and therefore proportional to reactive surface area | s⁻¹ |
| $s_\mathrm{geo}$ | reactive mineral surface area per rock volume, **geometric** rather than BET (gas-adsorption) | m² m⁻³ |
| $D$ | diffusion coefficient in the rock, $D_w$ divided by tortuosity | m² s⁻¹ |
| $D_w$ | diffusion coefficient in free water | m² s⁻¹ |
| $N$ | solute still locked in the rock, per unit volume | mol m⁻³ |
| $N_0$ | $N$ in fresh rock, before any weathering | mol m⁻³ |
| $M$ | fraction of that still locked in, $N/N_0$ | – |
| $L$ | saturation length | m |
| $\mathrm{Da}$ | Damköhler number, joint spacing divided by $L$ | – |
| $E_a$ | activation energy | J mol⁻¹ |
| $\Delta H_r$ | enthalpy change of the reaction that sets the ceiling | J mol⁻¹ |
| $\Delta S_r$ | entropy change of that same reaction | J mol⁻¹ K⁻¹ |
| $T$ | absolute temperature | K |
| $t$ | time | s |
| $R$ | universal gas constant, 8.314 | J mol⁻¹ K⁻¹ |

Two quantities on this page keep their English names rather than take a Greek
letter, because every letter the literature offers for them is already spent in
geomorphology. **Tortuosity** is written out; $\tau$ is shear stress and
$\theta$ is a slope angle. **Pore volumes** – how many volumes of saturated
water it takes to strip one volume of rock – is written out too; $\tau$ is the
mass transfer coefficient in Goodfellow et al. (2016) and Fletcher et al.
(2006), where it runs from −1 to 0 and measures how weathered a rock is.

### 1. Water: Darcy's law

Water threads through rock along connected pores and cracks. It runs from where
its energy is high to where its energy is low, and that energy is the
**hydraulic head**, $h$ (in the field, the height water stands in a well). The
steeper the drop in head, the faster the water goes.

Henry Darcy, filtering the water supply of Dijon through sand in 1856, found
that the flow rate is just proportional to that steepness:

$$q = -K_\mathrm{sat}\,\frac{\partial h}{\partial z}$$

- $q$, the **specific discharge**: water volume per unit area of rock per unit
  time. (Not the speed of a molecule. Pores are only part of the rock, and the water
  threads through them faster than $q$ by roughly $1/n$.)
- $K_\mathrm{sat}$, the **saturated hydraulic conductivity**: how freely the
  material passes water when its pores are full.
- $\partial h / \partial z$, the head gradient (dimensionless, being a length
  over a length).
- The minus sign, which sends water *down* the gradient instead of up it.

Two statements make a flow model. Darcy's law says where the water goes.
Conservation says it cannot pile up:

$$\nabla\cdot(K_\mathrm{sat}\,\nabla h) = 0$$

- $\nabla\cdot$, the divergence (the net flow out of a point). Set it to zero
  and you have said that what flows in flows out.

That equation needs boundaries to have an answer, and the section supplies
three. Rain arrives at the **top** at the rate the rainfall slider sets, and
the rock takes it up to its own capacity – the rest ponds and runs off, which
matters only when there are no joints. The **base** drains freely. The
**sides** wrap onto each other, so nothing enters or leaves there.

Everything interesting lives in $K_\mathrm{sat}$. It ranges over about thirteen
orders of magnitude between gravel and unfractured crystalline rock (Freeze and
Cherry, 1979), which is more than any other quantity in this exercise.

**A joint is not a special rule in this model. It is a large
$K_\mathrm{sat}$.** Intact granite runs about $5\times10^{-10}$ m s⁻¹, and a
100 µm joint smeared over a 5 cm cell is thirty thousand times more conductive.
Solve the equation on that field and water runs down the joints on its own,
because that is what a head field does when a low-resistance path exists. You
never have to tell it to.

Watch that subscript, though. Corestones form *above* the water table,
where pores are only partly full and the true conductivity is both lower and
dependent on how wet the rock is. Using the saturated value everywhere is the
wet-end limit: it routes water down the joints correctly, and it overstates how
briskly the matrix passes water between storms.

### 2. Solute: the box

Chalk a box on the outcrop, $\Delta x$ wide and $\Delta z$ tall. Ask what
happens to the dissolved material inside it. Four things can: (1) water carries
solute in and out, which is **advection**; (2) solute spreads from where there
is more to where there is less, which is **diffusion**; (3) the rock adds
solute, or takes it away; and (4) the amount inside changes.

Write those four as rates and you have the balance. The box is a slice of unit
thickness, so every term below is **moles per second per metre of thickness**,
and each flux is multiplied by the length of the face it crosses:

$$\underbrace{\big[qC\,\Delta x\big]_{\rm in} - \big[qC\,\Delta x\big]_{\rm out}}_{\text{advection}}
\;+\; \underbrace{\big[-D\nabla C\,\Delta x\big]_{\rm in} - \big[-D\nabla C\,\Delta x\big]_{\rm out}}_{\text{diffusion}}
\;+\; \underbrace{-\frac{\partial N}{\partial t}\,\Delta x\,\Delta z}_{\text{reaction}}
\;=\; \underbrace{\frac{\partial (nC)}{\partial t}\,\Delta x\,\Delta z}_{\text{storage}}$$

- $qC$, solute carried along by flowing water (the water flux, times what that
  water is carrying). It is a flux, in mol m⁻² s⁻¹, which is why it needs a
  face length to become a rate. Faces perpendicular to $z$ have length
  $\Delta x$; faces perpendicular to $x$ have length $\Delta z$. Both are
  written $\Delta x$ above for brevity.
- $-D\nabla C$, **Fick's law**: spreading runs down the concentration gradient,
  from more to less, which is what the minus sign is doing.
- $-\,\partial N/\partial t$, the rate at which silicon leaves the rock, per
  cubic metre of it. $N$ is what the rock still holds, so minus its rate of
  change is what the water gains. There is no separate symbol for a rate here:
  a rate is the derivative of something the rock or the water has.
- $nC$, the solute sitting in storage, since only the pore fraction holds water.

Divide every term by $\Delta x\,\Delta z$, so that each is now per unit volume,
and let the box shrink. Each in-minus-out per unit volume is by definition a
divergence:

$$-\nabla\cdot(qC) + \nabla\cdot(D\nabla C) - \frac{\partial N}{\partial t} = \frac{\partial (nC)}{\partial t}$$

Now drop the storage term. You should know why you are allowed to, because it
is the one approximation in this derivation. Water
crosses this section in years, and the rock takes hundreds of thousands.
The solute field therefore settles into its balance long before the rock it is
dissolving has measurably changed. Furthermore, dropping storage is what removes porosity from the transport
equation. ($n$ has not left the page. It still sets how much faster the water
itself moves than $q$ does, which the dispersion term uses. It is gone from
the balance being solved.)

Setting the right-hand side to zero and multiplying through by $-1$:

$$\nabla\cdot(qC) - \nabla\cdot(D\nabla C) = -\frac{\partial N}{\partial t}$$

In words: what the flow carries away, plus what diffusion spreads away, equals
what the rock supplies. Every term is in mol m⁻³ s⁻¹.

This one needs boundaries too. Rain arrives at the top carrying **no dissolved
solute** ($C = 0$), which is what makes it able to do work. Solute leaves
through the base with the water. The sides wrap, as before.

One honest note on $D$. The model does add a velocity-dependent term to it
(mechanical dispersion, the spreading caused by water taking many paths of
different length), but that term never takes over. Measured on this section,
the Péclet number $\alpha|v|/D$ is below 1 on *every* link: 0.55 in the joints,
0.17 in the matrix. **Call it diffusion.** It is molecular diffusion through
the pore network that carries solute out of a block interior, and it is what
lets a block weather inward at all.

### 3. Rock: the same balance, seen from the mineral

Whatever the water gains, the rock has lost. That is not a second equation to
solve; it is what $N$ means, and the only thing left to name is the fraction:

$$M = \frac{N}{N_0}$$

- $N$, how much silicon is still locked in a cubic metre of rock, counted as a
  number of atoms and reported in moles. Counting *atoms of the solute* rather
  than formula units of the mineral is what makes this balance 1:1: one
  plagioclase unit releases several silicons, and $N$ has already done that
  multiplication.
- $N_0$, the value of $N$ in fresh rock, about 4,800 mol m⁻³.
- $M = N/N_0$, the fraction still locked in: 1 when fresh, 0 when spent. The
  model tracks $M$, since that is what porosity and conductivity respond to.

That is the whole model. Everything below is about how fast $N$ falls.

### 4. The reaction, one: feldspar dissolution

Plagioclase dissolving into water is the textbook case, and it is the one the
exercise above runs:

$$\frac{\partial N}{\partial t} = -k(T)\,C_{eq}\left(1 - \frac{C}{C_{eq}}\right)$$

- $k(T)$, the **reaction rate constant**, in s⁻¹: how often, per unit time, an
  interaction at the mineral surface causes a reaction. Writing it $k(T)$ only
  says that it depends on temperature.
- $C_{eq}$, the **equilibrium concentration** of the dissolved species: the
  value $C$ climbs to when the reaction has run as far as it can go. It is the
  ceiling, and it carries the units.
- $(1 - \Omega)$, where $\Omega = C/C_{eq}$ is the **saturation state** of the
  fluid: how much of its capacity the water has already used. It is 1 in fresh
  water and 0 at saturation, so it is the term that stops the reaction.

$\Omega$ is the standard way to say how close a fluid is to equilibrium with a
mineral. It is the ion activity product over the equilibrium constant, $Q/K$,
which for this reaction is just $C/C_{eq}$ because the quartz and the water
have unit activity. You will also meet it as the saturation index,
$\mathrm{SI} = \log_{10}\Omega$, which is zero at equilibrium.

Written this way the rate law reads straight off the fluid chemistry, and it
covers more than dissolution:

| saturation state | the fluid is | and so |
|---|---|---|
| $\Omega < 1$ | undersaturated | $N$ falls, the mineral dissolves |
| $\Omega = 1$ | at equilibrium | $N$ holds steady, nothing happens |
| $\Omega > 1$ | supersaturated | $N$ rises, the mineral precipitates |

The third row is how secondary minerals form, and it is the same equation.
(This linear form is the near-equilibrium case of the general rate law, which
carries $1 - \exp(\Delta G_r / RT)$ in place of $1 - \Omega$.)

That bracket is the whole idea of this exercise. Rock does not survive because
it is tough. It survives because the water that reached it had already finished
working – and everything you watch the demo do follows from that one factor
going to zero.

**Temperature enters the rate law twice**, once in each factor.

$$k(T) = A \exp\!\left(-\frac{E_a}{R\,T}\right) \qquad \text{Arrhenius}$$

$$C_{eq}(T) = C_\mathrm{eq,0} \exp\!\left(-\frac{\Delta H_r}{R\,T}\right) \qquad \text{van 't Hoff}$$

- $E_a$, the **activation energy**: the barrier a reaction has to clear.
- $A$, the **Arrhenius frequency**: how often the reaction is attempted, per
  unit time. Surface area enters here, which is why fracturing rock speeds its
  chemistry up. The exponential beside it is the fraction of those attempts
  carrying enough energy to clear the barrier.
- $\Delta H_r$, the **enthalpy change** of the reaction that sets the ceiling:
  the heat it takes in. Positive here, so warming raises $C_{eq}$. Note the
  subscript is *reaction*, not *dissolution*: the reaction meant is whichever
  one saturates the water, and it is not the one dissolving the rock.
- $C_\mathrm{eq,0}$, the **entropy** term, $\propto \exp(\Delta S_r / R)$.
  Dissolution turns an ordered crystal into ions wandering loose in water, and
  the larger that gain in disorder, the higher the ceiling sits at every
  temperature. The two equations are one statement, $\Delta G_r = \Delta H_r -
  T\Delta S_r$, split into its enthalpy and entropy halves.

Put both into the rate law and the bracket multiplies out:

$$\frac{\partial N}{\partial t} = -k\,(C_{eq} - C)$$

Warming raises $k$ and raises $C_{eq}$. It raises the rate through both.

The saturation length is where the two pull against each other. $L = q/k$, and
$k$ carries the **difference** $(E_a - \Delta H_r)$ = 36.9 kJ mol⁻¹, not $E_a$
alone. Warming shortens $L$: 0.90 m at 0 °C, 0.18 m at 30 °C.

Move the temperature slider and watch which of those you are seeing.

### 5. What stops a reaction

Everything above assumed the solute is something the rock **makes**. Granite
has a second reaction where it is something the rock **consumes** instead, and
the difference is structural rather than chemical:

$$\frac{\partial N}{\partial t} = -k_\mathrm{ox}\,C$$

- $k_\mathrm{ox}$, the oxidation rate constant, in s⁻¹, exactly like the
  dissolution $k$ above.
- $C$, dissolved oxygen. (Notice there is **no bracket**. That is the point.)
- $N$ is now the oxygen the rock can still take up, so it still falls as the
  reaction runs. **The structural change is in the water.** Dissolving, the
  water gains what the rock loses, and its balance carries
  $-\,\partial N/\partial t$. Oxidising, the water *loses* what the rock takes,
  so the same balance carries $+\,\partial N/\partial t$ instead.

Dissolving, the solute is a **product**. It starts at zero, the rock makes it,
and it piles up until the water is full and the reaction stops. Oxidising, it
is a **reactant**. It arrives at its ceiling in the rain, the rock consumes it,
and the reaction stops where it runs out.

Three things flip, then, and no more: the driving force from $(1-\Omega)$ to
$\Omega$, the sign on $\partial N/\partial t$ in the water's balance, and the
concentration of the water arriving at the top from 0 to its ceiling. **The transport equation itself does
not change at all** – same advection, same diffusion, same conservation. That
is what makes the two reactions one model rather than two.

Carry this away if you carry nothing else:

> A reaction stops when the water can no longer do work. It gets there two
> ways – **the reactant runs out, or the product fills up.** Ask of any
> weathering system which of the two it is.

The reaction itself, the evidence that it goes first in a real granite, and
what changes when you run it are all in
[the last part of this page](#what-actually-goes-first-iron-in-biotite).

### 6. Two length scales and one ratio

Divide through by $C_{eq}$ so that concentration runs from 0 to 1:

$$\nabla\cdot(q \Omega) - \nabla\cdot(D \nabla \Omega) = k\,(1 - \Omega)$$

- $\Omega = C/C_{eq}$, the saturation state, which now runs from 0 to 1.
- $k$, the same reaction rate constant as above, now doing a second job: how
  fast undersaturation gets used up. The flux has cancelled out of it, and it
  is what the Damköhler number below is built from.

**The saturation length.** How far does water travel before it is spent?

$$L = \frac{q}{k}$$

Here $L = 0.46$ m. It is not a distance at which equilibrium is reached ($\Omega$
approaches 1 asymptotically, and never arrives) – after one $L$, the
undersaturation is down to $1/e$ of what it was.

Look at what $L$ is built from. It grows with flux and shrinks with
reactivity, and because $k$ carries $C_{eq}$ and the rate constant together, it takes its temperature
dependence from the *difference* $(E_a - \Delta H_r) = 36.9$ kJ mol⁻¹ rather
than from $E_a$ alone. That difference is the **apparent activation energy of
weathering**. It is what a field study measuring rate against temperature
actually recovers (and it is not $E_a$, which is the trap).

**The water requirement.** How many volumes of saturated water strip one volume
of rock?

$$\text{pore volumes} = \frac{N_0}{C_{eq}}$$

Here it is about 48,000. The plagioclase in a cubic metre of granite needs
forty-eight thousand cubic metres of saturated water to leave. That number, and
not the rate constant, is why weathering is slow. (On oxygen the same rock
needs about 680, which is why oxidation can pace a process that dissolution
cannot.)

**The ratio.** Divide the **joint spacing** – how far water travels between
entering a joint and reaching the block it has to attack – by the saturation
length, and you have the **Damköhler number**. It counts the e-foldings of
saturation a parcel of water goes through on the way:

$$\mathrm{Da} = \frac{\text{joint spacing}}{L}$$

- **Da ≫ 1, saturation-limited.** Water fills up long before it runs out of
  rock. Weathering happens where fresh water arrives, and nowhere else.
- **Da ≪ 1, reaction-limited.** Water crosses barely touched, and the rate
  constant sets the pace everywhere at once.

The spacing is the right length because it is one the *rock* sets. A depth is
not: it is how much of the section you chose to draw, and Da would move with
that choice while the granite stayed the same.

**Da is a field, not a number.** $L = q/k$, and the joints made $q$ uneven in
the first place. At 1 m spacing the model carries $L \approx 7$ m in the cells
a joint touches and $L \approx 0.24$ mm in the matrix between them – a factor
of thirty thousand – so Da runs from about 0.14 beside a joint to several
thousand a few grains inside a block. Water goes the whole spacing barely
touched in one place and saturates within a grain diameter in the other.

**That spread is the corestone**, written as a number. Both limits sit in the
same rock at the same time, and which one a point is in is decided by how much
water reaches it. (Run the section on oxygen instead and the saturation length
is 132 m rather than 0.46 m, so every Da here falls by nearly 300 and the whole
section moves into the reaction-limited limit.)

### 7. The feedback: weathered rock conducts better

Weathering opens connected porosity, and $K_\mathrm{sat}$ therefore climbs as
the rock reacts. The model interpolates it geometrically between intact granite and
weathered material – linearly in $\log K_\mathrm{sat}$, because conductivity
varies by orders of magnitude and not by small increments:

$$K_\mathrm{sat}(M) = K_\mathrm{sat,intact}^{\,M}\, K_\mathrm{sat,weathered}^{\,1-M}$$

The head is re-solved as the rock changes, and that closes a loop. Water opens
rock, and open rock draws more water.

Watch what that does with depth in your own run. Shallow blocks are destroyed
while deeper ones survive and taper, because water opens the rock it passes through on the way
down and arrives at depth already spent. That is a weathering *profile*, and it
is what a saprolite looks like – rock rotted in place, still holding the shape
it had. Hold the conductivity fixed instead (as this
model did until it was checked) and the section weathers at nearly the same
rate at every depth, which no outcrop does.

{% include figure image_path="/assets/images/weathering/weathering-rinds-galicia.jpg"
   alt="Concentric weathering rinds in granite seen from above, with a coin for scale"
   caption="The rind, in the field: concentric shells of weathered granite around a core the water has not finished with, Estaca de Bares, Galicia. The coin gives the scale. Photo: [PePeEfe](https://commons.wikimedia.org/wiki/File:Concentric_spheroidal_weathering_in_granite.JPG), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)." %}

The section is **periodic left to right**, and has no side walls. A no-flow wall
would force lateral flow to vanish there and manufacture a drainage divide down
the middle of the domain. That is also why the orientation and spacing sliders
snap: only certain angles and spacings let the joint pattern close on itself
across the seam.

## Where the numbers come from

**Nothing in the chemistry or the flow is fitted any more**, which means the
weathering *timescale* is no longer something this model was told – it is
something it predicts. That is a claim you can check, and it is checked below.

Measured: the two ends of the matrix conductivity, $K_\mathrm{sat,intact}$ and
$K_\mathrm{sat,weathered}$. Goodfellow et al. (2016) measured the hydraulic
conductivity of the *matrix* of granodiorite, a close relative of granite,
across a range of weathering grades and
found it rises three to four orders of magnitude, from 9 × 10⁻⁹ – 8 × 10⁻⁸
cm s⁻¹ in the parent rock to 9 × 10⁻⁵ – 9 × 10⁻⁴ cm s⁻¹ in the most weathered
samples, driven by the cracking that follows oxidative dissolution of biotite.
The model uses the mid-points of those ranges: 5 × 10⁻¹⁰ and 5 × 10⁻⁶ m s⁻¹.
Those are *matrix* conductivities, deliberately. Goodfellow et al. note that
their values sit one to three orders of magnitude below field measurements on
weathering granitoids (the granite family), and attribute the difference to
their having measured
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
that of oligoclase – the particular plagioclase a granite usually carries –
$E_a$ = 69.8 kJ mol⁻¹ (Palandri & Kharaka 2004, neutral mechanism; K-feldspar
would be 38.0).

The reaction enthalpy $\Delta H_r$ is not a property of the dissolving mineral
at all – it is a statement about *what saturates*. Here the ceiling on the
solute is dissolved silica, so $\Delta H_r$ = 32.9 kJ mol⁻¹ is quartz's, and
quartz itself is held inert here. Read the ceiling differently – as the solution being buffered by
kaolinite, the clay that weathering actually makes – and $\Delta H_r$ turns
*negative* for calcium-rich plagioclase, and warming the rock would slow its
weathering down. That is a real regime. It is not this one, and which of the
two you are in is decided by what stops the reaction, not by the mineral.

**Not calibrated to any particular granite**, and no number here should be
read as a measurement of one. Every parameter below is either measured
elsewhere or derived from the mineralogy, but the granite they describe is a
generic one and the section they run in is drawn rather than surveyed.

### Every dissolution parameter, and where it came from

| | symbol | value | where it came from |
|---|---|---|---|
| Reference temperature | $T_\mathrm{ref}$ | 285 K (11.85 °C) | **normalisation.** Both temperature factors are exactly 1 here, which is why the slider opens at 12 °C |
| Activation energy | $E_a$ | 69.8 kJ mol⁻¹ | **measured.** Oligoclase, neutral mechanism, Palandri & Kharaka (2004) Table 13 |
| Reaction enthalpy | $\Delta H_r$ | 32.9 kJ mol⁻¹ | **measured.** Quartz dissolution at 25 °C, LLNL thermodynamic database |
| Intact matrix conductivity | $K_\mathrm{sat,intact}$ | 5 × 10⁻¹⁰ m s⁻¹ | **measured.** Mid-point of Goodfellow et al. (2016) parent granodiorite |
| Weathered conductivity | $K_\mathrm{sat,weathered}$ | 5 × 10⁻⁶ m s⁻¹ | **measured.** Mid-point of their most weathered samples |
| Joint aperture | $a$ | 100 µm | **measured.** Hydraulic aperture, not the visible opening. Rukavičková et al. (2021) give 20–67 µm at borehole depth; laboratory fractures reach 250 µm unstressed. The conductivity follows by the cubic law (Witherspoon et al. 1980) |
| Saturation length | $L_\mathrm{ref}$ | 0.457 m | **derived.** $q/k$, where $k$ comes from a surface-normalised rate constant of 10⁻¹¹·⁸⁴ mol m⁻² s⁻¹ (Palandri & Kharaka) on $s_\mathrm{geo}$ = 900 m² m⁻³, for 2 mm grains at 30 % plagioclase |
| Pore volumes per rock volume | – | 47 744 | **derived.** $N_0/C_{eq}$: 4774 mol Si m⁻³ of rock, over quartz saturation. $N_0$ counts *silicon released*, not formula units of plagioclase, which is what lets the rock and solute balances be 1:1 |
| Free-water diffusivity | $D_w$ | 1.0 × 10⁻⁹ m² s⁻¹ at 25 °C | **measured**, and of the right species: dissolved silica (Rebreanu et al. 2008; Wollast & Garrels 1971). Scaled by Stokes–Einstein. In the rock it is this divided by the tortuosity below, which is $D$ |
| Matrix tortuosity | – | 10⁴ → 10 | **measured range.** The factor by which the connected pore path lengthens and constricts diffusion relative to free solution: $D = D_w$ divided by it. The literature writes it $\tau$, which on this page is shear stress in your own notes, so it keeps its English name. 10⁴ in intact crystalline rock, 10 in saprolite at ~30 % porosity; interpolated with $M$, like the conductivity |
| Dispersivity | $\alpha$ | 2 mm | **the grain diameter.** Mechanical dispersion per unit pore velocity, $D_\mathrm{mech} = \alpha\lvert v\rvert$; $\alpha$ measures the spread of flow-path velocities, which at the pore scale is set by the grain size |

**$A$ and $C_\mathrm{eq,0}$ are not in the table because the model never
evaluates them.** Each is a real physical quantity, an attempt frequency and an
entropy. But every rate here is taken relative to the reference state, so what
enters the arithmetic is $k(T)/k(T_\mathrm{ref})$ and
$C_{eq}(T)/C_{eq}(T_\mathrm{ref})$, and both cancel. This model therefore holds
a *normalisation* where a research model would need an absolute solubility,
which is why $C_{eq}$ appears in the code only ever as a ratio.

### Does it get the timescale right?

Because nothing in the chemistry or the flow is fitted, how long weathering
takes is a *result*, and a result can be checked. At the default settings –
1 m joints, 0.30 m yr⁻¹, 12 °C – this model dissolves 90 % of a 3 m section in
**3713 kyr**, which is a weathering front advancing at about **0.81 m Myr⁻¹**.

Measured granite regoliths – the weathered layer sitting on fresh rock – from cosmogenic and solute budgets:

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
where BET – surface area measured by how much gas the rock adsorbs, which counts every pit and crack – runs 3 × 10⁵–3 × 10⁶ for granite. Closing the rate would need a factor
of five, which is still 70 to 700 times below BET – so the disagreement lives
inside
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
saprock, saprolite and grus are distinguished by fabric (how the grains sit together) and mineralogy, and a
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
it is not a dissolution reaction at all. Biotite is built in sheets, stacked
like pages with potassium between them, and the iron sits inside the sheets.
Rain arrives carrying dissolved oxygen. The oxygen diffuses into the rock,
finds that Fe(II), and takes an electron from it. Nothing
has yet left the rock.

Goodfellow et al. (2016) watched this happen, crystal by crystal, with a
synchrotron X-ray microprobe on 26 biotite grains across ten thin sections (rock ground thin enough to see through).
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
cleavage. Oxidising the iron inside the stack prises it apart.

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

### Every oxidation parameter, and where it came from

These are the biotite counterparts of the dissolution table above, and the
comparison is the point: **every one of them is weaker than its opposite
number.** Where the dissolution side has a compiled rate constant and a
measured activation energy, this side has one published rate and no
activation energy at all.

| | symbol | value | where it came from |
|---|---|---|---|
| Oxidation rate constant | $k_\mathrm{ox}$ | 7.2 × 10⁻¹¹ s⁻¹ | **weakest number in the model.** Built from a surface-normalised 4 × 10⁻¹³ m s⁻¹ on $s_\mathrm{geo}$ = 180 m² m⁻³, from the one published rate for Fe(II) silicate oxidation by dissolved O₂. Candidate values span a factor of four thousand. Compare the dissolution $k$, 2.1 × 10⁻⁸ s⁻¹ |
| Biotite fraction | $\phi_\mathrm{bt}$ | 0.06 | **chosen** from the 3–10 % range for granite |
| Biotite surface area | $s_\mathrm{geo}$ | 180 m² m⁻³ | **derived.** $6\phi_\mathrm{bt}/d$ for cubic grains of diameter $d$ = 2 mm, the same geometric convention used for the plagioclase in the dissolution table. Using one convention for both is what makes the two reactions comparable |
| Iron content | $f_\mathrm{FeO}$ | 0.011 | **measured.** Whole-rock FeO in USGS reference granites G-1, G-2, G-3 (0.0083–0.0116) |
| O₂ diffusivity, free water | $D_w$ | 2.1 × 10⁻⁹ m² s⁻¹ at 25 °C | **measured.** About twice silica's, O₂ being a small neutral molecule |
| Dissolved O₂ | $C_{eq}$ | 0.457 → 0.236 mol m⁻³ | **measured.** Air-saturated fresh water, 0 °C to 30 °C. Note the direction: a gas leaves solution as water warms |
| Water per rock volume | – | 678 | **derived.** $f_\mathrm{FeO}/(4V_\mathrm{FeO}C_{eq})$ at 12 °C; the 4 is four Fe(II) oxidised per O₂ |
| Activation energy | $E_a$ | **none** | **none has ever been measured** for this reaction. The model gives it none, so its whole temperature response is the O₂ solubility above |

Those give an oxidation length of 132 m, a Damköhler number of 0.023 over the
3 m section, and an O₂ penetration into intact rock of 4.5 cm.

### Running it: the same model, the other reaction

Set **Reaction** to *Biotite oxidation* and everything above still applies –
the same joints, the same flow field, the same advection, diffusion and
reaction. **One thing changes, and it changes the sign of everything.**

With feldspar the solute was a **product**. It started at zero, the rock made
it, and it accumulated until the water was full and the reaction stopped.
Weathering was limited by getting the product *away*.

Now the solute is a **reactant**. It arrives at its ceiling in the rain, the
rock consumes it, and the reaction stops where it runs out. Weathering is
limited by getting the reactant *in*.

That single swap is the concept worth carrying out of this exercise, because
it is everywhere: oxygen against organic matter in a river, a nutrient against
a waste product in a culture, a reactant front against a product front in any
porous medium. Ask of each: **is this limited by supply, or by removal?** The
Damköhler number answers it the same way in both cases.

Two things to watch for. Both run against the intuition that dissolution
builds.

1. **Turn the temperature up and the weathering slows down.** Oxygen is a
   *gas*, and gases leave solution as water warms – cold water carries
   0.457 mol m⁻³ of dissolved oxygen against 0.236 at 30 °C. There is no
   activation energy pushing the other way, because none has ever been
   measured for this reaction. (This does not say cold *places* weather more
   slowly. Rio Icacos gets four metres of rain a year, and water supply is a
   separate dial – try it.)
2. **The rind becomes a gradient, and the block interiors do not survive.**
   Dissolving, the joint cell goes to *all* while the core stays at *none* –
   at 30 % of the section reacted, 1.00 at the joint and 0.03 twenty
   centimetres in. Oxidising, the same comparison runs 0.58 to 0.25. Section 5
   is enough to work out why.

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
