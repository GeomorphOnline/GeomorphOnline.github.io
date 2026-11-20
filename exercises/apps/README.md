# Compiled exercise applications

Built artifacts, not source. Each `*.html` / `*.js` pair here is a model
compiled to WebAssembly by [artesian](https://github.com/MNiMORPH/artesian);
the `*.whl` files are the Python wheels the page installs in the reader's
browser via Pyodide.

**The wheels are shared by every exercise in this directory.** `panel` and
`bokeh` are together about 35 MB and are what makes that worth doing: paid
once here, they would otherwise be paid once per exercise. Adding a second
exercise costs roughly 30 KB, not 35 MB. Keep new exercises in this same
directory for that reason.

To rebuild, or to add another:

```sh
pip install artesian
artesian build path/to/your_app.py -o exercises/apps \
    -p path/to/model -p path/to/artesian \
    -r numpy --strip-wheels --strip-vendored
```

**`-p` is `append`, and an app that imports `artesian.live` needs TWO of
them** -- one for your model, one for artesian itself. Miss the second and the
build succeeds, the page loads, Pyodide starts, and the demo dies in the
reader's console with `ModuleNotFoundError: No module named 'artesian'`. The
wheel sitting in this directory is not enough; it has to be in the page's
install list, which is set by `-p` at build time.

This happened on 2026-09-06: a rebuild followed the command as written here,
which had only one `-p`, and shipped a demo that could not start. Check it
afterwards, the same way you check the strip flags:

```sh
grep -o "micropip.install(\[[^]]*\])" exercises/apps/<app>_panel.js
```

`grlp_panel` is the exception that needs only one: it predates `artesian.live`
and hand-rolls its own play/pause.

**Keep both strip flags on every rebuild.** They are not an optimization to
apply once: `artesian` re-downloads and re-hosts `panel` and `bokeh` on each
build, so a single rebuild that omits them replaces the 11.5 MB of wheels here
with 36.9 MB of full ones. Nothing warns, and the only symptom is every
reader's first visit quietly getting three times larger. Check with
`ls -l exercises/apps/*.whl` afterwards.

artesian pins `panel` and `bokeh` to whatever versions the build environment
has, so a rebuild does not silently pull new 35 MB wheels into git history.
Upgrading them is a deliberate act.

## artesian-embed.js

Emitted by every build and **shared by every exercise here**, like the panel and
bokeh wheels. It sizes each demo's frame to its content and, above the app's
design width, scales the demo rather than stretching it. A page embeds an
exercise with

```html
<link rel="stylesheet" href="/exercises/apps/artesian-embed.css?v=HASH">
<iframe src="/exercises/apps/<app>.html" data-artesian
        data-design-width="900" height="530" scrolling="no"></iframe>
<script src="/exercises/apps/artesian-embed.js?v=HASH"></script>
```

`?v=` is the first eight characters of the file's SHA-1, and **must be bumped
whenever a rebuild changes these two files**. GitHub Pages serves them with
`max-age=600` and gives no way to set a header, so without it a reader who
visited in the last ten minutes silently gets the old script. That failure is
indistinguishable from a fix not working, and it cost most of a morning here,
twice.

`height` should be the demo's measured height at its design width: it is what
the reader looks at while ~60 MB of Pyodide arrives, since the script cannot
replace it until the app has rendered.

The stylesheet is not optional and has to come first. The script cannot size a
frame whose document has not loaded, and these demos pull about 60 MB of
Pyodide before that happens; without the stylesheet the reader spends that
whole time looking at the browser's default iframe, about 300 px wide,
stretched to the fallback height. That is what "stuck loading" looked like.

and nothing else. Both pages used to carry their own copy of that logic, about
ninety lines each, which is how they both came to have the same bug: an iframe
at `width: 100%` runs off the side of the page on an iPad, because every
browser there is WebKit underneath and WebKit sizes an iframe to its content.
No desktop engine shows it. Rebuilding any app here rewrites the script and
fixes every exercise at once.

The design width is read from a `DESIGN_WIDTH` constant in the app's source and
recorded in its compiled page, AND carried on each frame as
`data-design-width`. Two places on purpose, and the attribute wins: the script
cannot read the compiled page while the exercise page lays itself out, because
an iframe starts on a blank document, and on WebKit -- every browser on an iPad
-- that is what it sees. Without the attribute the demo is never scaled.

## A rebuilt wheel keeps its name, and browsers keep the old one

**Open hazard. It bit twice on 2026-09-04 and will bite every reader after
every redeploy that does not change a version number.**

A model wheel here is named from its version — `hillcreep-0.1.0.dev0-py3-none-any.whl`
— and that version does not move between builds. GitHub Pages serves wheels
with `cache-control: max-age=600`, so a reader who has the page open, or who
returns within ten minutes, reinstalls the **previous** wheel under the same
name and runs the old model. Verified: the wheel deployed at `9bf2313` and the
one at `d268d9a` have identical filenames and different bytes, and the older one
reproduces exactly the behavior a reader reported as a bug in the new one.

There is nothing in the page, the console or the model output to say so. The
only tell is behavior that does not match the source.

**Rule out the model before blaming the cache, and vice versa.** On 2026-09-04
both happened within an hour and looked identical from the page: first a stale
wheel serving a superseded transport rule, then a genuine defect where the
model's derived state lagged a slider. A hard reload distinguishes them — but
a *soft* refresh, including in a private window that has already loaded the
page once, does not.

**A `?v=` cache-buster does not work here**, unlike the one on
`artesian-embed.js`. The compiled page passes wheels to `micropip.install` as
requirement *strings*, and micropip decides "this is a wheel URL rather than a
package name" by testing whether the string ends in `.whl`. Append `?v=hash`
and that test fails, so micropip would try to resolve the whole thing as a
package name on PyPI. Checked, not assumed.

### The rule: bump the model's version on every deploy

Changing the **filename** is what works, because micropip parses name and
version out of it, and `artesian build` prunes the superseded wheel by itself.
So:

> **Before rebuilding a model into this directory, bump its version** — even
> if nothing else changed. For `hillcreep` that is `src/hillcreep/_version.py`.

It failed twice on 2026-09-04, escalating each time. First it shipped a
superseded transport rule to a reader who reported it as a bug. Then it broke a
brand-new demo outright: the scarp app raised `ImportError: cannot import name
'Scarp'` because the cached wheel predated the module. **The deployed wheel was
correct both times.** Only the filename was wrong, and nothing anywhere said
so.

A hard reload rescues one reader. Bumping the version rescues all of them, and
is the only thing that does.

## The shared panel wheel is stripped, and is not PyPI's

`panel-1.9.4-py3-none-any.whl` here is **not** the file
`pip install panel==1.9.4` gives you, although it carries that name. Files no
browser executes have been removed with `artesian`'s `--strip-wheels`:

```
panel   source maps, .ts sources, its own test suite, and its dist bundles
        1167 files      30.33 MB -> 9.43 MB
bokeh   its static/js bundles
          13 files       6.41 MB -> 1.95 MB
```

**Self-hosted payload: 36.85 MB -> 11.48 MB**, for every exercise at once,
since the wheels are shared.

The large part of that is the JavaScript each package vendors: 96 % of panel's
wheel and 78 % of bokeh's, against 0.6 and 0.7 MB of Python. **A compiled demo
never loads it.** The page takes bokeh from `cdn.bokeh.org` and `panel.min.js`
from `cdn.holoviz.org`, and contains no reference to `panel/dist` or
`static/js` at all -- those bundles exist for serving a page yourself, which is
the one thing a compiled demo does not do. `artesian` checks that premise
against the built app rather than trusting it, and refuses to strip if any app
reaches into those directories.

No Python was removed, and each wheel's `METADATA`, `WHEEL` and `RECORD` are
intact. Each says so for itself, in its own
`*.dist-info/ARTESIAN-STRIPPED.txt`.

Recorded here because a filename that asserts a provenance its contents do not
have is exactly the trap described in the section above, and the reason the
GRLP demo once shipped a dirty working tree under a release version. If you
rebuild these apps *without* `--strip-wheels`, a fresh 30.33 MB `panel` wheel
will replace this one and the saving is silently lost.

## Provenance

Record what each application was built from, so a result a student reports can
be reproduced years later. A wheel's version number is not sufficient evidence
on its own: a build from a modified working tree carries the same version as the
release it was branched from, and is indistinguishable by filename.

### grlp_panel — gravel-river long profile

| | |
|---|---|
| model | [GRLP](https://github.com/MNiMORPH/GRLP) **v2.1.0** (tag), the release `pip install grlp` gives |
| application source | GRLP `master` @ `8eced81` (`interactive_demo/grlp_panel.py`) |
| built | 2026-09-02 |
| panel / bokeh | 1.9.4 / 3.9.2 |

| browser requirements | `numpy`, `scipy` |

Verified at build time: every module in the shipped wheel is byte-identical to
the `v2.1.0` tag.

`networkx` is deliberately *not* requested. GRLP gained its river-network code
after v2.1.0, so the tagged release neither imports it nor declares it as a
dependency; asking for it made every reader download about 1 MB of wheel that
was never used.

### corestone_panel — why a corestone survives

| | |
|---|---|
| model | [corestone](https://github.com/MNiMORPH/corestone) `master` @ `b60d07b` (no release yet) |
| application source | corestone `master` @ `b60d07b` (`interactive_demo/corestone_panel.py`) |
| artesian | `main` @ `f28c9f4`, shipped as a wheel because the app imports `artesian.live`. The tree was one commit further on at `c3d7c2b`, which adds only a CI workflow and nothing under `src/`, so the wheel is the pushed commit's and that is what is recorded |
| built | 2026-09-22 (rebuilt: the unjointed case is solved as a single column, because solved as a grid the reactive-infiltration instability amplifies rounding error into fingers whose width follows the mesh) |
| panel / bokeh | 1.9.4 / 3.9.2 |
| browser requirements | `numpy`, `scipy` |

Built from a clean tree at a pushed commit, checked with `git status` before
building. There is no tagged release to build from yet, so the commit is the
provenance; `pip install corestone` does not give a reader the same code.

`artesian` is shipped here, which `grlp_panel` does not do: that app predates
`artesian.live` and hand-rolls its own play/pause. Anything written from
`examples/hillslope.py` imports `artesian.live` and needs the wheel, or it
dies in the browser with `ModuleNotFoundError`.

**That sentence used to read "every parameter in the corestone model is a
placeholder, none is measured", and it is no longer true.** Every parameter in
both reactions and in the flow now comes from a measurement or from geometry;
the module docstring lists the sources. The one number taken from an
observation rather than derived is labeled a calibration where it appears.

What a reader should still discount is the OXIDATION timescale rather than its
mechanism: no activation energy has ever been measured for oxidation of
structural Fe(II) by dissolved O2, and the two candidate rate constants differ
by a factor of four thousand. The dissolution side is sourced end to end.

(This was the third copy of that stale sentence found on 2026-09-06. The
others were in the module docstring and in the demo's own blurb.)

### hillcreep_panel — hillslope diffusivity, taken apart

| | |
|---|---|
| model | [hillcreep](https://github.com/MNiMORPH/hillcreep) `master` @ `00d1f91`, version 0.1.0.dev4 (no release yet) |
| application source | hillcreep `master` @ `00d1f91` (`interactive_demo/hillcreep_panel.py`) |
| artesian | `main` @ `afe857e`, shipped as a wheel because the app imports `artesian.live` |
| built | 2026-09-04 (rebuilt: rivers drawn as direction arrows) |
| panel / bokeh | 1.9.4 / 3.9.2 |
| browser requirements | `numpy` |
| design width / measured height | 900 px / 903 px |

Built from a clean tree, checked with `git status` before building (0 modified
files). The measured height moved from 860 to 903 px when the equilibrium
button and the read-out added a control row and a line of text; re-measure
after any change that adds or removes a row, since the page's `height`
attribute is what a reader looks at for the whole 70 MB load.

**That gap is closed.** Until 2026-09-04 this row named a commit that existed
only on one machine, so nobody could fetch `00d1f91` and confirm what a student
had run. `hillcreep` is now published at
<https://github.com/MNiMORPH/hillcreep>, and every commit named here is
fetchable. There is still no tagged release, so the commit is the provenance
and `pip install hillcreep` does not give a reader the same code.

`numpy` is the only browser requirement. The model deliberately does not import
`scipy` — the whole solver is one explicit second difference — which saves the
reader about 16 MB relative to the other two exercises.

This build did **not** change `artesian-embed.js` or `artesian-embed.css`: both
are byte-identical to the versions the other exercises reference, so the `?v=`
hashes in all three pages still match and nothing needed bumping. It did
rewrite `artesian-0.1.0.dev0-py3-none-any.whl`, whose *contents* are identical
to the committed copy (checked by unzipping both and diffing — the difference
is zip timestamps only), so that rewrite was deliberately left uncommitted.

The e-folding depth and the surface creep velocity are read off Roger Hooke's
Bevens Creek profiles, reproduced on the exercise page from his course notes.
That figure is unpublished teaching material rather than a paper, so it carries
no citation — worth knowing if it is ever reused elsewhere.

**No number this model produces is a rate for any particular hillslope.** The
defaults are chosen so that the surface creep velocity lands inside the range
that has actually been measured, which is a weaker claim than being calibrated
to a site, and the exercise says so.

### drlp_panel - a detachment-limited river long profile

| | |
|---|---|
| model | [DRLP](https://github.com/MNiMORPH/DRLP) `master` @ `932b3b3`, version 0.1.0.dev6 (no release yet) |
| application source | DRLP `master` @ `932b3b3` (`interactive_demo/drlp_panel.py`) |
| artesian | not shipped: the app hand-rolls its own play/pause and does not import `artesian.live`, so it is `grlp_panel`'s case and needs only one `-p` |
| built | 2026-10-28 (rebuilt: the base-level bar tracks base level while locked) |
| panel / bokeh | 1.9.4 / 3.9.2 |
| browser requirements | `numpy`, `scipy` |
| CI | `tests.yml`, Python 3.9 through 3.13, green on the first run |
| design width / height | 900 px / 1030 px. Still an estimate rather than a pixel measurement, but Andy drove the `0.1.0.dev6` build on 2026-10-29 and judged it good, so it reads correctly in practice. Re-measure if a change adds or removes a control row |
| **issued to students** | **`0.1.0.dev6`, declared the problem-set version on 2026-10-28.** `DRLP/PSET_VERSION` records it and the deploy script warns before superseding it, because `artesian build` prunes the wheel it replaces |
| version history | `0.1.0.dev0` deployed 2026-10-17, `0.1.0.dev1` and `0.1.0.dev2` 2026-10-27, `0.1.0.dev3` and `0.1.0.dev4` through `0.1.0.dev6` 2026-10-28. Bumped by `deploy_geomorphonline.sh --bump` on every redeploy, because the filename is the only cache-buster a wheel has |

Built from a clean tree, checked with `git status` before building (0 modified
files) by `DRLP/deploy_geomorphonline.sh`, which refuses a dirty tree for
exactly the reason this file gives.

**The provenance gap is closed.** DRLP was published at
<https://github.com/MNiMORPH/DRLP> on 2026-10-28, public and GPL-3.0-or-later,
so every commit named here is fetchable and a reader's result can be traced to
the code that produced it. `932b3b3`, the problem-set build, resolves there.
There is still no tagged release, so the commit is the provenance and
`pip install drlp` does not give a reader the same code.

`HANDOFF.md`, the AI build brief this model was written from, is not in the
published HEAD. It remains in the repository's earlier history.

**The page runs: Andy loaded and drove the `0.1.0.dev0` build on 2026-10-27,
which retires the open question of whether a compiled DRLP page works at all.**
What that validated is the whole chain - `artesian build`, the shared stripped
wheels, the iframe embed, Pyodide pulling `scipy` for the general-`n`
root-find, and the install list.

**A warning for anyone rescaling an axis from Python here.** `figure()`
returns a `DataRange1d`, which auto-ranges to the renderers' data **in the
browser**. Setting its `start` and `end` from Python does not govern what is
drawn, and reading them back returns only what Python last wrote -- so
headless tests of a tracking axis pass while the deployed page ignores it
entirely. That happened on 2026-10-28: eight slider combinations times four
hundred frames reported zero clipped frames against a page whose axis never
followed the profile. Replace the range with an explicit `Range1d`, as
`hillcreep_panel` does, and assert the TYPE rather than the values.

**Reviewed in a browser and approved.** Andy drove the `0.1.0.dev6` build on
2026-10-29: "The demo looks good to me." That retires the last open item on
this entry. The 1030 px height is still an arithmetic estimate rather than a
pixel measurement -- `grlp_panel`'s measured 760 px plus two sliders and a
longer blurb -- so re-measure if a later change adds or removes a control row.
Too tall shows as dead space below the demo; too short makes the frame jump
when the app finishes loading.

`scipy` is a browser requirement here, unlike `hillcreep`'s `numpy` alone,
because the general-`n` case needs a root-finder: `scipy.optimize.brentq` on a
bracket the model proves rather than samples. At `n = 1` the node update is
closed-form and scipy is never called, but the wheel still has to be there.

This build did **not** change `artesian-embed.js` or `artesian-embed.css`: both
are byte-identical to the versions the other exercises reference, so every
page's `?v=` hash still matches and nothing needed bumping. It did rewrite the
shared `panel` and `bokeh` wheels; their contents were checked by unzipping
both and diffing (identical, zip timestamps only) and the committed bytes were
restored, so this deploy leaves them untouched in git.

**The exercise task is deliberately not written.** The page describes the
equation and what each control does. What to vary and what to explain belongs
to whoever sets the work.

### scarp_panel — dating a fault scarp

| | |
|---|---|
| model | [hillcreep](https://github.com/MNiMORPH/hillcreep) `master` @ `00d1f91`, version 0.1.0.dev4 (no release yet) |
| application source | hillcreep `master` @ `00d1f91` (`interactive_demo/scarp_panel.py`) |
| artesian | `main` @ `5a7c1ed`, shipped as a wheel because the app imports `artesian.live` |
| built | 2026-09-04 |
| panel / bokeh | 1.9.4 / 3.9.2 |
| browser requirements | `numpy` |
| design width / measured height | 900 px / 835 px |

Companion to `hillcreep_panel`: the same transport law with different edges —
no rivers, no flux across either end, so the scarp's volume is constant. Shares
the `hillcreep` wheel with the hillslope exercise, so it adds about 30 KB.

Both exercises now live on **one page**,
`_pages/exercises/hillslope-creep.md`, with the scarp first because it is the
simpler boundary problem. That means a reader can boot **two Pyodide runtimes
in one tab**, so both frames carry `loading="lazy"` and the second does not
start until they scroll to it. Verified with both frames on one page: the
shared `artesian-embed.js` sizes both correctly (835 and 903 px design heights
scaled to 1021 and 1104 at a 1100 px column) with no console errors.

The two apps are built from the same wheel, so **rebuilding either one
rebuilds the model both of them run**. After changing the model, rebuild and
re-verify *both*; the hillslope demo was re-driven in a browser after the
refactor that introduced this one, for exactly that reason.

### lem_panel - a landscape of streams and hillslopes

| | |
|---|---|
| model | `lemdemo` 0.1.0.dev5, from `~/models/landscape-evolution-demo` @ `cb1b406`. A local repository with no remote and no release, so this commit is not yet fetchable by a reader |
| application source | the same repository @ `cb1b406` (`interactive_demo/lem_panel.py`) |
| Landlab | 2.11.0, built as a WebAssembly wheel for Pyodide 0.29.3 by `~/models/landlab-pyodide` @ `2c5f142` (`./build.sh`). sha256 `1f73905196a1eb1597e24c1ebc93ad585c63f9182a8d97f39de661b306c35eb2`, 3,791,630 bytes. Landlab publishes wheels for Linux, macOS, and Windows only, and Pyodide does not carry it |
| artesian | not shipped: the app hand-rolls its own play/pause and does not import `artesian.live`, so it is `grlp_panel`'s case and needs only one `-p` |
| built | 2026-11-20 |
| panel / bokeh | 1.9.4 / 3.9.2 |
| browser requirements | `numpy`, and the Landlab wheel above, named with `-r` after copying it into this directory. micropip resolves the rest: contourpy, scipy, pandas, matplotlib, statsmodels, and xarray from Pyodide, bmipy and requireit from PyPI |
| design width / measured height | 900 px / 1206 px (document `scrollHeight` in headless Chrome at 900 px wide for the seventh build; 1188 px for the fifth and sixth; 1190 px for the fourth; 1167 px for the third; 1060 px for the first two, which had three plots) |
| version history | `0.1.0.dev0` built 2026-11-20 @ `456027a`, and rebuilt the same day @ `a6dc18c` under the same version. The rule above was not broken: the first build was never pushed, so no reader holds its wheel. Pushed 2026-11-20. `0.1.0.dev1` built 2026-11-20 @ `0ca7d16`: four plots, the channel–hillslope transition, the hillcrest by a shift-click or a held press, Landlab's logo, and the code review's changes. Pushed 2026-11-20. `0.1.0.dev2` built 2026-11-20 @ `41a7a73`: a speed slider, and checkboxes for the line ∇²z = 0 and for the ridgelines. Pushed 2026-11-20. `0.1.0.dev3` built 2026-11-20 @ `1597026`: a channels checkbox, and the interface reorganized (controls in a box, checkboxes as color keys above the map, no plot toolbars, the four frames on one grid). Pushed 2026-11-20. `0.1.0.dev4` built 2026-11-20 @ `6a6af74`: every plot has a fixed outer size, and the rows wrap in a frame narrower than 900 px. Pushed 2026-11-20. `0.1.0.dev5` built 2026-11-20 @ `cb1b406`: channels colored by Strahler order with a halo on the chosen stream, the drainage density, and a shift-click that takes the nearest crest. The next build bumps the version |

Built from a clean tree: the two modules and the logo in the shipped `lemdemo`
wheel are byte-identical to `cb1b406`. The wheel is 50,922 bytes, sha256
`5e6a09277f5ae3fe035d1153bdbc972d1b5d6a0eaaef251e211071d447efb60b`.

    cp ~/models/landlab-pyodide/dist/landlab-2.11.0-cp313-cp313-pyodide_2025_0_wasm32.whl exercises/apps/
    cd ~/models/landscape-evolution-demo
    artesian build interactive_demo/lem_panel.py -o <this directory> -p . \
        -r numpy -r landlab-2.11.0-cp313-cp313-pyodide_2025_0_wasm32.whl \
        --strip-wheels --strip-vendored

Measured on 2026-11-20 in Chrome, served from this directory on localhost, on
the first build (`456027a`):

- **The browser gives the native answer.** Paused at 364 kyr (182 steps of
  2000 yr at the defaults), the trunk profile read from the page had 125 nodes,
  a head at 149.56258899711793 m, and elevations summing to
  5353.783785073139 m; the same run in native Python printed
  149.56258899711793 and 5353.783785073138.
- **30 frames per second**, the rate the app asks for, at the defaults and at
  the slowest slider corner (K = 1 × 10⁻⁵ /yr, D = 0.40 m²/yr).
- **First load, fresh profile: 15.0 s** from navigation to the live document,
  and 67.3 MB by Content-Length, 49.0 MB of it from cdn.jsdelivr.net and
  15.3 MB from this directory. A second load on a warm cache took 14.6 s: on a
  fast connection the wait is Python importing, not the download.
- **Inside the embed** at a 1100 px column the frame scales by 1.222 with no
  console errors.

Measured on the second build (`a6dc18c`) the same day, in Chrome on localhost:

- **A click on the map reaches Python three ways.** A click chose the stream, a
  shift-click the hill crest, and a right-click the hill crest, with the
  browser's own menu staying shut over the map. Bokeh has no event for the
  right mouse button and stops `contextmenu` at the plot, so the page listens
  for it on the document in the capture phase. A listener in the bubble phase
  never fires.
- **One frame costs 5.4 ms in native Python**, against 3.6 ms for the model
  step alone (mean of 100 frames at the defaults, with a stream and a crest
  picked). Not timed in the browser.

Measured on the third build (`0ca7d16`) the same day, in headless Chrome on
localhost, served with the `panel`, `bokeh`, and Landlab wheels as committed
here:

- **A click chooses the stream and a shift-click the hillcrest; on a touch
  screen, a tap and a 0.9 s press.** A click on the map's legend, which covers
  5.8 % of the map, chooses the stream under it.
- **30.21 frames per second** over 8 s at the defaults, with 15.19 patch
  messages per frame.
- **A Pause clicked 0.3 s after the first Run is answered after 0.56 s**, and
  after 0.78 s with each model step padded to 40 ms.
- The only console error is the local server's missing `favicon.ico`.

Measured on the fourth build (`41a7a73`) the same day, in headless Chrome on
localhost, built into a scratch directory and copied here (`lem_panel.html`,
`lem_panel.js`, and the `lemdemo` wheel):

- **30.26, 30.20, 30.20, and 30.45 frames per second** over 8 s each at the
  defaults and full speed, with no box checked, ridgelines, the transition
  line, and both.
- **At 4192 kyr the transition line has 3805 vertices and the ridgelines 805
  pieces**, in the worker and in the page. The ridgelines are the divides
  between the basins of the streams that start at 100 cells (0.04 km²) of
  drainage area, less the pieces whose two streams lie on one flow path.
- A click and a shift-click with both boxes checked choose the stream and the
  hillcrest as before.
- The only console error is the local server's missing `favicon.ico`.

Measured on the fifth build (`1597026`) the same day, in headless Chrome on
localhost, built into a scratch directory and copied here:

- **26.80 to 30.43 frames per second** over 8 s each at the defaults and full
  speed, for the eight settings of the three checkboxes and the first again.
- **At the defaults the channels are 1464 links**, each from a channel node to
  its receiver. A channel starts where the drainage area is at least 4 cells
  (1600 m²) and ∇²z ≥ 0, and every node below it is channel.
- **The four frames are 330 px wide.** Their left edges are at 62 px in the
  left column and 545 px in the right; their tops are at 285 px in the upper
  row and 705 px in the lower.
- A click and a shift-click with every box checked choose the stream and the
  hillcrest. The only console error is the local server's missing
  `favicon.ico`.

The sixth build (`6a6af74`) answers a report from an iPad lying flat, where
this page zooms the frame (1.09 at a 1024 px viewport, 1.37 at 1366): "the
panels end up shrinking and disassociating from the click locations." **It is
not reproduced and the fix is not confirmed:** WebKit would not start on the
build machine, and in Chrome with touch the fifth build's taps landed where
they should at every iPad size. What the sixth build changes, measured in
headless Chrome on localhost:

- **In a 784 px frame (an iPad held upright, no zoom) the four plots keep
  their size, one to a row**, and the document is 2024 px tall. The fifth
  build squeezed them from 462 and 433 px to 405 and 379.
- **At 900 px the layout is the fifth build's**: the same frame edges, and
  1188 px tall.
- 30.20 to 30.26 frames per second in the settings read; a click and a
  shift-click choose the stream and the hillcrest.

Measured on the seventh build (`cb1b406`) the same day, in headless Chrome on
localhost and in native Python:

- **30.19 to 30.45 frames per second** over 8 s each for the sixteen settings
  of the four checkboxes.
- **At the defaults and 1200 kyr the channels' Strahler orders run from 1 to
  4** (885, 238, 180, and 161 links) and **the drainage density is
  8.68 km/km²**: the summed length of the channel links over the area of the
  core nodes. Finding the orders takes 0.85 ms in native Python.
- **A shift-click takes the nearest crest.** Over a click on every core node,
  the crest was a median of 60 m from the click; the walk uphill that the
  earlier builds used put it a median of 140 m away.

**Landlab's imports are the download.** By the Pyodide 0.29.3 lock file the
largest wheels it brings are scipy (13.26 MB), statsmodels (8.48 MB),
matplotlib (6.72 MB), and pandas (4.49 MB).

No build has changed `artesian-embed.js` or `artesian-embed.css`: both
are byte-identical to the committed versions. The third build did rewrite
`panel-1.9.4-py3-none-any.whl` and `bokeh-3.9.2-py3-none-any.whl` with one zip
timestamp changed in each and every member's CRC and size unchanged; those two
rewrites are not committed, so the deployed wheels are the bytes that were
already here.

`artesian build` runs the app in the building environment, which here was the
system Python 3.12.3 (panel 1.9.4, bokeh 3.9.2, numpy 1.26.4) with Landlab
2.11.0 on the path from another project's virtual environment. A build
environment of its own is still to be made.

Do not hand-edit anything here except this file.
