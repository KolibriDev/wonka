define(['jquery'], function($) {
  'use strict';
  var _global = {
    init: function(){
      // Insert code here
    },

    attributes: {},
    attribute: {
      set: function(key, value){
        if (!key) { return; }
        key = key.toString().toLowerCase();
        value = value ? value.toString().toLowerCase() : false;

        $('html').attr('data-' + key, value);
        _global.attributes[key] = value;
      },
      get: function(key){
        if (!key) { return; }
        key = key.toString().toLowerCase();
        return _global.attributes[key];
      },
    },
  };

  return _global;
});
