# Outer wrapper is added by the compiler

'use strict'

# Callback-style XMLHttpRequest wrapper
download = (path, cb) ->
  req = new XMLHttpRequest()
  req.onload = ->
    if req.status isnt 200
      cb Error req.statusText
      return

    cb null, req.responseText

  req.onerror = ->
    cb Error 'Network Error'

  req.open 'GET', path
  req.send()

# [exposed] takes DOM element and fills it with content
window.versions['iced'] = (div) ->

  # download the list
  await download SPEC.file, defer err, list
  if err
    console.error 'list DL failed'
    div.innerHTML = 'list DL failed'
    return

  # download all chunks and put them into an array
  contents = []
  await for file, i in JSON.parse list
    download file, defer err, contents[i]

  # once we have everything put it into DOM
  div.innerHTML = contents
    .map (txt, i) ->

      # notify about missing file and use a fallback value instead
      unless txt
        console.error "file(#{i}) DL failed"
        txt = SPEC.errorContent

      # proxy files through getHtml fn to get them in a right form
      SPEC.getHtml i+1, txt
    .join '\n'
