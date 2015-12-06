function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

SPEC.register('es7', (function () {
  'use strict';

  return (function () {
    var ref = _asyncToGenerator(function* (div) {
      let download = getDownloader('promise');

      try {
        var list = yield download(SPEC.file);
      } catch (e) {
        console.error('list DL failed', e);
        div.innerHTML = 'list DL failed';
        return;
      }

      let downloads = JSON.parse(list).map(download);
      for (let i in downloads) {
        let content;
        try {
          content = yield downloads[i];
        } catch (e) {
          content = SPEC.errorContent;
          console.error('file(' + i + ') DL failed', e);
        }
        div.innerHTML += SPEC.getHtml(content, parseInt(i));
      }
    });

    return function (_x) {
      return ref.apply(this, arguments);
    };
  })();
})());
