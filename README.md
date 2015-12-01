# JS DIVERSITY

The same behavior implemented in different _"flavors"_ of JavaScript.

#### Behavior

Each implementation:

1. exposes one function that takes one argument `div` - a reference to DOM node to be populated.
1. populates `div` with contents of files listed in `data/list.json` proxied through `SPEC.getHtml()` function

```coffeescript
## pseudocode ##
execute = (div) =>
  list = download('data/list.json')
  if error
    console.error('list DL failed', error¹)
    div.innerHTML = 'list DL failed'
    return

  # must keep list.json order
  for(index, fileContent of list)
    if error
      console.error("file(#{index}) DL failed", error¹)
      div.innerHTML += SPEC.getHtml i, SPEC.errorContent

    else
      div.innerHTML += SPEC.getHtml i, fileContent

# ¹ - optional
```

#### Implementations

* [JavaScript (es5, sync)][js_sync]
* <small>**[WIP]**</small> [JavaScript (es5, callbacks)][js_cbs]
* [JavaScript (es6, +promise)][js_promise]
* <small>**[WIP]**</small> [JavaScript (es6, +yield)][js_yield]
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
[js_promise]: main.promise.es6
[js_yield]: main.yield.es6
[js_es7]: js.es7.js
[cs]: main.coffee
[ics]: main.iced
[lcs]: main.litcoffee
