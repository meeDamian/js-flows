window.versions['promise'] = (function() {
  'use strict';

  // NOTE: `XMLHttpRequest` must be manually wrapped with a Promise (for now?)
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

  // we can have internal counter, because order is guaranteed
  function appendTo(div) {
    let i = 1;
    return (text) => {
      div.innerHTML += SPEC.getHtml(i++, text);
    };
  }

  return function(div) {
    let addToHtml = appendTo(div);

    download(SPEC.file)
      .then(JSON.parse)                         // (plaintext => JSON) on response
      .then(list => {                           // when list downloaded
        return list
          .map(download)                        // create promise for each list item
          .reduce((chain, promise, i) => {
            return chain
              .then(() => promise)              // add next promise to chain
              .catch(err => {
                console.error('file(' + (i+1) + ') DL failed', err);
                return SPEC.errorContent        // fake response
              })
              .then(addToHtml);                 // finally, add to HTML

          }, Promise.resolve());
      })
      .catch(err => {
        console.error('list DL failed', err);
        div.innerHTML = 'list DL failed';
      });
  };
})();
