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
        div.innerHTML = results.map(function(elem, i) {
          i += 1;
          if (!elem) {
            elem = SPEC.errorContent;
            console.error('file(' + i + ') DL failed');
          }
          return SPEC.getHtml(i, elem);
        }).join('\n');
      });
    });
  }
})();
