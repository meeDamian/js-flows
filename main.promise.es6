window.versions['promises'] = (function() {
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
      .catch((err) => console.error(err))       // catch error, to stop it from propagating deeper
      .then(list => {                           // when list downloaded
        return list
          .map(download)                        // create promise for each list item
          .reduce((chain, promise) => {
            return chain
              .then(() => promise)              // add next promise to chain
              .catch(err => SPEC.errorContent)  // if error, fake response
              .then(addToHtml);                 // finally, add to HTML

          }, Promise.resolve());
      });
  };
})();
