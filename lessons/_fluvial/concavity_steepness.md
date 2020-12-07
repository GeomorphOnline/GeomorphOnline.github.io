---
topic: fluvial

title: "Hack's Law, channel concavity, the steepness index, and river-profile analysis"
layout: single
permalink: /fluvial/concavity_steepness/

# Includes author profile in sidebar
author: Andrew Wickert
author_profile: true
---

*We can decribe river and drainage basin geometry in a way that links to the stream-power law for bedrock incision.*

## Learning Goals
* Learn how drainage-basin area and river discharge relate via Hack's Law.
* Know the definitions of steepness and concavity index for river systems.

## Hack's Law

Hack's Law relates river-channel length, $l$, to drainage area, $$A$$. It might be obvious that a longer river should necessitate a larger drainage basin!

$$l \propto A^h$$

Here, $$h$$ is Hack's exponent, and commonly has a vlaue of 0.5--0.6. Let's think about the shapes of drainage basins that would cause Hack's exponent to be small vs. close to 1.

![Hack's figure](https://topotoolbox.files.wordpress.com/2020/04/hackslaw.png?w=705)

*Hack (1957) defined the drainage-area-to-mainstem-channel-length relationship. For more information, check out the [Topo Toolbox blog post](https://topotoolbox.wordpress.com/2020/04/12/calculating-hacks-law-using-topotoolbox/)*

The exponent, $$h$$, is obtained by a curve fit with data from natural landscapes.

![Bhutan Hack's Law](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-018-06210-4/MediaObjects/41467_2018_6210_Fig1_HTML.png?as=webp)

*Hack's Law describes the relationship between the length of the longest river in a catchment and the drainage-basin area. This data set from [Sassolas-Serrayet et al. (2018)](https://www.nature.com/articles/s41467-018-06210-4) shows how it holds true across the Bhutanese Himalaya.*

Rivers in more humid climates tend to be fed by more groundwater, leading to wider angles between tributaries. This leads to broad, branching drainage networks and a greater increase in dranage-basin area than in arid systems, which are fed by overland flow that produces river systems that flow more parallel to one another.

![USA Hack's Law as a function of climate](https://royalsocietypublishing.org/cms/asset/2b87c479-f23a-4b1e-b941-a2c8bb019b4c/rspa20180081f01.jpg)

*From [Yi et al. (2018)](https://royalsocietypublishing.org/doi/10.1098/rspa.2018.0081).*


## Channel steepness and concavity

Most channels have a concave-up long-profile shape, but even if they don't, it is useful to find a way to characterize their concavity. In terms of downstream coordinates, one might characterize channel concavity in terms of the $$x$$ (downstream) and $$z$$ (bed elevation) coordinates as:

$$\text{Concavity} = \frac{\mathrm{d}^2 z}{\mathrm{d} x^2}.$$

However, geomorphologists define a separate *concavity index* that relates to drainge-basin area, which as you now know, also relates to distance downstream. We define a slope--area relationship as:

$$S = k_s A^{-\theta}.$$

Here, $$S$$ is channel slope, $$k_s$$ is a steepness index, and $$theta$$ is the concavity index.

**Steepness index** indicates whether a channel is unexpectedly steep or gentle in slope when compared to its drainage area. We expect channel slopes to decrease wtih drainage-basin area.

**Concavity** is positive for a concave-up channel, negative for a convex-up channel, and 0 for a channel with a constant slope. (I can write this because of the Hack's Law relationship between channel distance downstream and channel concavity.)

![Anderson & Anderson](/assets/images/fluvial/13_GR01_slope_area_concavity.jpg)

*This figure, reproduced from the Anderson & Anderson Geomorphology textbook, shows the relationship between drainage-basin area, slope, and concavity. The log of channel steepness index would be the $$y$$ intercept on this plot. To see how this works, take the log of both sides of the equation above.*


## Steepness and river long profiles

![Boulton 2013 modified](/assets/images/fluvial/long_profile_steepness_concavity_boulton.png)

*Modified from Boulton et al. (2013)*

* The slopes of hillsides and debris-flow channels are unchanging with respect to drainage area. Panels A and B indicate this.
* A knickpoint -- a sudden break (increase) in slope in the river long profile, is represented by an increase in the steepness index. Such a knickpoint may represent a different lithology or climate or the response of a river to some tectonic uplift event.


## Steepness, uplift, and stream power

The stream-power law has a similar form to the slope--area relationship that defines channel concavity:

$$\dot{\varepsilon} = K A^m S^n.$$

Recall that $$\dot{\varepsilon}$$ is vertical erosion (i.e., incision) rate, and that $$K$$ is erodibility (related primarily to lithology, climate, and hydrology).

Let's turn this into a landscape-evolution equation by including tectonic uplift, $$U$$:

$$\frac{\mathrm{d} z}{\mathrm{d} x} = -K A^m S^n + U.$$

We'll next posit that we are at ***topographic steady state***: that is, erosion equals uplift everywhere:

$$U = K A^m S^n.$$

With some algebra, we can rearrange this into a form similar to that of the slope--area relationship:

$$\frac{U}{K} = A^m S^n$$

$$S^n = \frac{U}{K} A^{-m}$$

$$S = \frac{U}{K} A^{-m/n}$$

The finding here is profound.

The **concavity index** is equal to $$m/n$$, and tells us about these terms in the stream-power erosion law.

$$\theta = \frac{m}{n}$$

The **steepness index** increases with uplift rate and decreases with erodibility. Rapidly uplifting hard rock requires the steepest channels to erode at a pace that is comparable to the rest of the river system.

$$k_s = \frac{U}{K}$$

Therefore, we expect **knickpoints**, steep zones in rivers, to occur where **rocks are hard** and/or **tectonic uplift is fast**.

If we also have a geological map, we can control for the effects of lithology, and thereby relate river-profile shapes to rates of tectonic uplift.


<br/>
<br/>

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
