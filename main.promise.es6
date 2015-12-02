window.versions['promise'] = (function() {
  'use strict';

  // NOTE: Currently `XMLHttpRequest` must be manually wrapped in a Promise
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

  // [exposed] takes DOM element and fills it with content
  return function(div) {
    let addToHtml = appendTo(div);

    download(SPEC.file)                         // download the list
      .then(JSON.parse)                         // (plaintext => JSON) on response
      .then(list => {                           // when list downloaded
        return list
          .map(download)                        // create promise for each list item
          .reduce((chain, promise, i) => {
            return chain
              .then(() => promise)              // append next promise to chain
              .catch(err => {
                console.error('file(' + (i+1) + ') DL failed', err);
                return SPEC.errorContent        // fake response
              })
              .then(addToHtml(i+1));            // finally, add to HTML

          }, Promise.resolve());                // first, empty promise
      })
      .catch(err => {                           // catch list download failure
        console.error('list DL failed', err);
        div.innerHTML = 'list DL failed';
      });
  };
})();
