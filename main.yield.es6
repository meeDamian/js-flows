window.versions['yield'] = (function() {
  'use strict';

  // General purpose, higher level function
  function spawn(generatorFn) {
    let g = generatorFn();

    function gen(type, arg) {
      let res;
      try {
        res = g[type](arg);
      } catch (e) {
        return Promise.reject(e);
      }

      if (res.done)
        return type === 'thrown'
          ? arg
          : res.value;

      return Promise
        .resolve(res.value)
        .then(val => gen('next', val))
        .catch(err => gen('throw', err));
    }
    gen('next');
  }

  return function exposed(div) {
    let download = getDownloader('promise');

    spawn(function*() {
      let list;
      try {
        list = JSON.parse(yield download(SPEC.file));
      } catch(err) {
        console.error('list DL failed', err);
        div.innerHTML = 'list DL failed';
        return;
      }

      let files = list.map(download);
      for (let i in files) {
        let content;
        i = parseInt(i);
        try {
          content = yield files[i];
        } catch(err) {
          console.error('file(' + i + ') DL failed', err);
          content = SPEC.errorContent;
        }
        div.innerHTML += SPEC.getHtml(content, i);
      }
    });
  };
})();
