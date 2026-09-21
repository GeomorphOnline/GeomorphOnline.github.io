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
  input from tectonics, fixed before weathering starts.
- **Infiltration rate** sets how fast rain is delivered.
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
– and the two are taken apart in [the last part of this
page](#what-actually-goes-first-iron-in-biotite). Leave it on *Feldspar
dissolution* for now.

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

Two exercises run on the same model. The in-class one is below. The problem
set uses the **Reaction** control to switch the model to a different reaction,
and its brief is [at the end of this page](#problem-set-what-changes-and-why).

### In class: what does it do?

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
- **Infiltration.** More rain, or less?
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
collide on one letter. **$K_\mathrm{sat}$ is hydraulic conductivity, and $k$ is
a reaction rate constant.** They have nothing to do with each other.

| symbol | meaning | units |
|---|---|---|
| $q$ | specific discharge (Darcy flux) | m s⁻¹ |
| $K_\mathrm{sat}$ | saturated hydraulic conductivity | m s⁻¹ |
| $h$ | hydraulic head | m |
| $n$ | porosity, 0 to 1 | – |
| $C$ | concentration of the reacting solute | mol m⁻³ |
| $C_{eq}$ | the ceiling on $C$ | mol m⁻³ |
| $c$ | normalised concentration, $C/C_{eq}$ | – |
| $k$ | dissolution rate constant, per unit mineral surface | mol m⁻² s⁻¹ |
| $A$ | reactive mineral surface area per rock volume | m² m⁻³ |
| $\dot{N}$ | reaction rate per rock volume | mol m⁻³ s⁻¹ |
| $r$ | reaction coefficient, $kA/C_{eq}$ | s⁻¹ |
| $D$ | effective diffusion coefficient in the rock, $D_w/\theta$ | m² s⁻¹ |
| $D_w$ | diffusion coefficient in free water | m² s⁻¹ |
| $N_0$ | moles of reactive mineral per m³ of fresh rock | mol m⁻³ |
| $M$ | fraction of reactive mineral remaining | – |
| $X$ | extent of reaction, $1-M$ (what the colour bar shows) | – |
| $\tau$ | volumes of water needed per volume of rock | – |
| $\theta$ | tortuosity: how much the pore path lengthens diffusion | – |
| $L$ | saturation length | m |
| $E_a$ | activation energy | J mol⁻¹ |
| $\Delta H_r$ | enthalpy of the reaction that sets the ceiling | J mol⁻¹ |
| $T$ | absolute temperature | K |
| $t$ | time | s |
| $R$ | universal gas constant, 8.314 | J mol⁻¹ K⁻¹ |

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
three. Rain enters the **top** at a prescribed rate, which the infiltration
slider sets. The **base** drains freely. The **sides** wrap onto each other,
so nothing enters or leaves there.

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
\;+\; \underbrace{\dot{N}\,\Delta x\,\Delta z}_{\text{reaction}}
\;=\; \underbrace{\frac{\partial (nC)}{\partial t}\,\Delta x\,\Delta z}_{\text{storage}}$$

- $qC$, solute carried along by flowing water (the water flux, times what that
  water is carrying). It is a flux, in mol m⁻² s⁻¹, which is why it needs a
  face length to become a rate. Faces perpendicular to $z$ have length
  $\Delta x$; faces perpendicular to $x$ have length $\Delta z$. Both are
  written $\Delta x$ above for brevity.
- $-D\nabla C$, **Fick's law**: spreading runs down the concentration gradient,
  from more to less, which is what the minus sign is doing.
- $\dot{N}$, what the rock gives up per unit volume. (The dot marks a rate: a
  stock $N$ being drawn down. $N_0$, below, is the stock it starts from.)
- $nC$, the solute sitting in storage, since only the pore fraction holds water.

Divide every term by $\Delta x\,\Delta z$, so that each is now per unit volume,
and let the box shrink. Each in-minus-out per unit volume is by definition a
divergence:

$$-\nabla\cdot(qC) + \nabla\cdot(D\nabla C) + \dot{N} = \frac{\partial (nC)}{\partial t}$$

Now drop the storage term. You should know why you are allowed to, because it
is the one approximation in this derivation. Water
crosses this section in years, and the rock takes hundreds of thousands.
The solute field therefore settles into its balance long before the rock it is
dissolving has measurably changed. Furthermore, dropping storage is what removes porosity from the transport
equation. ($n$ has not left the page. It still sets how much faster the water
itself moves than $q$ does, which the dispersion term uses. It is gone from
the balance being solved.)

Setting the right-hand side to zero and multiplying through by $-1$:

$$\nabla\cdot(qC) - \nabla\cdot(D\nabla C) = \dot{N}$$

In words: what the water carries away, plus what spreads away, equals what the
rock gives up. Every term is in mol m⁻³ s⁻¹.

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

The moles the water gained are the moles the rock lost:

$$N_0\,\frac{\partial M}{\partial t} = -\dot{N}$$

- $N_0$, the moles of solute the fresh rock can release, per cubic metre
  (about 4,800 here). Counting the *solute* rather than the mineral is what
  makes this balance 1:1: one plagioclase formula unit releases several
  silicons, and $N_0$ has already done that multiplication.
- $M$, the fraction of it still there (1 when fresh, 0 when gone).
- The minus sign, because the rock loses what the water gains.

That is the whole model. Everything below is about $\dot{N}$.

### 4. The reaction, one: feldspar dissolution

Plagioclase dissolving into water is the textbook case, and it is the one the
in-class exercise runs:

$$\dot{N} = k(T)\,A\,\left(1 - \frac{C}{C_{eq}}\right)$$

- $k(T)$, the **dissolution rate constant**: how fast this mineral reacts per
  unit of its own surface, in water carrying nothing. It belongs to the
  *mineral*, and it is measured in the laboratory and tabulated (for
  plagioclase, by Palandri and Kharaka, 2004). Writing it $k(T)$ only says that
  it depends on temperature.
- $A$, how much of that surface the water can actually reach, per cubic metre
  of rock.
- $(1 - C/C_{eq})$, the **affinity**: how far the water is from being finished.
  It is 1 in fresh water, and 0 at saturation.

That bracket is the whole idea of this exercise. Rock does not survive because
it is tough. It survives because the water that reached it had already finished
working – and everything you watch the demo do follows from that one factor
going to zero.

**Temperature enters this equation twice**, in two different places, and the two
do completely different jobs.

*First, in the rate constant.* A reaction has an energy barrier to clear, and
warming gives molecules more energy to clear it with. More of them make it
over. The reaction speeds up steeply, because the effect is exponential, and
the **Arrhenius equation** puts a number on it:

$$k(T) = k_0 \exp\!\left(-\frac{E_a}{R\,T}\right)$$

- $E_a$, the **activation energy**: the height of that barrier. (The taller it
  is, the more temperature matters.)
- $k_0$, the **pre-exponential factor**: the rate with no barrier at all. It
  sets the scale, and $E_a$ sets the sensitivity.
- $T$ sits in the denominator of the exponent. Warm it and the exponent gets
  less negative, which makes $k$ larger.

*Second, in the ceiling.* Dissolving is itself a reaction with a heat of its
own, and it either takes heat in or gives heat out. Warm a reaction that
absorbs heat and you push it further along – which here means driving more
mineral into solution, and lifting the ceiling. That is Le Chatelier's
principle. The **van 't Hoff equation** is its quantitative form, applied to
the equilibrium constant (which for a saturating solid is the solubility
itself):

$$C_{eq}(T) = C_0 \exp\!\left(-\frac{\Delta H_r}{R\,T}\right)$$

- $\Delta H_r$, the **enthalpy of the reaction** that sets the ceiling: the
  heat it takes in or gives out. Positive means dissolution absorbs heat, and
  warming therefore raises the ceiling. (Negative means the reverse, and warming lowers
  it. Quartz is positive, which is why this section's ceiling climbs.)
- $C_0$, a reference scale, playing the part $k_0$ plays above.

Do not confuse the two. Arrhenius makes the rock dissolve faster *where it
stands*, while van 't Hoff does not speed the reaction at all – it raises the
ceiling, and each litre therefore carries more away before it has to stop. One
is about speed, the other about capacity.

Now test that against your own intuition. Move your temperature slider and
watch the section. **Raising
the temperature does not simply make weathering proportionally faster**, and
which of the two effects you are watching depends on where the water is and how
far it has already got.

### 5. What stops a reaction

Everything above assumed the solute is something the rock **makes**. The
problem set runs a reaction where it is something the rock **consumes**, and
the difference is structural rather than chemical:

$$\dot{N} = -\,k_{ox}\,A\,C$$

- $k_{ox}$, the oxidation rate constant, in **m s⁻¹**. Note the units: it is
  not $k$, which is mol m⁻² s⁻¹. A first-order reaction multiplies a
  concentration rather than standing alone, so its constant has to carry
  different units to land on the same mol m⁻³ s⁻¹.
- $C$, dissolved oxygen. (Notice there is **no bracket**. That is the point.)
- **The minus sign**, which is the structural change. $\dot{N}$ was defined as
  what the rock gives *up*. Here the rock takes oxygen *out* of the water, so
  the same symbol has to go negative.

Dissolving, the solute is a **product**. It starts at zero, the rock makes it,
and it piles up until the water is full and the reaction stops. Oxidising, it
is a **reactant**. It arrives at its ceiling in the rain, the rock consumes it,
and the reaction stops where it runs out.

Three things flip, then, and no more: the driving force from $(1-c)$ to $c$,
the sign of $\dot{N}$ from source to sink, and the concentration of the water
arriving at the top from 0 to its ceiling. **The transport equation itself does
not change at all** – same advection, same diffusion, same conservation. That
is what makes the two reactions one model rather than two.

Carry this away if you carry nothing else:

> A reaction stops when the water can no longer do work. It gets there two
> ways – **the reactant runs out, or the product fills up.** Ask of any
> weathering system which of the two it is.

The reaction itself, the evidence that it goes first in a real granite, and
how to run it are all in
[the biotite section](#what-actually-goes-first-iron-in-biotite) at the end of
this page.

### 6. Two length scales and one ratio

Divide through by $C_{eq}$ so that concentration runs from 0 to 1:

$$\nabla\cdot(q c) - \nabla\cdot(D \nabla c) = r\,(1 - c), \qquad r \equiv \frac{k A}{C_{eq}}$$

- $c = C/C_{eq}$, the normalised concentration.
- $r$, the **reaction coefficient**: how fast undersaturation gets used up
  (units of s⁻¹, and the flux has cancelled out of it).

**The saturation length.** How far does water travel before it is spent?

$$L = \frac{q}{r} = \frac{q\,C_{eq}}{k\,A}$$

Here $L = 0.46$ m. It is not a distance at which equilibrium is reached ($c$
approaches 1 asymptotically, and never arrives) – after one $L$, the
undersaturation is down to $1/e$ of what it was.

Look at what $L$ is built from. It grows with flux and shrinks with
reactivity, and because it goes as $C_{eq}/k$, it takes its temperature
dependence from the *difference* $(E_a - \Delta H_r) = 36.9$ kJ mol⁻¹ rather
than from $E_a$ alone. That difference is the **apparent activation energy of
weathering**. It is what a field study measuring rate against temperature
actually recovers (and it is not $E_a$, which is the trap).

**The water requirement.** How many volumes of saturated water strip one volume
of rock?

$$\tau = \frac{N_0}{C_{eq}}$$

Here $\tau \approx 48{,}000$. The plagioclase in a cubic metre of granite needs
forty-eight thousand cubic metres of saturated water to leave. That number, and
not the rate constant, is why weathering is slow. (On oxygen the same rock
needs about 680, which is why oxidation can pace a process that dissolution
cannot.)

**The ratio.** Divide the depth of the section by the saturation length and you
have the **Damköhler number**, which counts the e-foldings of saturation a
parcel of water goes through on its way down:

$$\mathrm{Da} = \frac{\text{depth}}{L}$$

- **Da ≫ 1, saturation-limited.** Water fills up long before it runs out of
  rock. Weathering happens where fresh water arrives, and nowhere else.
- **Da ≪ 1, reaction-limited.** Water crosses barely touched, and the rate
  constant sets the pace everywhere at once.

The section sits firmly in the first limit at Da = 6.6, and the water leaving
its base is within 0.14 % of saturation. That is what shelters a block
interior. (Run the same section on oxygen instead and Da drops to 0.02, which
puts it in the *other* limit and shelters corestones a different way. The
problem set takes that apart.)

Two different mechanisms, then, and both come out as *the water never got
there*. Note also that Da is a depth over a length, which tells you about how
much rock you are looking at rather than about the rock itself: view the same
granite one metre at a time and you get Da = 2.2.

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
is what a saprolite looks like. Hold the conductivity fixed instead (as this
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

**Not calibrated to any particular granite**, and no number here should be
read as a measurement of one. Every parameter below is either measured
elsewhere or derived from the mineralogy, but the granite they describe is a
generic one and the section they run in is drawn rather than surveyed.

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
| Water per rock volume | $\tau_\mathrm{ref}$ | 47 744 | **derived.** $N_0/C_{eq}$: 4774 mol Si m⁻³ of rock, over quartz saturation. $N_0$ counts *silicon released*, not formula units of plagioclase, which is what lets the rock and solute balances be 1:1 |
| Aqueous diffusivity | $D$ | 1.0 × 10⁻⁹ m² s⁻¹ at 25 °C | **measured**, and of the right species: dissolved silica (Rebreanu et al. 2008; Wollast & Garrels 1971). Scaled by Stokes–Einstein |
| Matrix tortuosity | $\theta$ | 10⁴ → 10 | **measured range.** The factor by which the connected pore path lengthens and constricts diffusion relative to free solution, $D_\mathrm{eff} = D_w/\theta$. Written $\theta$ because $\tau$ is already the water requirement above; the literature uses $\tau$ for both. 10⁴ in intact crystalline rock, 10 in saprolite at ~30 % porosity; interpolated with $M$, like the conductivity |
| Dispersivity | $\alpha$ | 2 mm | **the grain diameter.** Mechanical dispersion per unit pore velocity, $D_\mathrm{mech} = \alpha\lvert v\rvert$; $\alpha$ measures the spread of flow-path velocities, which at the pore scale is set by the grain size |

**$k_0$ and $C_0$ are not in the table because the model never evaluates
them.** Both equations above are written in the textbook form, with an absolute
pre-exponential factor, but nothing here needs one: every rate is taken
relative to the reference state, so what enters the arithmetic is
$k(T)/k(T_\mathrm{ref})$ and $C_{eq}(T)/C_{eq}(T_\mathrm{ref})$, in which
$k_0$ and $C_0$ cancel. The model therefore has a *normalisation* where a
research model would need an absolute solubility, which is why $C_{eq}$ never
appears on its own anywhere in the code, only ever as a ratio.

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

Three things to watch for. All three run against the intuition that
dissolution has just built.

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


### Problem set: what changes, and why

Set **Reaction** to *Biotite oxidation*, and read this whole section first.
The transport is identical to the dissolution version. The chemistry is not,
and several of the answers come out the other way round.

*(To be written.)*

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
