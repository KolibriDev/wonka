'use strict';
var content = require('../helpers/content');

module.exports = function(gulp) {
  gulp.task('templates', function() {
    var gutil = gulp.plugin.util;
    var prod  = gutil.env.prod;
    var options = gulp.cfg.templates.jade;
    options.data = {};
    options.data.content = content.getAll();
    options.data.env = prod ? 'production' : 'development';
    options.data.flags = gutil.env;

    return gulp.src(gulp.cfg.templates.src)
      .pipe ( gulp.plugin.plumber({errorHandler: gulp.plugin.notify.onError('<%= error.message %>')}) )
      .pipe ( gulp.plugin.jade(options) )

      .pipe ( gulp.dest( gulp.cfg.env.dir) )
      .pipe ( prod ? gutil.noop() : gulp.plugin.connect.reload() );
  });
};