(function() {
  require.config({
    baseUrl: '/wonka/js',
    paths: {
      jquery: 'vendor/jquery',
      domReady: 'vendor/domReady',
      underscore: 'vendor/underscore',

      onLoad: 'vendor/koli-onload',
      keys: 'vendor/koli-keys',
      req: 'vendor/koli-requests',

      router: 'code/router',
    }
  });

  require([
    'wonka',
    'init/router',
    'init/colours',
  ]);
}).call(this);
