define(['domReady', 'jquery'], function(domReady, $){
  'use strict';
  var onLoad = function(callback, reLoadCallback) {
    domReady(callback);
    reLoadCallback = $.isFunction(reLoadCallback) ? reLoadCallback : callback;
    $(document).on('ajax-loading', reLoadCallback);
  };
  return onLoad;
});
