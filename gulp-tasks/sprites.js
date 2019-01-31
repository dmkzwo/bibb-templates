const gulp = require('gulp');
const path = require('path');

const common = require('./_common.js');
const config = common.config;

// var spritesmith = require('gulp.spritesmith');
//
// gulp.task('generate-sprite', function () {
//     var spriteData = gulp.src('sprites/png/*.png').pipe(spritesmith({
//         imgName: 'images/sprites/sprite.png',
//         cssName: '_sprite.scss'
//     }));
//     return spriteData.pipe(gulp.dest(common.resolvePath(config.paths.source.root + '_scss')));
// });
//
//
// gulp.task('copy-sprite', ['generate-sprite'], function(){
//     return gulp.src(common.resolvePath(config.paths.source.root + '_scss/images/sprites/*.png'))
//         .pipe(gulp.dest(common.resolvePath(config.paths.source.root + 'css/images/sprites')));
// });
//
// gulp.task('sprite', ['copy-sprite']);