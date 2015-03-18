define(['jquery','domReady','viewmodel'], function($,domReady,viewmodel) {
  domReady(viewmodel.init);

  domReady(function() {
    setTimeout(function(){
      $('html').removeClass('loading');
      $('html').addClass('prep');

      setTimeout(function(){
        $('html').removeClass('prep');
        $('html').addClass('loaded');
        $('html').addClass('post-load');

        $(document).trigger('loaded');
        $(window).trigger('resize');
        $(window).trigger('scroll');

        setTimeout(function(){
          $('html').removeClass('post-load');
        },1000);
      },500);
    },500);

    var $body = $('body');
    $(window).on('scroll', function(){
      if ($(window).scrollTop() > 80) {
        $body.attr('scrolled',true);
      } else {
        $body.attr('scrolled',false);
      }
    });

    if (viewmodel.isDev()) {
      $('body').append($('<script type="text/javascript" />').attr('src','http://localhost:35729/livereload.js'));
    }
  });
});
