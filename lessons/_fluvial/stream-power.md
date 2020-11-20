---
topic: fluvial

title: "The stream-power law and detachment-limited river long-profile evolution"
layout: single
permalink: /fluvial/stream-power/

# Includes author profile in sidebar
author: Andrew Wickert
author_profile: true
---

*Bedrock river evolution can be modeled to occur via transfer of potential energy form flowing water into mechanical energy breaking down the bedrock and kinetic energy carrying pieces of it away.*

## Learning Goals
* Relate potential, kinetic, and mechanical energy in bedrock streams
* Understand how power -- the rate of energy conversion -- relates to bedrock erosion
* Know the general form of the stream-power law, as is commonly used throughout fluvial geomorphology

## Derivation

[This is my derivation (in PDF)](/assets/notes/07_StreamPower_Derivation_Explanation.pdf), written in xournal++, as it appears after creating all of the video lectures.

## Video lectures

This derivation is thorough and involves significant exposition about how energy and power can be related to erosion rates. I split it across five videos in order to keep chunks a bit more self-contained and hopefully (you can be the judge) avoid YouTube fatigue.

### 1. Energy

Potential energy is converted into kinetic and mechanical energy as water flows downhill. This kinetic energy can then relate to erosion of bedrock.

<iframe width="560" height="315" src="https://www.youtube.com/embed/P3CnEy4fJSg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 2. Deriving stream power

Here, I derive the basic form of stream power,

$$\Omega = \rho g Q S,$$

by setting stream power to equal the rate of potential energy conversion (to kinetic + mechanical energy) across a unit distance, $$\Delta x$$, down a channel. The rate of this conversion is given simply by the flow velocity times the channel slope, which converts this velocity into its vertical component, $$\bar{u} S$$.

I also define the "unit stream power", or stream power per unit width,

$$\omega = \rho g \frac{Q}{b} S.$$

This normalization over width then provides a form that can be combined directly with expressions for erosion rate.

<iframe width="560" height="315" src="https://www.youtube.com/embed/kqUNVgn3tZE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 3. Relationship to shear stress

Prior to these videos, I often spoke of shear stress as what causes erosion and sediment transport. Here I show the tight relationship between shear stress and stream power. In particular:

$$\omega = \tau_b \bar{u},$$

and through the Darcy--Weisbach equation,

$$\omega = \frac{\tau_b^{3/2}}{\sqrt{\rho C_f}}.$$

<iframe width="560" height="315" src="https://www.youtube.com/embed/KJtsxt5d1JU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 4. Relating stream power to erosion rate

If some constant fraction of the stream power is converted to kinetic energy, we can write:

$$\dot{\varepsilon} = k_\epsilon \omega.$$

Here, $$k_\epsilon$$ provides an erosional efficiency. It increases as more energy is consumed in eroding and transporting pieces of bedrock, and therefore becomes higher as the amount of mechanical energy required to fracture and remove rock decreases.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_ax9Ii_aU7g" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### 5. Deriving the stream-power law as commonly used

By applying relationships to relate river discharge to drainage-basin area and channel width to river discharge (and hence, also to drainage-basin area), I provide a derivation of the common form of the stream-power law:

$$\dot{\varepsilon} = k A^m S^n.$$

<iframe width="560" height="315" src="https://www.youtube.com/embed/erlhgz3kc80" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<br/>
<br/>

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
