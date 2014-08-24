var gulp = require('gulp');
var expressService = require('gulp-express-service');
gulp.task('server', function () {
  return gulp.src('app/index.js')
  .pipe(expressService({file: './app/index.js', NODE_ENV: 'DEV'}));
});

gulp.task('watch', ['server'], function () {
  gulp.watch(['app/**/*.js'], ['server']);
});
