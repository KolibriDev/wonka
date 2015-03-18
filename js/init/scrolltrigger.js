define(['domReady','scrolltrigger'], function(domReady,scrolltrigger) {
  domReady(function(){
    scrolltrigger.init(['[scrolltrigger]']);
  });
});