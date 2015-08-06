(function() {
  require.config({
    baseUrl: '/js',
    paths: {
      zepto: 'vendor/zepto-build',
      promise: 'vendor/promise',
      domReady: 'vendor/domReady',
      modernizr: 'vendor/modernizr',

      onLoad: 'vendor/koli-onload',
    },
    shim: {
      modernizr: { exports: 'Modernizr' },
      zepto: { exports: 'Zepto' },
    }
  });

  require([
    'wonka'
  ]);
}).call(this);
