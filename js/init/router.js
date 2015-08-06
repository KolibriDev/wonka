define(['domReady', 'onLoad', 'jquery', 'router'], function(domReady, onLoad, $, router) {
  'use strict';
  if (!router) { return; }

  var selector = 'a';
  selector += ':not([href^="javascript:"])';
  selector += ':not([target])';
  selector += ':not([href^=mailto])';
  selector += ':not([href^=tel])';
  selector += ':not([href^=http])';
  selector += ':not([href^=#])';

  domReady(function(){
    $(window).on('popstate', function(){
      router.navigate(window.location.pathname + window.location.search + window.location.hash);
    });
    $('nav.main').find(selector).off('click.nav').on('click.nav', router.clickHandler);
  });

  onLoad(function(){
    $('pagewrap').find(selector).off('click.nav').on('click.nav', router.clickHandler);
  });
});
