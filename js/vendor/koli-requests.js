define(['jquery', 'underscore'], function($, _) {
  'use strict';
  var _req = {
    active: {},
    skip: [],

    // Flush all active requests, or optionally a single request by tag
    flush: function(tag){
      if (tag && _req.active.hasOwnProperty(tag)) {
        _req.active[tag].abort();
        _req.active = _.omit(_req.active, tag);
      } else if (!tag && tag !== '') {
        $.each(_req.active, function(index, value){
          if ($.inArray(index, _req.skip) < 0) {
            value.abort();
          }
        });
        _req.active = {};
      }
    },

    ajax: function(options, tag, dontFlushMe){
      var deferrer = $.Deferred();
      var result = {
        tag: _.uniqueId((tag || 'get') + '_'),
        promise: deferrer.promise(),
      };
      if (!options.url) {
        deferrer.reject({error: 'no url'});
      } else {
        if (dontFlushMe) {
          _req.skip.push(result.tag);
        }
        _req.active[result.tag] = $.ajax(options)
          .always(function(response, status){
            _req.active = _.omit(_req.active, result.tag);
            var res = {
              tag: result.tag,
              response: response,
              status: status,
            };
            if (status !== 'success') {
              deferrer.reject(res);
            } else {
              deferrer.resolve(res);
            }
          });
      }
      return result;
    },

    raw: function(options, tag, dontFlushMe){
      return _req.ajax(options, tag, dontFlushMe);
    },

    get: function(url, tag, dontFlushMe){
      return _req.ajax({
        type: 'GET',
        url: url
      }, tag, dontFlushMe);
    },

    post: function(url, params, tag, dontFlushMe){
      return _req.ajax({
        type: 'POST',
        url: url,
        data: params
      }, tag, dontFlushMe);
    },
  };

  return _req;
});
