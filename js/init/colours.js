define(['global', 'onLoad', 'jquery'], function(global, onLoad, $) {
  'use strict';
  if (!$('html').attr('data-color')) {
    global.attribute.set('color', 'yellow');
  } else {
    var color = $('html').attr('data-color');
    global.attribute.set('color', color);
  }

  onLoad(function(){
    var sectionAlias;
    var path = window.location.pathname.split('/');
    if (path.length > 2) {
      sectionAlias = path[2];
      var color = $('[section="'+sectionAlias+'"]').attr('color');
      global.attribute.set('color', color || 'yellow');
    }
  });
});
