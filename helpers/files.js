var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var marked = require('meta-marked');

var files = {};

files.parseMarkdown = function(file) {
  try {
    return marked(file);
  } catch(exc) {
    return {};
  }
};

files.getMarkdownFile = function(name) {
  if (!name) { return name; }
  var file = fs.readFileSync(name, 'utf8');
  return files.parseMarkdown(file);
};

files.getAllMarkdownFilesRecursive = function(parentFolder) {
  if (!parentFolder) { return {error:1}; }

  var response = {
    isFolder: true
  };

  var fileNames = fs.readdirSync(parentFolder);

  var parentFolderName = parentFolder.split('/');
  parentFolderName = parentFolderName[parentFolderName.length-1];

  _.each(fileNames, function(fileName) {
    //console.log(parentFolder, fileName);

    var filePath = path.join(parentFolder, fileName);

    if (fs.statSync(filePath).isDirectory()) {
      response[fileName] = files.getAllMarkdownFilesRecursive(filePath);
    } else if (fileName.indexOf('.md') > -1) {
      if (fileName === 'index.md' && parentFolderName && parentFolderName !== 'content') {
        //console.log('----response[parentFolderName]',parentFolderName);
        response[parentFolderName] = response[parentFolderName] || {};
        response[parentFolderName]['index'] = files.getMarkdownFile(filePath);
      } else {
        response[fileName.replace('.md', '')] = files.getMarkdownFile(filePath);
      }
    }
  });

  return response;
};

module.exports = files;
