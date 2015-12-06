# JavaScript Flows

The same behavior implemented in different _"flavors"_ of JavaScript.

## Behavior

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
      div.innerHTML += SPEC.getHtml(i, SPEC.errorContent)

    else
      div.innerHTML += SPEC.getHtml(i, fileContent)

# ¹ - optional
```

## Implementations

* [JavaScript (es5, sync)][js_sync]
* [JavaScript (es5, callbacks)][js_cbs]
* [JavaScript (es6, +promise)][js_promise]
* [JavaScript (es6, +yield)][js_yield]
* [JavaScript (es7, +async, +await)][js_es7]
* [CoffeeScript][cs]
* [Iced CoffeeScript][ics]
* [Literate CoffeeScript][lcs]

## Run
#### Online

Go to https://meedamian.com/js-flows

#### Locally

```bash
$ git clone git@github.com:chester1000/js-flows.git
$ cd js-flows
$ python -m SimpleHTTPServer 8008

# In browser open http://localhost:8008
```

## Usage

#### In Developer's Console <small>(`⌘⇧J` for Chrome on Mac)</small>:

```javascript
// Execute specific flow:
execute('sync'); // or
execute('iced'); // etc

// See available flows:
execute('help');

// enable | disable artificial, random delay for each file download
DELAY_ENABLED = true | false;
```

#### In browser

Press buttons to trigger execution of flows. First button enables/disables artificial delay.


## Notes

At the time of publish no browser supported ES7 async functions, so pre-compiled fallback is provided (and loaded automatically).

Babel command used:

```bash
# From repo root:
$ npm i -g babel
$ npm i babel-preset-stage-0
$ babel --presets stage-0 main.es7.js -o main.es7.babel.js
```


<!-- LEGEND (keep on bottom) -->
[js_sync]: main.sync.js
[js_cbs]: main.cbs.js
[js_promise]: main.promise.es6
[js_yield]: main.yield.es6
[js_es7]: js.es7.js
[cs]: main.coffee
[ics]: main.iced
[lcs]: main.litcoffee
