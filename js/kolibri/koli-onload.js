define(['domReady', 'jquery'], function(domReady, $){
  'use strict';
  var onLoad = function(callback) {
    domReady(callback);
    $(document).on('re-loaded', callback);
  };
  return onLoad;
});