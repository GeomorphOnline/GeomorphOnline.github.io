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

Do not hand-edit anything here except this file.
