# ATAG Research Report

Source files for the IDRC's research report on AI and the Authoring Tool
Accessibility Guidelines.

## Usage

This project takes a [Typst](https://typst.app) [source file](index.typ) and a
[Haygriva](https://github.com/typst/hayagriva) [bibliography file](bibliography.yml)
and produces HTML and PDF output (via [typst-wasm](https://github.com/typst-wasm/typst-wasm))
and Word document output (via [pandoc-wasm](https://github.com/pandoc/pandoc-wasm)).

The Typst source and Hayagriva bibliography can be edited using the included
[Sveltia CMS](https://sveltia.app) instance (locally at <http://localhost:8080/admin/>
or on the deployed site at <https://atag-report.pages.dev/admin/>). A live
preview is provided for the Typst source using
[typst-wasm](https://github.com/typst-wasm/typst-wasm) in a web worker.

For included commands, see the configured [npm scripts](package.json).
