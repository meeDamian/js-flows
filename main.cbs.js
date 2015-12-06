window.versions['cbs'] = (function() {
  'use strict';

  // TODO: chunks order is not guaranteed

  return function exposed(div) {
    var download = getDownloader('callback');

    download(SPEC.file, function(error, content) {
      if (error) {
        console.error('list DL failed', error);
        div.innerHTML =  'list DL failed';
        return;
      }

      var list = JSON.parse(content);
      var results = {};

      list.forEach(function(path, i) {
        download(path, function(error, content) {
          if (error) {
            console.error('file(' + i + ') DL failed');
            content = SPEC.errorContent;
          }

          results[i] = SPEC.getHtml(content, i);

          if (Object.keys(results).length === list.length)
            div.innerHTML = Object.keys(results).map(function(key) {
              return results[key];
            }).join('\n');
        });
      });
    });
  };
})();
