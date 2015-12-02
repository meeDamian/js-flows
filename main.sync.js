window.versions['sync'] = (function() {

  // WARN: DO NOT write code like this!

  // Synchronous XMLHttpRequest wrapper
  function download(path) {
    var req = new XMLHttpRequest();
    req.open('GET', path, false);
    req.send();

    return req.status === 200
      ? req.responseText
      : null;
  }

  function buildHtml(prev, content, index) {
    content = content || SPEC.errorContent;
    return prev + '\n' + SPEC.getHtml(index + 1, content);
  }

  // EXPOSED
  return function(div) {
    div.innerHTML = JSON.parse(download(SPEC.file))
      .map(download)
      .reduce(buildHtml, '');
  };
})();
