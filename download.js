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

      if (!DELAY_ENABLED) {
        req.send();
        return;
      }

      setTimeout(() => req.send(), 3 * 1e3 * Math.random());
    });
  }

  // Callback-style XMLHttpRequest wrapper
  function downloadCallback(path, cb) {
    let req = new XMLHttpRequest();
    req.open('GET', path);

    req.onload = () => {
      req.status === 200
        ? cb(null, req.responseText)
        : cb(Error(req.statusText));
    };
    req.onerror = () => cb(Error('Network Error'));

    if (!DELAY_ENABLED) {
      req.send();
      return;
    }

    setTimeout(() => req.send(), 3 * 1e3 * Math.random());
  }

  // Synchronous XMLHttpRequest wrapper
  function downloadSync(path) {
    let req = new XMLHttpRequest();
    req.open('GET', path, false);
    req.send();

    if (DELAY_ENABLED) {
      let delay = 3 * 1e7 * Math.random();
      for (let i = 0; i < delay; i++)
        Math.random() * Math.random();
    }

    return req.status === 200
      ? req.responseText
      : null;
  }

  window.getDownloader = function(type) {
    switch (type) {
      case 'callback' : return downloadCallback;
      case 'promise'  : return downloadPromise;
      case 'sync'     : return downloadSync;
      default:
        console.warn(type + '-downloader not available');
    }
  }
})();
