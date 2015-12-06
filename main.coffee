# NOTE: Outer wrapper is added by the compiler
'use strict'

# TODO: chunks order is still NOT guaranteed

download = getDownloader 'callback'

processList = (cb) -> (err, response) ->
  return cb null if err
  cb JSON.parse response

obtainFile = (cb) -> (path, i) ->
  download path, (err, res) ->
    return cb null, i if err
    cb res, i

exposed = (div) ->
  download SPEC.file, processList (list) ->
    unless list
      console.error 'list DL failed'
      div.innerHTML = 'list DL failed'
      return

    results = {}
    list.forEach obtainFile (content, i) ->
      unless content
        console.error "file(#{i}) DL failed"
        content = SPEC.errorContent

      results[i] = SPEC.getHtml content, i

      if list.length is Object.keys(results).length
        div.innerHTML = (line for _, line of results).join '\n'


window.versions['coffee'] = exposed
