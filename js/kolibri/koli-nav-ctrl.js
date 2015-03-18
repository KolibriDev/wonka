define(['jquery', 'viewmodel'], function($, viewmodel) {
  var nav = {
    el: {},

    state: {
      open: false,
      navigating: false,
      href: '',
    },

    options: {},
    defaults: {},

    init: function(options) {
      nav.options = $.extend({},nav.defaults,options);
      nav.setState('location', nav.state.href || window.location.pathname);
    },
    attachEvents: function() {
    },

    setState: function(section, state) {
      nav.state[section] = state;
      viewmodel.setState(section,state);
    },

    navigate: function(href) {
      nav.setState('navigating',true);
      nav.state.href = href;

      // $('title').text('Hleð ' + nav.state.href);
    },

    success: function(data) {
      $(document).trigger('re-load');
      nav.buildPage(data);
      // if (_gaq) { _gaq.push(['_trackPageview']); }
      nav.setState('location', nav.state.href);

      nav.goToTop();
    },

    fail: function() {
      window.location.href = nav.state.href;
    },

    goToTop: function() {
      $('html,body').stop().animate({ scrollTop: 0 },200, 'easeInOutExpo');
    },

    buildPage: function(body) {
      var $body = $(body);
      $('title').text($body.filter('title').text());
      $('pagewrap').replaceWith($body.filter('pagewrap'));
    },

  };

  return nav;
});