'use strict';

module.exports = function(gulp) {
  gulp.task('scripts', function() {
    var gutil = gulp.plugin.util,
        prod  = gutil.env.prod,
        jsDir = gulp.cfg.env.dir + gulp.cfg.scripts.subDir;

    return gulp.src(gulp.cfg.scripts.src)
      .pipe ( gulp.plugin.plumber({errorHandler: gulp.plugin.notify.onError('<%= error.message %>')}) )

      .pipe ( prod ? gutil.noop() : gulp.plugin.changed( jsDir ) )
      .pipe ( !prod ? gutil.noop() : gulp.plugin.filter(['**/*.js']) )

      .pipe ( gulp.dest( jsDir ) )
      .pipe ( prod ? gutil.noop() : gulp.plugin.connect.reload() );
  });
};
