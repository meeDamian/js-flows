# Outer wrapper is added by the compiler
'use strict'

# EXPOSED
window.versions['iced'] = (div) ->
  download = getDownloader 'callback'

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
