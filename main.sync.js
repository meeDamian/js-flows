SPEC.register('sync', (function() {

  function buildHtml(content, i) {
    return SPEC.getHtml(content || SPEC.errorContent, i);
  }

  return function exposed(div) {
    var download = getDownloader('sync');

    div.innerHTML = JSON.parse(download(SPEC.file))
      .map(download)
      .map(buildHtml)
      .join('\n');
  };
})());
