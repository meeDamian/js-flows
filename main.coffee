'use strict'
# NOTE: Outer wrapper is added by the compiler

# TODO: chunks order is still NOT guaranteed
# TODO: Add comments

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

processList = (cb) -> (err, response) ->
  return cb null if err
  cb JSON.parse response

obtainFile = (cb) -> (path, i) ->
  i++
  download path, (err, res) ->
    return cb null, i if err
    cb res, i

exportable = (div) ->
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

window.versions['coffee'] = exportable
