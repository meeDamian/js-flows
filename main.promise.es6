window.versions['promise'] = (function() {
  'use strict';

  // Internal counter is fine, because order is guaranteed
  let appendTo = div => i => text => {
    div.innerHTML += SPEC.getHtml(text, i);
  };

  return function exposed(div) {
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
                console.error('file(' + i + ') DL failed', err);
                return SPEC.errorContent
              })
              .then(addToHtml(i));

          }, Promise.resolve());
      })
      .catch(err => {
        console.error('list DL failed', err);
        div.innerHTML = 'list DL failed';
      });
  };
})();
