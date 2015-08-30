'use strict';

module.exports = function(gulp) {
  var gutil = gulp.plugin.util,
      prod  = gutil.env.prod,
      imgDir = gulp.cfg.env.dir + gulp.cfg.images.subDir;

  gulp.task('images', function() {
    return gulp.src(gulp.cfg.images.src)
      .pipe ( gulp.plugin.plumber({errorHandler: gulp.plugin.notify.onError('<%= error.message %>')}) )
      .pipe ( prod ? gutil.noop() : gulp.plugin.changed(imgDir) )

      .pipe ( gulp.dest(imgDir) )
      .pipe ( prod ? gutil.noop() : gulp.plugin.connect.reload() );
  });
};
