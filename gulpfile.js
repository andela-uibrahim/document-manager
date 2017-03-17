const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('browser', () => {
  browserSync.init({
    server: {
      baseDir: './public',
      index: 'index.html'
    },
    port: process.env.PORT || 9000,
  });
});

gulp.task('watch', ['browser'], () => {
  gulp.watch('client', browserSync.reload);
  gulp.watch('server', browserSync.reload);
});

gulp.task('default', ['watch']);
