define(['onLoad', 'global'], function(onLoad, global) {
  'use strict';

  global.attribute.set('load-state', 'post-load');

  onLoad(function(){
    // domReady
    global.attribute.set('load-state', 'ready');

    $('pagewrap').on('transitionend', function(event){
      if (event.target.tagName === 'PAGEWRAP' && global.attributes.location !== '/') {
        $('pagewrap').addClass('visible');
      }
    });

    $(document).on('ajax-loaded loaded', function(){
      global.attribute.set('load-state', 'ready');
    });
  }, function(){
    // on ajax-loading
    global.attribute.set('load-state', 'ajax-loading');
    $('pagewrap').removeClass('visible');
  });
});
