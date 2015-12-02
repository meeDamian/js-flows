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

# EXPOSED
window.versions['iced'] = (div) ->
  await download SPEC.file, defer err, list
  if err
    console.error 'list DL failed'
    div.innerHTML = 'list DL failed'
    return

  contents = []
  await for file, i in JSON.parse list
    download file, defer err, contents[i]

  div.innerHTML = contents
    .map (txt, i) ->
      i++

      unless txt
        console.error "file(#{i}) DL failed"
        txt = SPEC.errorContent

      SPEC.getHtml i, txt
    .join '\n'
