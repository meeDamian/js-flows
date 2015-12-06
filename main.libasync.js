SPEC.register('libasync', (function() {
  'use strict';

  var script = document.createElement('script');
  script.src = 'lib/async.min.js';
  document.head.appendChild(script);

  return function exposed(div) {
    var download = getDownloader('callback');

    download(SPEC.file, function(err, list) {
      if (err || !list) {
        console.error('list DL failed', err);
        div.innerHTML = 'list DL failed';
        return;
      }

      function downloadFile(file, cb) {
        download(file, function(err, content) {
          if (err) {
            content = SPEC.errorContent;
            console.error('file DL failed');
          }
          cb(null, content);
        });
      }

      async.map(JSON.parse(list), downloadFile, function(err, results) {
        div.innerHTML = results.map(SPEC.getHtml).join('\n');
      });
    });
  }
})());
