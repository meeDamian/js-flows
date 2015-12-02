window.versions['promise'] = (function() {
  'use strict';

  // Promise-style XMLHttpRequest wrapper
  function download(path) {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();
      req.open('GET', path);
      req.onload = () => {
        if (req.status === 200)
          resolve(req.response);
        else
          reject(Error(req.statusText));
      };
      req.onerror = () => reject(Error('Network Error'));

      req.send();
    });
  }

  // Internal counter is fine, because order is guaranteed
  let appendTo = div => i => text => {
    div.innerHTML += SPEC.getHtml(i, text);
  };

  // EXPOSED
  return function(div) {
    let addToHtml = appendTo(div);

    download(SPEC.file)
      .then(JSON.parse)
      .then(list => {
        return list
          .map(download)
          .reduce((chain, promise, i) => {
            return chain
              .then(() => promise)
              .catch(err => {
                console.error('file(' + (i+1) + ') DL failed', err);
                return SPEC.errorContent
              })
              .then(addToHtml(i+1));

          }, Promise.resolve());
      })
      .catch(err => {
        console.error('list DL failed', err);
        div.innerHTML = 'list DL failed';
      });
  };
})();
