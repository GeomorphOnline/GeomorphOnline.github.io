---
topic: hydrology

title: "Rainfall--runoff board game: now virtual"
layout: single
permalink: /hydrology/rainfall-runoff-activity/

# Includes author profile in sidebar
author: AndyJabariShanti
author_profile: true
---

*Relatively little of the water in a river actually rains out onto it. Rather, it travels across and under the landscape to reach the stream.*

## Learning Goals

* Gain an intuition for how rainfall across a watershed turns into discharge out the river, becoming a hydrograph
* Become acquainted with Python code and Jupyter notebooks
* Become acquainted with the Landlab toolbox for Earth-surface modeling

## Help US help YOU

The Earth-surface research group is evaluating the usefulness of this activity -- now in virtual form -- for learning about catchment-scale hydrology and how rainfall produces river hydrographs. We are assigning participation points for performing the pre- and post-quiz surveys. We would appreciate your honest assessment; your evaluation of your own knowledge and that of the activity will have no impact on your grade (beyond the points in this assignment). We appreciate your time as we work to find better ways to manage online activities and learning!

## Background

In 2016 and 2019, Wickert used a board game with hex cells and counters (pennies work better than paper!) to teach about rainfall, runoff, and hydrographs. For 2020, Jabari Jones (Ph.D. candidadte at UMN) converted this game into an online activity using the [Python](https://www.python.org/) programming language, [Landlab](https://landlab.github.io/) toolkit for Earth-surface modeling, and [Jupyter](https://jupyter.org/), a tool for creating interactive and educational coding activities in a web browser.

## Pre-activity survey (5 points)

*The points awarded are solely for participation.*

<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdvBzSSA-xoYpcKwcdaBfwNZx_9ErAt8QCRWBeQAbpt7ZHk2w/viewform?embedded=true" width="640" height="1869" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

## The activity

[Link to rainfall--runoff "board game"](https://colab.research.google.com/drive/1TxPvv4lsNualcXC7c_jZj3DDlJvOYYj2?usp=sharing)

### Logistical items to check/know

* Make sure that your browser opens the activity in Google CoLab; it is created to work properly with the settings and code packages available there.
* Note that if you want to save your progress and return to it, you will have to save a copy of the Jupyter notebook in your own Google CoLab/Drive space.

### Running the Jupyter notebook

Jupyter notebooks provide an interactive way to link explanatory text and computer code. In order to run the different sections of the activity, which you should do in order, you will hit the "play" buttons next to each respective frame. Note that if you change something higher up in the notebook, you may have to re-run the remaining code between that section and the final section(s).

All of the code is in Python, and uses the Landlab toolkit. Your job is to observe what the code does, and to make small changes to test how they impact this simple computer model of a real physical system. This is the same approach taken by scientists using research-grade code when trying to build intuition surrounding a complicated problem.

### Questions

At the end of the Jupyter notebook lies a set of four questions. Here are their point values for this class and some helpful tips

1. **Plotting** (10 points). The [Matplotlib gallery](https://matplotlib.org/gallery/index.html) is a fantastic cookbook that I (Wickert) use whenever I have a concept in mind about a plot/graph to make and am not sure how to do it in code. It includes this ["Simple plot"](https://matplotlib.org/gallery/lines_bars_and_markers/simple_plot.html#sphx-glr-gallery-lines-bars-and-markers-simple-plot-py), which should be a good start.
2. (10 points, 5 per parameter). These predictions may be the same or may differ from those that you included in the survey.
3. (20 points, 10 per parameter).
    * Drainage density is set in the list of `river_cells` in code block 5. I have offered a couple commented-out (with `#`) examples that contain fewer river-channel cells.
    * Catchment size and shape can be set in code block 2, under `#create a grid`.
    * The subsurface water storage capacity is set by `subsurface_array` in code block 3. It is the number after the comma, and before the final paren, in the same units of water volume (thickness in the cell) that we use throughout.
    * Rainstorm: The depth of water initially applied to the landscape is set in code block 7. If you want to get fancy, you can change its spatial distribution by editing which cells within the grid have water. This may require slightly more coding than some other options.
    * You should feel free to edit other parameters as well; in any case, just explain what you changed and your rationale for doing so.
4. (10 points). This is free-form, for you, based on what you have learned.

## Post-activity survey (5 points)

*The points awarded are solely for participation.*

<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSey29EI0nA2z1gNw15G8-4iuZHo_jbIyPcCptIJEUVlYK8i2g/viewform?embedded=true" width="640" height="2682" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
