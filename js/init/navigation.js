define(['domReady', 'onLoad', 'navCtrl', 'navigate'], function(domReady, onLoad, navCtrl, navigate) {
  domReady(function(){
    navCtrl.init({analytics:false});
    if (navigate) {
      $('header,sidebar,support').find('a:not([data-sidebar]):not([href^=mailto]):not([href^=tel]):not([href^=http])').off('click.nav').on('click.nav', function (evt) {
        if (!evt.ctrlKey && !evt.metaKey && evt.which !== 2) {
          evt.preventDefault();
          navigate.go($(this).attr('href'), $(this).attr('navigate') === 'last');
        }
      });
    }
  });

  onLoad(function(){
    if (navigate) {
      $('pagewrap').find('a:not([href^=mailto]):not([href^=tel]):not([href^=http])').off('click.nav').on('click.nav', function (evt) {
        if (!evt.ctrlKey && !evt.metaKey && evt.which !== 2) {
          evt.preventDefault();
          navigate.go($(this).attr('href'), $(this).attr('navigate') === 'last');
        }
      });
    }
  });
});