(function() {
  'use strict';

  // Promise-style XMLHttpRequest wrapper
  function downloadPromise(path) {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();
      req.open('GET', path);

      req.onload = () => {
        req.status === 200
          ? resolve(req.response)
          : reject(Error(req.statusText));
      };
      req.onerror = () => reject(Error('Network Error'));

      req.send();
    });
  }

  // Callback-style XMLHttpRequest wrapper
  function downloadCallback(path, cb) {
    var req = new XMLHttpRequest();
    req.open('GET', path);

    req.onload = () => {
      req.status === 200
        ? cb(null, req.responseText)
        : cb(Error(req.statusText));
    };
    req.onerror = () => cb(Error('Network Error'));

    req.send();
  }

  // Synchronous XMLHttpRequest wrapper
  function downloadSync(path) {
    var req = new XMLHttpRequest();
    req.open('GET', path, false);
    req.send();

    return req.status === 200
      ? req.responseText
      : null;
  }

  window.getDownloader = function(type) {
    switch (type) {
      case 'sync'     : return downloadSync;
      case 'callback' : return downloadCallback;
      case 'promise'  : return downloadPromise;
      default:
        console.warn(type + '-downloader not available');
    }
  }

})();
