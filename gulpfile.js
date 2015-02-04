var gulp    = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
  return gulp.src('./**/*.js')
    .pipe(jshint());
});

gulp.task('server', function () {
  nodemon({ script: 'index.js' })
    .on('change', ['lint'])
    .on('restart', function () {
      console.log('node process restarted!');
    });
});

gulp.task('default', ['server']);