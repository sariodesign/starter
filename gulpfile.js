'use strict';

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence')
var del = require('del');
var fs = require('file-system');
var data = require('gulp-data');
var nunjucksRender = require('gulp-nunjucks-render');
//var prettify = require('gulp-html-prettify');
var sass = require('gulp-sass');
//var imagemin = require('gulp-imagemin');
//var imageminJpegtran = require('imagemin-jpegtran');
//var webp = require('gulp-webp');
var browserSync = require('browser-sync').create();

gulp.task('clean', function () {
  return del(['./dist']);
});

gulp.task('html', function () {
  return gulp.src('src/pages/*.njk')
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync('./src/data.json'));
    }))
    .pipe(nunjucksRender({
      path: ['./src/objects','./src/components','./src/templates/','./src/pages/'] // String or Array
    }))
    //.pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
  return gulp.src('./src/assets/fonts/*.+(woff|woff2)')
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('img', function() {
  return gulp.src('./src/assets/images/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(gulp.dest('./dist/img/'));
});

gulp.task('video', function() {
  return gulp.src('./src/assets/video/*.+(webm|mp4)')
    .pipe(gulp.dest('./dist/video/'));
});

sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('./src/assets/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('./src/assets/javascripts/*.js')
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});

gulp.task('launch-browser', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('./src/assets/stylesheets/**/*.scss', ['sass']);
    gulp.watch('./src/assets/javascripts/*.js', ['js']);
    gulp.watch('./src/**/*.njk', ['html']);
});

gulp.task('default', gulpSequence('clean', ['html', 'sass', 'js', 'fonts', 'img', 'video', 'launch-browser']));
