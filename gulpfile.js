// var gulp = require('gulp');
// var sass = require('gulp-sass');
// var babel = require('gulp-babel');
// var gutil = require('gulp-util');

// var webpack = require('webpack-stream');

// // default Task - this is run upon entering gulp into the command line
// gulp.task('default', [
//   'webpack',
//   'sass',
//   'watch'
// ]);

// // use webpack
// gulp.task('webpack', function() {
//   return gulp.src('./client/App.js')
//   .pipe(webpack(require('./webpack.config.js'))); //to ensure same paths are used
//   .pipe(gulp.dest('./client/public'));
// });

// // Compile Our Sass
// gulp.task('sass', function() {
//   return gulp.src('scss/*.scss')
//   .pipe(sass())
//   .pipe(gulp.dest('./client/public/css'));
// });

// // Watch Files For Changes
// gulp.task('watch', function() {
//     // gulp.watch('js/*.js', ['lint', 'scripts']);
//     gulp.watch('scss/*.scss', ['sass']);
//     gulp.watch('./client/components/*.js', ['webpack']);
// });

// // gulp.task('default', function() {
// //   return gutil.log('Gulp is running!')
// // });