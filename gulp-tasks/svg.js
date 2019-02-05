const gulp = require('gulp');
const path = require('path');
const common = require('./_common.js');
const config = common.config;

const svgSprite = require('gulp-svg-sprite');
const rsp = require('remove-svg-properties').stream;

const svgConfig = {
    mode: {
        symbol: {
            sprite: "misc.svg",
            dest: common.resolvePath('../../images/sprites')
        }
    }
};

const svgConfigHeadline = {
    mode: {
        symbol: {
            sprite: "headlines.svg",
            dest: common.resolvePath('../../images/sprites')
        }
    }
};

const svgConfigTopnav = {
    mode: {
        symbol: {
            sprite: "topnav.svg",
            dest: common.resolvePath('../../images/sprites')
        }
    }
};

gulp.task('svg', ['svgStandard', 'svgHeadline', 'svgTopnav']);

gulp.task('svgStandard', [], function () {
    return gulp.src(common.resolvePath(config.paths.source.root + 'images/svg/*.svg'))
        .pipe(rsp.remove({
            properties: [rsp.PROPS_FILL]
        }))
        .pipe(svgSprite(svgConfig))
        .pipe(gulp.dest(common.resolvePath(config.paths.source.root + '_scss/sprites')));
});

gulp.task('svgHeadline', [], function () {
    return gulp.src(common.resolvePath(config.paths.source.root + 'images/svg/headline/*.svg'))
        .pipe(rsp.remove({
            properties: [rsp.PROPS_FILL]
        }))
        .pipe(svgSprite(svgConfigHeadline))
        .pipe(gulp.dest(common.resolvePath(config.paths.source.root + '_scss/sprites')));
});

gulp.task('svgTopnav', [], function () {
    return gulp.src(common.resolvePath(config.paths.source.root + 'images/svg/topnav/*.svg'))
        .pipe(rsp.remove({
            properties: [rsp.PROPS_FILL]
        }))
        .pipe(svgSprite(svgConfigTopnav))
        .pipe(gulp.dest(common.resolvePath(config.paths.source.root + '_scss/sprites')));
});
