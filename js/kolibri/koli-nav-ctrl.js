define(['jquery', 'viewmodel'], function($, viewmodel) {
  var nav = {
    el: {},

    state: {
      open: false,
      navigating: false,
      last: '',
      href: '',
    },

    defaults: {
      analytics: true
    },

    init: function(options) {
      nav.options = $.extend({},nav.defaults,options);
      nav.setState('location', nav.state.href || window.location.pathname);
      nav.state.href = window.location.pathname;
    },
    attachEvents: function() {
    },

    setState: function(section, state) {
      nav.state[section] = state;
      viewmodel.setState(section,state);
    },

    navigate: function(href) {
      nav.setState('navigating',true);
      nav.state.last = nav.state.href;
      nav.state.href = href;
    },

    success: function(data) {
      $(document).trigger('re-load');
      nav.buildPage(data);
      if(nav.options.analytics) {
        if (_gaq) { _gaq.push(['_trackPageview']); }
      }
      nav.setState('location', nav.state.href);
      nav.setState('navigating',false);

      nav.goToTop();
    },

    fail: function(data) {
      if (data.status === 500) {
        console.error('Server error! Do something pretty');
      } else {
        window.location.href = nav.state.href;
      }
    },

    goToTop: function() {
      $('html,body').stop().animate({ scrollTop: 0 },200, 'easeInOutExpo');
    },

    buildPage: function(body) {
      var $body = $(body);
      $('title').text($body.filter('title').text());
      $('pagewrap main').replaceWith($body.filter('pagewrap').find('main'));
      $(document).trigger('re-loaded');
    },

  };

  return nav;
});