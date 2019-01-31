const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../webpack.config.js');

gulp.task('js', function() {
    gulp.src('./source/_javascript/main.js')
        .pipe(webpackStream(webpackConfig), webpack({
            mode: 'development'
        }))
        .pipe(gulp.dest('./source/js'));
});

gulp.task('js:watch', function () {
    gulp.watch('./source/_javascript/**/*.js', ['js']);
});