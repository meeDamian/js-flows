### Intro

This implementation is identical to [Iced CoffeeScript](main.iced). The only difference is in source code, where this version is also a valid markdown document.


## Code

    'use strict'
    exposed = (div) ->

First, get reference to the correct downloading function (in this case the one with `callbacks`) provided by [download.js](lib/download.js) file.

      download = getDownloader 'callback'

Fire download of the first file: `['JSON', 'list']` containing paths of all other files.

      await download SPEC.file, defer err, list

Gracefully handle error in case the download have failed:

      if err
        console.error 'list DL failed'
        div.innerHTML = 'list DL failed'
        return

Create array to-be-filled with results from the loop below

      contents = []

For each file listed in the array, fire a new download and save result into a proper place in the array.

      await for file, i in JSON.parse list
        download file, defer err, contents[i]

Take the array of contents and map it.

      div.innerHTML = contents
        .map (txt, i) ->

Empty `txt` variable here indicates error, in which case console is notified, and content is replaced with the default one.

          unless txt
            console.error "file(#{i}) DL failed"
            txt = SPEC.errorContent

Finally, return HTML-prettified text, and join the array of entries with a new line character.

          SPEC.getHtml txt, i
        .join '\n'

Register itself to UI and user-accessible console.

    SPEC.register 'litcoffee', exposed
