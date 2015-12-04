window.versions['libasync'] = (function() {
  'use strict';

  return function(div) {
    var download = getDownloader('callback');

    download(SPEC.file, function(err, list) {
      if (err || !list) {
        console.error('list DL failed', err);
        div.innerHTML = 'list DL failed';
        return;
      }

      async.map(JSON.parse(list), download, function(err, results) {
        if (err) {
          console.log(err);
        }

        div.innerHTML = results.map(function(elem, i) {
          return SPEC.getHtml(i+1, elem || SPEC.errorContent);
        }).join('\n');
      });
    });
  }
})();
