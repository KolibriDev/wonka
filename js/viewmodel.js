define(['jquery'], function($) {
  var viewmodel = {
    state: [],
    init: function() {
      viewmodel.$body = $('body');
      viewmodel.$pagewrap = $('pagewrap');
      viewmodel.initOverlay();
      viewmodel.initModal();

      viewmodel.setState(viewmodel.state);
    },
    initOverlay: function() {
      viewmodel.$overlay = $('<overlay />');
      viewmodel.$body.append(viewmodel.$overlay);
    },
    initModal: function() {
      viewmodel.$modal = $('<modal />');
      viewmodel.$modal.controls = $('<modal-controls />');
      viewmodel.$modal.controls.prev = $('<prev />');
      viewmodel.$modal.controls.next = $('<next />');

      viewmodel.$modal.controls.append(viewmodel.$modal.controls.prev);
      viewmodel.$modal.controls.append(viewmodel.$modal.controls.next);
      viewmodel.$modal.append(viewmodel.$modal.controls);

      viewmodel.$modal.content = $('<modal-content />');
      viewmodel.$modal.append(viewmodel.$modal.content);

      viewmodel.$body.append(viewmodel.$modal);
    },
    setState: function(section, state) {
      viewmodel.state[section] = state;
      $('html').attr('data-' + section + '-state', state);
    },
    isOpen: function(section) {
      return viewmodel.state[section] === 'open';
    },
    isDev: function() {
      var devs = [
        'localhost:4000'
      ];
      return $.inArray(window.location.host, devs) > -1;
    }
  };

  return viewmodel;
});
