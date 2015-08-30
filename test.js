var files = require('./helpers/files.js');

var resp = files.getAllMarkdownFilesRecursive('./content');

console.log(resp);
