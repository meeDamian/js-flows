// ES5 version using Callbacks
window.versions['cbsasync'] = (function() {
  'use strict';

  function download(path, cb) {
    var req = new XMLHttpRequest();
    req.onload = function() {
      if (req.status !== 200) {
        return cb(Error(req.statusText));
      }
      cb(null, req.responseText);
    };
    req.onerror = function() {
      cb(Error('Network Error'));
    };
    req.open('GET', path);
    req.send();
  }

  function downloadFilesFromList(content, cb) {
    var list = JSON.parse(content);
    var prepareItem = function(item, cb) {
      return download(item, function(err, content) {
        return cb(null, (err ? SPEC.errorContent : content));
      });
    }

    async.map(list, prepareItem, cb);
  }

  return function(div) {
    async.seq(download, downloadFilesFromList)(SPEC.file, function(err, results) {
      if (err) {
        console.log('Error', err);
      }
      var i = 1;
      results.map(function(elem) {
        div.innerHTML += SPEC.getHtml(i++, elem);
      });
    });
  }

})();
