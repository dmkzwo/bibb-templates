const gulp = require('gulp');
const path = require('path');

const common = require('./_common.js');
const config = common.config;

const watch = require('gulp-watch');
const clear = require('clear');

const sourceRootDir = config.paths.source.root;

console.log(config.paths.source.patterns + '**/*.scss');

const filesToWatch = [
    sourceRootDir + '_scss/**/*.scss',
    config.paths.source.patterns + '**/*.*',
    config.paths.source.data + '**/*.*'
];

const scssFilesToWatch = [
    sourceRootDir + '_scss/**/*.scss',
    config.paths.source.patterns + '**/*.scss',
    '!' + sourceRootDir + '_scss/_import_pattern.scss'
];

gulp.task('clear-console', function() {
    clear();
});

gulp.task('watch', ['sass:watch']);

gulp.task('sass:watch', function() {
    gulp.watch(
        scssFilesToWatch, ['sass']
    );
});

gulp.task('scss-lint:watch', function() {
    gulp.watch(
        scssFilesToWatch, ['scss-lint']
    );
});
