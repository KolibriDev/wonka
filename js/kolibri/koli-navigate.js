define(['jquery','navCtrl','history','smoothscroll','classList'], function($,navCtrl,History,smoothscroll){
  if (!navCtrl) {
    return false;
  }

  History.Adapter.bind(window, 'statechange', function() {
    navigate.run(History.getState().hash);
  });

  var navigate = {
    go: function(href, last) {
      if (href && href.substring(0,1) === '#') {
        smoothscroll.scrollTo(href);
      } else {
        if (last && navCtrl.state.last !== '') {
          href = navCtrl.state.last;
        }
        History.pushState(null, null, navigate.cleanUrl(href));
      }
      if (href && href.indexOf('#') > -1) {
        var hash = href.split('#');
        hash = hash[1];
        smoothscroll.scrollTo('#'+hash);
        $(document).on('re-loaded',function(){
          smoothscroll.scrollTo('#'+hash);
        });
      }
    },

    run: function(href) {
      try {
        navCtrl.navigate(href);

        $.ajax({
          type: 'GET',
          url: href
        })
        .done(navCtrl.success)
        .fail(navCtrl.fail);

      } catch(exc) {
        console.error('exception',exc);
        navCtrl.fail();
      }
      return;
    },

    cleanUrl: function(url) {
      if (!url) {
        return window.location.pathname;
      }
      if (url.indexOf('localhost:4000') > -1 || url.indexOf('.is') > -1) {
        var divider = url.indexOf('localhost:4000') > -1 ? ':4000' : '.is';
        url = url.split(divider);
        url = url[1];
      }
      if (url.indexOf('#') > -1) {
        url = url.split('#');
        url = url[0];
      }

      return url;
    },

  };

  return navigate;
});
