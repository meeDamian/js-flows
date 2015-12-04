window.versions['sync'] = (function() {

  // WARN: DO NOT write code like this!

  function buildHtml(prev, content, index) {
    content = content || SPEC.errorContent;
    return prev + '\n' + SPEC.getHtml(content, index);
  }

  // EXPOSED
  return function(div) {
    var download = getDownloader('sync');

    div.innerHTML = JSON.parse(download(SPEC.file))
      .map(download)
      .reduce(buildHtml, '');
  };
})();
