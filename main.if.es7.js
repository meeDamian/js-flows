(function() {
  'use strict';
  /**
   * Load ES7 version only when both `await` and `async` keywords are reserved.
   **/

  let asyncAwait = false;
  try {
    eval('(function(async, await){})');
  } catch (e) {
    asyncAwait = true;
  }

  if (asyncAwait) {
    let script = document.createElement('script');
    script.src = 'main.es7.js';
    document.head.appendChild(script);

  } else {
    SPEC.register('es7', (div) => {
      let str = '"es7" not yet supported in this browser';
      console.log(str);
      div.innerHTML = '<p>' + str + '</p>';
    });
  }
})();
