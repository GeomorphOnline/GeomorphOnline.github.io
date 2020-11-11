---
topic: fluvial

title: "Bedrock rivers and detachment-limited erosion"
layout: single
permalink: /fluvial/detachment_limited_erosion/

# Includes author profile in sidebar
author: Andrew Wickert
author_profile: true
---

*Bedrock rivers, and rivers with cohesive beds, evolve via detachment-limited erosion.*

## Learning Goals
* Know the mechanisms of bedrock erosion
* See how a basic shear-stress-based approach may work (or may not) for cohesive material

## Generic detachment-limited erosion rule

A generic rule for detachment-limited erosion has the form:

$$\dot{\varepsilon} = k (\tau_b - \tau_c)^a$$

where $$\dot{\varepsilon}$$ is erosion rate, $$k$$ is a coefficient that relates stress to erosion rate, $$\tau_b$$ is basal shear stress, and $$\tau_c$$ is the critical shear stress to overcome the cohesive forces holding the material together. $$a$$ is a power-law exponent that is empirically fit; in the simplest case, $$a = 1$$.

### Detachment-limited erosion in steady, uniform flow

Recalling that for steady, uniform flow:

$$\tau_b = \rho g h S$$

where $\rho = 1000$ kg/m<sup>3</sup> is water density, $$g$$ is acceleration due to gravity, $$h$$ is flow depth, and $$S$$ is channel slope, we can write:

$$\dot{\varepsilon} = k (\rho g h S - \tau_c)^a$$

### Further simplifications

For many cohesive materials, such as clays and soils, a linear approximation can suffice:

$$\dot{\varepsilon} = k (\rho g h S - \tau_c)$$

Therefore, here, $$k$$ has units of distance per stress per time. In base SI units, this is m<sup>2</sup> s kg<sup>-1</sup>. You can then use this to intuit the kind of shear resistance to particle detachment that a material will have before it begins to erode.

### Useful for soils, not so much for bedrock

The above equation works for erosion of conehsive soils and clays, but bedrock is so strong that the basal shear stress will not often approach the value at which pieces of the bedrock can start to be detached. Therefore, it requires either:
* Abrasion with clasts -- particle impacts scouring bedrock.
* Quarrying -- wholesale removal of blocks. (This can be aided by clasts that "wedge" the blocks, or in very large flows or with very fractured bedrock, can be similar to the initiation of sediment motion and transport in an alluvial river.)

Both are described in the video lecture immediately below.

## Bedrock erosion and its mechanisms

<iframe width="560" height="315" src="https://www.youtube.com/embed/SsawtdXRHoA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br/>
<br/>

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
