define(function(){
  // Returns keycodes for each key
  var keys = {
    'mouse': {
      'left': 1,
      'middle': 2,
      'right': 3,
    },
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'shift': 16,
    'ctrl': 17,
    'alt': 18,
    'capslock': 20,
    'escape': 27,
    'space': 32,
    'pageup': 33,
    'pagedown': 34,
    'end': 35,
    'home': 36,
    'arrow': {
      'left': 37,
      'up': 38,
      'right': 39,
      'down': 40,
    },
    'print': 42,
    'insert': 45,
    'delete': 46,
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,
    'a': 65,
    'b': 66,
    'c': 67,
    'd': 68,
    'e': 69,
    'f': 70,
    'g': 71,
    'h': 72,
    'i': 73,
    'j': 74,
    'k': 75,
    'l': 76,
    'm': 77,
    'n': 78,
    'o': 79,
    'p': 80,
    'q': 81,
    'r': 82,
    's': 83,
    't': 84,
    'u': 85,
    'v': 86,
    'w': 87,
    'x': 88,
    'y': 89,
    'z': 90,
    'cmd': 91,
    'numpad': {
      '0': 96,
      '1': 97,
      '2': 98,
      '3': 99,
      '4': 100,
      '5': 101,
      '6': 102,
      '7': 103,
      '8': 104,
      '9': 105,
      'multiply': 106,
      'add': 107,
      'subtract': 109,
      'decimal': 110,
      'divide': 111,
    },
    'f1': 112,
    'f2': 113,
    'f3': 114,
    'f4': 115,
    'f5': 116,
    'f6': 117,
    'f7': 118,
    'f8': 119,
    'f9': 120,
    'f10': 121,
    'f11': 122,
    'f12': 123,
    'f13': 124,
    'f14': 125,
    'f15': 126,
    'f16': 127,
    'f17': 128,
    'f18': 129,
    'f19': 130,
    'f20': 131,
    'f21': 132,
    'f22': 133,
    'f23': 134,
    'f24': 135,
    'numlock': 144,
    'scrolllock': 145,
    'semicolon': 186,
    'equals': 187,
    'comma': 188,
    'dash': 189,
    'period': 190,
    'forwardslash': 191,
    'graveaccent': 192,
    'openbracket': 219,
    'backslash': 220,
    'closebraket': 221,
    'singlequote': 222,
  };

  keys.isFunctionalKey = function(which){
    which = which || 0;
    return which === keys.ctrl ||
      which === keys.alt ||
      which === keys.home ||
      which === keys.end ||
      which === keys.shift ||
      which === keys.tab ||
      which === keys.cmd ||
      which === keys.arrow.left ||
      which === keys.arrow.up ||
      which === keys.arrow.right ||
      which === keys.arrow.down;
  };

  keys.clickModifier = function(event){
    return event && (event.ctrlKey ||
      event.metaKey ||
      event.which === keys.mouse.middle);
  };

  keys.textModifier = function(which){
    which = which || 0;
    return which === keys.space ||
      which === keys.delete ||
      which === keys.backspace;
  };

  keys.which = function(keyCode){
    for (var property in this){
      if (this.hasOwnProperty(property)){
        if (typeof this[property] === 'object'){
          for (var subProp in this[property]){
            if (this[property].hasOwnProperty(subProp)) {
              if (this[property][subProp] === keyCode) {
                return property + '-' + subProp;
              }
            }
          }
        } else {
          if (this[ property ] === keyCode){
            return property;
          }
        }
      }
    }
    return false;
  };

  return keys;
});
