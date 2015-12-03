window.versions['promise'] = (function() {
  'use strict';

  // Internal counter is fine, because order is guaranteed
  let appendTo = div => i => text => {
    div.innerHTML += SPEC.getHtml(i, text);
  };

  // EXPOSED
  return function(div) {
    let download = getDownloader('promise');
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
