define(['global', 'analytics','support/history', 'jquery', 'req', 'keys'], function(global, analytics, history, $, req, keys) {
  'use strict';

  if (!history) {
    console.warn('No history API support detected');
    return false;
  }

  var _router = {
    state: {
      navigating: false,
      location: '',
      last: '',
      href: '',
    },

    setState: function(key, value) {
      _router.state[key] = value;
      global.attribute.set(key,value);
    },

    clickHandler: function(event){
      if (!keys.clickModifier(event)) {
        window.history.pushState(null, null, $(this).attr('href'));
        _router.navigate($(this).attr('href'));

        if (event && this.tagName === 'A') {
          event.preventDefault();
          return false;
        }
      }
    },

    navigate: function(href) {
      req.flush();

      _router.setState('navigating',true);
      _router.state.last = _router.state.href;
      _router.state.href = href;

      var res = req.get(href, 'router');
      $.when( res.promise ).done(function(data){
        $('html,body').stop().animate({ scrollTop: 0 }, 200);

        _router.success(data.response, href);
      }).fail(function(data){
        if (data.status !== 'abort') {
          console.log('failed',data);
          _router.fail(data.response);
        }
      });

      return res;
    },

    success: function(res/*, href*/) {
      _router.buildPage(res);
      // TODO: enable google analytics
      // analytics('send', 'pageview', {
      //   page: analytics.cleanUrl(href),
      //   title: $(res).filter('title').text()
      // });
      _router.setState('location', _router.state.href);
      _router.setState('navigating',false);
    },

    fail: function(res) {
      res = res || {status: 0};
      if (res.status > 499) {
        window.location.href = 'http://kolibri.is/500';
      } else if (res.status > 399) {
        _router.navigate('/404');
      } else {
        window.location.href = _router.state.href;
      }
    },

    buildPage: function(res) {
      var $res = $(res);
      if ($res.filter('pagewrap').length < 1) {
        _router.navigate('/404');
      } else {
        document.title = $res.filter('title').text();
        if ($('pagewrap').length <= 0) {
          $('header').after($('<pagewrap />'));
        }
        $('pagewrap').replaceWith($res.filter('pagewrap'));
        $(document).trigger('re-loading');
      }
    },

  };

  _router.setState('location', _router.state.href || window.location.pathname);
  _router.state.href = window.location.pathname;

  return {
    navigate: _router.navigate,
    clickHandler: _router.clickHandler,
  };
});
