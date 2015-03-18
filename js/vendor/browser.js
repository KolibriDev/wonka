define([], function(){
  var browser = {
    name: 'Other',
    version: 0,
    shortName: 'x',
    notify: false,
    names: {
      ie: 'Internet Explorer',
      moz: 'Firefox',
      op: 'Opera',
      saf: 'Apple Safari',
      net: 'Netscape Navigator',
      chr: 'Chrome',
      x: 'Other'
    },

    init: function() {
      browser.get();
      browser.rules();

      return browser;
    },

    rules: function() {
      if (browser.shortName === 'ie' && browser.version <= 8) {
        browser.notify = true;
      }
      if (browser.shortName === 'moz' && browser.version <= 15) {
        browser.notify = true;
      }
      if (browser.shortName === 'op' && browser.version <= 11) {
        browser.notify = true;
      }
      if (browser.shortName === 'saf' && browser.version <= 5) {
        browser.notify = true;
      }
      if (browser.shortName === 'net') {
        browser.notify = true;
      }
    },

    get: function() {
      var usAg = navigator.userAgent;
      if (/bot|googlebot|facebook|slurp|wii|silk|blackberry|maxthon|maxton|mediapartners|dolfin|dolphin|adsbot|silk|android|phone|bingbot|google web preview|like firefox|chromeframe|seamonkey|opera mini|min|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|konqueror|rekonq|symbian|webos|coolnovo|blackberry|bb10|RIM|PlayBook|PaleMoon|QupZilla/i.test(usAg))
        { browser.shortName = 'x'; }
      else if (/Trident.*rv:(\d+\.\d+)/i.test(usAg)) { browser.shortName = 'ie'; }
      else if (/Trident.(\d+\.\d+)/i.test(usAg)) { browser.shortName = 'io'; }
      else if (/MSIE.(\d+\.\d+)/i.test(usAg)) { browser.shortName = 'ie'; }
      else if (/OPR.(\d+\.\d+)/i.test(usAg)) { browser.shortName = 'op'; }
      else if (/Chrome.(\d+\.\d+)/i.test(usAg)) { browser.shortName = 'chr'; }
      else if (/Firefox.(\d+\.\d+)/i.test(usAg)) { browser.shortName = 'moz'; }
      else if (/Version.(\d+.\d+).{0,10}Safari/i.test(usAg))  { browser.shortName = 'saf'; }
      else if (/Safari.(\d+)/i.test(usAg)) { browser.shortName = 'so'; }
      else if (/Opera.*Version.(\d+\.\d+)/i.test(usAg)) { browser.shortName = 'op'; }
      else if (/Opera.(\d+\.?\d+)/i.test(usAg)) { browser.shortName = 'op'; }
      else if (/Netscape.(\d+)/i.test(usAg)) { browser.shortName = 'n'; }
      else { return; }

      browser.version = parseFloat(RegExp.$1);

      if (browser.shortName === 'x') { return; }

      if (browser.shortName === 'so') {
          browser.version=((browser.version<100) && 1.0) || ((browser.version<130) && 1.2) || ((browser.version<320) && 1.3) || ((browser.version<520) && 2.0) || ((browser.version<524) && 3.0) || ((browser.version<526) && 3.2) ||4.0;
          browser.shortName='saf';
      }
      if (browser.shortName === 'ie' && browser.version === 7 && window.XDomainRequest) {
          browser.version=8;
      }
      if (browser.shortName === 'io') {
          browser.shortName = 'ie';
          if (browser.version > 6) { browser.version = 11; }
          else if (browser.version > 5) { browser.version = 10; }
          else if (browser.version > 4) { browser.version = 9; }
          else if (browser.version > 3.1) { browser.version = 8; }
          else if (browser.version > 3) { browser.version = 7; }
          else { browser.version = 9; }
      }

      browser.name = browser.names[browser.shortName];

      return;
    },
  };

  return browser.init();
});
