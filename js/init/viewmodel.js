define(['jquery','domReady','viewmodel'], function($,domReady,viewmodel) {
  var $html, $body;
  domReady(viewmodel.init);

  domReady(function() {
    $html = $('html');
    $body = $('body');
    setTimeout(function(){
      $html.removeClass('loading');
      $html.addClass('prep');

      setTimeout(function(){
        $html.removeClass('prep');
        $html.addClass('loaded');
        $html.addClass('post-load');

        $(document).trigger('loaded');
        $(window).trigger('resize');
        $(window).trigger('scroll');

        setTimeout(function(){
          $html.removeClass('post-load');
        },1000);
      },500);
    },500);

    $(document).on('re-load', function(){
      $(document).trigger('loaded');
      $html.addClass('re-loading');
      setTimeout(function(){
        $html.removeClass('re-loading');
      },500);
    });

  });
});
