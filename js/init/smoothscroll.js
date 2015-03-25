define(['jquery','onLoad','smoothscroll'], function($,onLoad,smoothscroll) {
  onLoad(function() {
    smoothscroll.init('[smoothscroll], a[href^="#"]:not(a[href^="#_"])');
  });
});
