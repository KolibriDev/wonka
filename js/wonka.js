define(['onLoad', 'global'], function(onLoad, global) {
  'use strict';
  global.attribute.set('color', 'yellow');

  onLoad(function(){
    // domReady
    $('html').removeClass('loading');
    $('html').addClass('post-load');

    $(document).trigger('loaded');

    // TODO: Use transitionend
    // $(selector).on('transitionend', function(){});
    setTimeout(function(){
      $('html').removeClass('post-load');
      $('html').addClass('loaded');
    },500);
  }, function(){
    // re-loading
    $('html').addClass('re-loading');
    $(document).trigger('re-loaded');

    // TODO: Use transitionend
    // $(selector).on('transitionend', function(){});
    setTimeout(function(){
      $('html').removeClass('re-loading');
      $('html').addClass('re-loaded');
    },500);
  });
});