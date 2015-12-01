# JS DIVERSITY

The same behavior implemented in different _"flavors"_ of JavaScript.

#### Behavior

1. Download `data/list.json`,
1. Download all files listed in it,
1. Add contents of all files to `#container` in separate `<p>`<small>s</small>,
1. return `(download failed)` for a file that fails to DL.

#### Implementations

* [JavaScript (es5, sync)][js_sync]
* <small>**[WIP]**</small> [JavaScript (es5, callbacks)][js_cbs]
* [JavaScript (es5, promises)][js_promises]
* <small>**[WIP]**</small> [JavaScript (es6, +yield)][js_es6]
* <small>**[WIP]**</small> [JavaScript (es7, +async, +await)][js_es7]
* <small>**[WIP]**</small> [CoffeeScript][cs]
* <small>**[WIP]**</small> [Iced CoffeeScript][ics]
* <small>**[WIP]**</small> [Literate CoffeeScript][lcs]

### See online

Go to https://meedamian.com/js-diversity

### Run Locally

    $ git clone git@github.com:chester1000/js-diversity.git
    $ cd js-diversity
    $ python -m SimpleHTTPServer 8008

    # In browser open http://localhost:8008

[js_sync]: main.sync.js
[js_cbs]: main.cbs.js
[js_promises]: main.promises.js
[js_es6]: main.es6
[js_es7]: js.es7.js
[cs]: main.coffee
[ics]: main.iced
[lcs]: main.litcoffee
