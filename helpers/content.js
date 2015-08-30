var files = require('./files');

var content = {};

content.getAll = function() {
  return files.getAllMarkdownFilesRecursive('./content');
};


module.exports = content;
