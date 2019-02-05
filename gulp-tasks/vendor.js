const gulp = require('gulp');
const path = require('path');

const common = require('./_common.js');
const config = common.config;

const pathBootstrap = 'node_modules/bootstrap/dist/css/';

gulp.task('vendor-css', function(){
    return gulp.src(pathBootstrap + 'bootstrap.min.css')
        .pipe(gulp.dest(common.resolvePath(config.paths.source.css + '/vendor')));
});


