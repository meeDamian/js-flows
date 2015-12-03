# NOTE: Outer wrapper is added by the compiler
'use strict'

# TODO: chunks order is still NOT guaranteed

download = getDownloader 'callback'

processList = (cb) -> (err, response) ->
  return cb null if err
  cb JSON.parse response

obtainFile = (cb) -> (path, i) ->
  i++
  download path, (err, res) ->
    return cb null, i if err
    cb res, i

# EXPOSED
window.versions['coffee'] = (div) ->

  complete = (html) ->
    div.innerHTML = html

  download SPEC.file, processList (list) ->
    unless list
      console.error 'list DL failed'
      complete 'list DL failed'
      return

    results = []
    list.forEach obtainFile (content, i) ->
      unless content
        console.error "file(#{i}) DL failed"
        content = SPEC.errorContent

      results.push SPEC.getHtml i, content

      if list.length is results.length
        complete results.join '\n'
