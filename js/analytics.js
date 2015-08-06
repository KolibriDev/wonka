define(function (require) {
  var module;

  // Setup temporary Google Analytics objects.
  window.GoogleAnalyticsObject = 'ga';
  window.ga = function () { (window.ga.q = window.ga.q || []).push(arguments); };
  window.ga.l = 1 * new Date();

  // Immediately add a pageview event to the queue.
  window.ga('create', 'UA-???????-?', 'wonka.kolibri.is');
  window.ga('require', 'displayfeatures');
  window.ga('send', 'pageview');

  // Create a function that wraps `window.ga`.
  // This allows dependant modules to use `window.ga` without knowingly
  // programming against a global object.
  module = function () { window.ga.apply(this, arguments); };

  module.cleanUrl = function (url) {
    if (!url) {
      return window.location.pathname;
    }
    if (url.indexOf('localhost') > -1 || url.indexOf('.is') > -1) {
      var divider = url.indexOf('localhost') > -1 ? '.local' : '.is';
      url = url.split(divider);
      url = url[1];
    }
    if (url.indexOf('#') > -1) {
      url = url.split('#');
      url = url[0];
    }
    if (url.indexOf('?') > -1) {
      url = url.split('?');
      url = url[0];
    }
    return url;
  };

  // Asynchronously load Google Analytics, letting it take over our `window.ga`
  // object after it loads. This allows us to add events to `window.ga` even
  // before the library has fully loaded.
  require(['//www.google-analytics.com/analytics.js']);

  return module;
});