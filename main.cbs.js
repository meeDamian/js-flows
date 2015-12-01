// ES5 version using Callbacks
window.versions['cbs'] = (function() {
  'use strict';

  // TODO: chunks order is not guaranteed
  // TODO: Add comments

  function download(path, cb) {
    var req = new XMLHttpRequest();

    req.onload = function() {
      if (req.status !== 200)
        return cb(Error(req.statusText));

      cb(null, req.responseText);
    };

    req.onerror = function() {
      cb(Error('Network Error'));
    };

    req.open('GET', path);
    req.send();
  }

  return function(div) {
    function complete(html) {
      div.innerHTML = html;
    }

    download(SPEC.file, function(error, content) {
      if (error) {
        console.error('list DL failed', error);
        complete('list DL failed')
        return;
      }

      var list = JSON.parse(content);
      var results = [];

      list.forEach(function(path, i) {
        download(path, function(error, content) {
          i++;
          if (error) {
            console.error('file(' + i + ') DL failed');
            content = SPEC.errorContent;
          }

          results.push(SPEC.getHtml(i, content));

          if (results.length === list.length)
            complete(results.join('\n'));
        });
      });
    });
  };
})();
