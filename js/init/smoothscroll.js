define(['jquery','domReady','smoothscroll'], function($,domReady,smoothscroll) {
  domReady(function() {
    smoothscroll.init('[smoothscroll], a[href^="#"]:not(a[href^="#_"])');
  });
});
