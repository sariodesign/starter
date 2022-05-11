const { series, parallel, src, dest, watch } = require('gulp');
const fs = require('file-system');
const clean = require('gulp-clean'); 
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');


const cleanTask = () => {
  return src('./dist', {read: false})
        .pipe(clean());
}

const htmlTask = () => {
  return src('./src/pages/*.njk')
  .pipe(data(function() {
    return JSON.parse(fs.readFileSync('./src/data.json'));
  }))
  .pipe(nunjucksRender({
    path: ['./src/objects','./src/components','./src/templates/','./src/pages/'] // String or Array
  }))
  .pipe(dest('./dist'));
}

const images = () => {
  return src('./src/assets/images/*.+(png|jpg|jpeg|gif|svg|ico)')
    .pipe(dest('./dist/img/'));
}

const fonts = () => {
  return src('./src/assets/fonts/*.+(woff|woff2)')
    .pipe(dest('./dist/fonts/'));
};

const video = () => {
  return src('./src/assets/video/*.+(webm|mp4)')
    .pipe(dest('./dist/video/'));
};

const assetTask = parallel(images, fonts, video)

const cssTask = () => {
  return src('./src/assets/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/css'));
}

const jsTask = () => {
  return src('./src/assets/javascripts/*.js')
    .pipe(dest('./dist/js/'));
}

const browserSyncServe = (cb) => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      }
  });
  cb();
}

const browserSyncReload = (cb) => {
  browserSync.reload();
  cb();
}

const watchTask = () => {
  watch(['./src/assets/stylesheets/**/*.scss', './src/assets/javascripts/*.js', './src/**/*.njk'], series(htmlTask, cssTask, jsTask, browserSyncReload));
}

exports.build = series(cleanTask, htmlTask, cssTask, jsTask, assetTask, browserSyncServe, watchTask, );
