const gulp = require('gulp');


gulp.task('watch', () => {
  gulp.watch('client');
  gulp.watch('server');
});

gulp.task('default', ['watch']);
