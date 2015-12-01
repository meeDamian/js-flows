// ES5 version using Callbacks
window.versions['cbs'] = (function() {
  'use strict';

  // TODO: Add comments

  function download(path, cb) {
    var req = new XMLHttpRequest();

    req.onload = function() {
      if (req.status !== 200)
        return cb(2);

      cb(null, req.responseText);
    };

    req.open('GET', path);
    req.send();
  }

  function prepareHtml(arr) {
    return arr.join('\n');
  }

  return function(div) {
    download(SPEC.file, function(error, content) {
      if (error) {
        console.error(error);
        return;
      }

      var list = JSON.parse(content);
      var results = [];

      list.forEach(function(path, i) {
        download(path, function(error, content) {
          if (error)
            content = SPEC.errorContent;

          results.push(SPEC.getHtml(i + 1, content));

          if (results.length === list.length)
            complete(prepareHtml(results));
        });
      });

      function complete(html) {
        div.innerHTML = html;
      }
    });
  };
})();
