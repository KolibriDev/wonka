var _ = require('underscore');
var files = require('./files');

var content = {};

content.getAll = function() {

  var ret = {};

  ret['index'] = content.getIndex();

  ret['groups'] = content.getGroups();



  ret['rawData'] = content.getRawData();
  return ret;
};


content.getIndex = function() {
  return files.getMarkdownFile('./content/index.md');
}

content.getRawData = function() {
  return files.getAllMarkdownFilesRecursive('./content');
}

content.getGroups = function() {
  var ret = {};

  var raw = content.getRawData();

  _.each(raw, function(group, groupId) {
    if (groupId === 'isFolder' || groupId === 'index') {
      return; // not a group => do nothing.
    } else {
      ret[groupId] = {
        id: groupId,
        title: group[groupId].index ? group[groupId].index.meta.title : groupId,
        token: group[groupId].index ? group[groupId].index.meta.title.substr(0, 1).toUpperCase() : '',
        color: group[groupId].index ? group[groupId].index.meta.color : '',
        html: group[groupId].index ? group[groupId].index.html : '',
        foo: {
          length: 0,
          foos: {}
        }
      };

      _.each(group, function(foo, index) {
        if (index === 'isFolder' || index === groupId) {
          return;
        } else {
          ret[groupId].foo.length++;
          ret[groupId].foo.foos[index] = {id: index, href: 'put link ' + index};
        }
      });
    }
  });

  return ret;
};

module.exports = content;
