---
topic: fluvial

title: "Landscape steady state and tectonic uplift"
layout: single
permalink: /landscape-evolution/steady_state/

# Includes author profile in sidebar
author: Andrew Wickert
author_profile: true
---

*Over the long term, landscapes neither erode below sea level nor are they tectonically uplifted into outer space. Uplift increases slope; slope increases erosion. A steady-state landscape develops under constant uplift, in which the rate of rock uplift equals the rate of erosion of the landscape.*

## Learning Goals
* Know what a steady-state landscape is.
* Appreciate some of the implications of this common assumption.

## Landscape evolution and steady state

$$\frac{\partial z}{\partial t} = k_h \frac{\partial^2 z}{\partial x^2} - K A^m S^n + U$$

Recalling the definition of steady state (i.e., all time derivatives go to 0), the following holds true for a steady-state landscape:

$$0 = k_h \frac{\partial^2 z}{\partial x^2} - K A^m S^n + U$$

Let's rearrange this so that the uplift term, $$U$$, lies on the left-hand side of the equation. This can then help us to compare the rate of uplift to the landscape form:

$$U = K A^m S^n - k_h \frac{\partial^2 z}{\partial x^2}$$

First, let's consider the case in which there is **no uplift**. Then, let's unpack this into its **fluvial** and **hillslope** components to see how changes in uplift rate affect these.

### No uplift

Under a condition of no uplift ($$U=0$$), we obtain:

$$K A^m S^n = k_h \frac{\partial^2 z}{\partial x^2}$$

If there is any fluvial erosion at all, both sides of the equation will be positive. If the left-hand side of the equation is positive, it means that all hilltops will be **concave** -- there will be no round hills in this landscape! This is an unstable situation because there is no way to go from one drainage basin to another without creating at least a small, convex hilltop.

In nature, steady-state landscapes **do not exist without uplift**. Therefore, all river incision in a tectonically quiescent area (such as Minnesota and Wisconsin) is ***transient*** -- that is, out of steady state. This means that rivers are gradually carving into plateaus and reducing the overall elevation of the whole region, and will (if given enough time) eventually reduce it to a set of low, nondescript hills surrounded by lowland river valleys. However, significant topographic relief in regions of Africa and Brazil that have been tectonically inactive for hundreds of millions of years show that this process can be quite slow.

### Fluvial-system response to uplift

If we focus only on the fluvial system, we obtain the eqatuion:

$$U = K A^m S^n$$

Let's imagine that we are in a region:
* Experiencing steady, uniform uplift
* With a constant rock type and hydrology (such that $$K$$ is uniform)

Let's observe just a single reach of river with a constant drainage area. What do we notice?

Based on everything above that is held constant:

$$U \propto S^n$$

Qualitatively, this means that when all else is held constant, **uplift produces steep rivers**. And this makes sense, right? Uplift creates high topography, and the transition from this high topography to low topography is steep.

In a more process-based sense, in a steady-state landscape, rapid uplift must be met by rapid incision. If rock type and hydrology are constant, and if we are considering the same region (i.e., no substantial change in drainage-basin area), then the only way for the river to incise fast enough to keep up with uplift is through increasing its slope.

### Hillslope response to uplift

If we focus only on the hillslope system:

$$U = -k_h \frac{\partial^2 z}{\partial x^2}$$

If you think through the second derivative, you'll find that a concanve-up surface has a *positive* second derivative and that a concave-down surface has a *negative* second derivative.

![Second derivative test with smiley faces](http://www.pleacher.com/mp/mgifs/gifs7/faces.gif)

*Second derivative tests. See [Kori Proffitt's Calculus Blog](https://koriproffitt.wordpress.com/2013/11/04/second-derivative-finds-concavity/) for review.*

Since hilltops are like Mr. Frowny, the sign of the hilltop curvature cancels out the sign in front of the right-hand side of the equation.

Therefore, for a constant hillslope diffusivity ($$k_h$$, related to climate, land use, ecology, hillslope material, ...), a higher uplift rate will produce a more sharply curved hilltop. Think of a rounded hilltop in the Midwest compared to a steep, pointy mountain ridge! That's the idea.

<br/>
<br/>

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
