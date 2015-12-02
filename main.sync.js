// Evil ES5 version making all request synchronously
window.versions['sync'] = (function() {

  // Download *SYNC*
  function download(path) {
    var req = new XMLHttpRequest();
    req.open('GET', path, false);
    req.send();

    return req.status === 200
      ? req.responseText
      : null;
  }

  // Stiches downloaded chunks together and spices them with little bit of HTML
  function buildHtml(prev, content, index) {
    content = content || SPEC.errorContent;
    return prev + '\n' + SPEC.getHtml(index + 1, content);
  }

  // [exposed] takes DOM element and fills it with content
  return function(div) {
    div.innerHTML = JSON.parse(download(SPEC.file))
      .map(download)
      .reduce(buildHtml, '');
  };
})();
