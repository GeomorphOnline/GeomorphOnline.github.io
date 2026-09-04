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
artesian build path/to/your_app.py -o exercises/apps -p path/to/model -r numpy
```

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

## Provenance

Record what each application was built from, so a result a student reports can
be reproduced years later. A wheel's version number is not sufficient evidence
on its own: a build from a modified working tree carries the same version as the
release it was branched from, and is indistinguishable by filename.

### grlp_panel — gravel-river long profile

| | |
|---|---|
| model | [GRLP](https://github.com/MNiMORPH/GRLP) **v2.1.0** (tag), the release `pip install grlp` gives |
| application source | GRLP `master` @ `aae1560` (`interactive_demo/grlp_panel.py`) |
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
| model | [corestone](https://github.com/MNiMORPH/corestone) `master` @ `81156d1` (no release yet) |
| application source | corestone `master` @ `81156d1` (`interactive_demo/corestone_panel.py`) |
| artesian | `main` @ `afe857e`, shipped as a wheel because the app imports `artesian.live` |
| built | 2026-09-04 (rebuilt: matrix transport corrected; 1 kyr/frame) |
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
| model | hillcreep `master` @ `b905c68` (no release, **and no remote — see below**) |
| application source | hillcreep `master` @ `b905c68` (`interactive_demo/hillcreep_panel.py`) |
| artesian | `main` @ `afe857e`, shipped as a wheel because the app imports `artesian.live` |
| built | 2026-09-04 |
| panel / bokeh | 1.9.4 / 3.9.2 |
| browser requirements | `numpy` |
| design width / measured height | 900 px / 860 px |

Built from a clean tree, checked with `git status` before building (0 modified
files).

**Provenance gap, stated rather than glossed: `hillcreep` has no git remote.**
The commit above is real and the tree was clean, but it exists only on Andy's
machine, so nobody else can fetch `b905c68` and confirm what a student ran.
Every other entry in this file names a commit that is at least *fetchable*.
Pushing the repository closes this; until then the provenance is a local
commit, which is weaker than it looks.

`numpy` is the only browser requirement. The model deliberately does not import
`scipy` — the whole solver is one explicit second difference — which saves the
reader about 16 MB relative to the other two exercises.

This build did **not** change `artesian-embed.js` or `artesian-embed.css`: both
are byte-identical to the versions the other exercises reference, so the `?v=`
hashes in all three pages still match and nothing needed bumping. It did
rewrite `artesian-0.1.0.dev0-py3-none-any.whl`, whose *contents* are identical
to the committed copy (checked by unzipping both and diffing — the difference
is zip timestamps only), so that rewrite was deliberately left uncommitted.

**No number this model produces is a rate for any particular hillslope.** The
defaults are chosen so that the surface creep velocity lands inside the range
that has actually been measured, which is a weaker claim than being calibrated
to a site, and the exercise says so.

Do not hand-edit anything here except this file.
