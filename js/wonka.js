define(['onLoad', 'global'], function(onLoad, global) {
  'use strict';

  onLoad(function(){
    // domReady
    global.attribute.set('load-state', 'ready');
    console.log('do ready');

    $('pagewrap').on('transitionend', function(){
      $('pagewrap').addClass('scrollable');
    });
  }, function(){
    // on ajax-loading
    global.attribute.set('load-state', 'ajax-loading');
    $('pagewrap').removeClass('scrollable');

    $(document).on('ajax-loaded loaded', function(){
      global.attribute.set('load-state', 'ready');
    });
  });
});
