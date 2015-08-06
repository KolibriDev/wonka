define(['domReady', 'jquery'], function(domReady, $){
  'use strict';
  var onLoad = function(callback, reLoadCallback) {
    domReady(callback);
    reLoadCallback = $.isFunction(reLoadCallback) ? reLoadCallback : callback;
    $(document).on('re-loading', reLoadCallback);
  };
  return onLoad;
});
