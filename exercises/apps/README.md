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
artesian build path/to/your_app.py -o exercises/apps -p path/to/model -r numpy \
    --strip-wheels --strip-vendored
```

**Keep both strip flags on every rebuild.** They are not an optimisation to
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
reproduces exactly the behaviour a reader reported as a bug in the new one.

There is nothing in the page, the console or the model output to say so. The
only tell is behaviour that does not match the source.

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
| model | [corestone](https://github.com/MNiMORPH/corestone) `master` @ `6caa3fa` (no release yet) |
| application source | corestone `master` @ `6caa3fa` (`interactive_demo/corestone_panel.py`) |
| artesian | `main` @ `afe857e`, shipped as a wheel because the app imports `artesian.live` |
| built | 2026-09-04 (rebuilt: loading indicator on Show) |
| panel / bokeh | 1.9.4 / 3.9.2 |
| browser requirements | `numpy`, `scipy` |

Built from a clean tree at a pushed commit, checked with `git status` before
building. There is no tagged release to build from yet, so the commit is the
provenance; `pip install corestone` does not give a reader the same code.

`artesian` is shipped here, which `grlp_panel` does not do: that app predates
`artesian.live` and hand-rolls its own play/pause. Anything written from
`examples/hillslope.py` imports `artesian.live` and needs the wheel, or it
dies in the browser with `ModuleNotFoundError`.

**Every parameter in the corestone model is a placeholder.** None is measured.
The exercise teaches the mechanism; no number it produces is a rate.

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

Do not hand-edit anything here except this file.
