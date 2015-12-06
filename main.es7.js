SPEC.register('es7', (function() {
  'use strict';

  return async function(div) {
    let download = getDownloader('promise');

    try {
      var list = await download(SPEC.file);
    } catch(e) {
      console.error('list DL failed', e);
      div.innerHTML = 'list DL failed';
      return;
    }

    let downloads = JSON.parse(list).map(download);
    for (let i in downloads) {
      let content;
      try {
        content = await downloads[i];

      } catch (e) {
        content = SPEC.errorContent;
        console.error('file(' + i + ') DL failed', e);
      }
      div.innerHTML += SPEC.getHtml(content, parseInt(i));
    }
  }
})());
