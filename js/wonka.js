define(['onLoad', 'global'], function(onLoad, global) {
  'use strict';
  if (!$('html').attr('data-color')) {
    global.attribute.set('color', 'yellow');
  } else {
    var color = $('html').attr('data-color');
    global.attribute.set('color', color);
  }

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

    $('a[color]').off('click.color').on('click.color', function(){
      var color = $(this).attr('color');
      global.attribute.set('color', color);
    });
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