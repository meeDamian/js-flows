window.versions['cbs'] = (function() {
  'use strict';

  // TODO: chunks order is not guaranteed

  return function exposed(div) {
    var download = getDownloader('callback');

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
          if (error) {
            console.error('file(' + i + ') DL failed');
            content = SPEC.errorContent;
          }

          results.push(SPEC.getHtml(content, i));

          if (results.length === list.length)
            complete(results.join('\n'));
        });
      });
    });
  };
})();
