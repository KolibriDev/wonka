
(function() {
  require.config({
    baseUrl: '/js',
    paths: {
      domReady: 'vendor/domReady',
      classList: 'vendor/classList',
      jquery: 'vendor/jquery.min',
      jQeasing: 'vendor/jquery.easing.min',
      underscore: 'vendor/underscore-min',
      history: 'vendor/jquery.history',
      browser: 'vendor/browser',
      modernizr: 'vendor/modernizr',

      rafPolyfill: 'kolibri/raf-polyfill',
      scrolltrigger: 'kolibri/koli-scrolltrigger',
      smoothscroll: 'kolibri/koli-smoothscroll',
      navigate: 'kolibri/koli-navigate',
      navCtrl: 'kolibri/koli-nav-ctrl',
      cssTranslate: 'kolibri/koli-css-translate',

      align: 'kolibri/koli-align',
      alignHelpers: 'kolibri/koli-align-helpers',
      alignEqualize: 'kolibri/koli-align-equalize',
      alignVerticalCenter: 'kolibri/koli-align-vertical-center',
      alignWindowHeight: 'kolibri/koli-align-window-height',

      viewmodel: 'viewmodel',
    },
    shim: {
      jquery: { exports: '$' },
      jQeasing: { deps: ['jquery'] },
      underscore: { exports: '_' },
      history: { exports: 'History' },
      modernizr: { exports: 'Modernizr' },
    }
  });

  require([
    'init/viewmodel',
    'init/navigation',
    'init/align',
    'init/smoothscroll',
    'init/scrolltrigger',
    'init/parallax',
  ]);
}).call(this);
