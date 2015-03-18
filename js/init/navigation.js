define(['domReady', 'domReady', 'navCtrl', 'navigate'], function(domReady, domReady, navCtrl, navigate) {
  domReady(function(){
    navCtrl.init();
  });

  domReady(function(){
    if (navigate) {
      $('header,sidebar').find('a:not([data-sidebar]):not([href^=mailto]):not([href^=tel]):not([href^=http])').off('click.nav').on('click.nav', function (evt) {
        if (!evt.ctrlKey && !evt.metaKey && evt.which !== 2) {
          evt.preventDefault();
          navigate.go($(this).attr('href'));
        }
      });
    }
  });

  domReady(function(){
    if (navigate) {
      $('pagewrap').find('a:not([href^=mailto]):not([href^=tel]):not([href^=http])').off('click.nav').on('click.nav', function (evt) {
        if (!evt.ctrlKey && !evt.metaKey && evt.which !== 2) {
          evt.preventDefault();
          navigate.go($(this).attr('href'));
        }
      });
    }
  });
});