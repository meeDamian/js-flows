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

  let src = 'main.es7.js';
  if(!asyncAwait) {
    src = src.replace(/\.js$/, '.babel.js');
    console.info('Browser doesn\'t support ES7 yet. Using babel-compiled version instead.');
  }

  let script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
})();
