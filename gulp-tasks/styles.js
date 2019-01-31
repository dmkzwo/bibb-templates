const gulp = require('gulp');
const path = require('path');

const common = require('./_common.js');
const config = common.config;

const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const clear = require('clear');

const sourcemapsPath = './maps';
const autoprefixerOptions = ["last 2 versions", "ie 10", "ie 11"];

// SASS Compilation
gulp.task('sass', ['scss-lint'], function () {
    return gulp.src(common.resolvePath(config.paths.source.root + '_scss/main-*.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass(
            {
                includePaths: [
                    './node_modules/bootstrap/scss',
                    './node_modules/hamburgers/_sass/hamburgers',
                    './node_modules/ekko-lightbox/dist',
                    './node_modules/slick-carousel/slick'
                ]
            }
        ).on('error', sass.logError))
        .pipe(prefix(autoprefixerOptions))
        .pipe(sourcemaps.write(sourcemapsPath))
        .pipe(gulp.dest(common.resolvePath(config.paths.source.css)));
});


/**
 * Linting Sass stylesheets with Stylelint
 * http://www.creativenightly.com/2016/02/How-to-lint-your-css-with-stylelint/
 */

var postcss = require('gulp-postcss');
var reporter = require('postcss-reporter');
var syntax_scss = require('postcss-scss');
var stylelint = require('stylelint');

gulp.task("scss-lint", ['pattern-import'], function () {

    var processors = [
        stylelint({
            "ignoreFiles": ["**_sprite.scss"]
        }),
        reporter({
            clearReportedMessages: true,
            throwError: false
        })
    ];

    clear();
    return gulp.src(
        [
            common.resolvePath(config.paths.source.root + '_scss/*.scss'),
            common.resolvePath(config.paths.source.root + '_scss/general/**/*.scss'),
            common.resolvePath(config.paths.source.patterns + '**/*.scss'),
            // Ignore google fonts workaround
            '!' + common.resolvePath(config.paths.source.root + '_scss/general/_default.scss')
        ]
    )
        .pipe(postcss(processors, {syntax: syntax_scss}));
});


var tap = require('gulp-tap');
const fs = require('fs');

const patternImportFileName = '_import_pattern.scss';
const patternImportFile = config.paths.source.root + '_scss/' + patternImportFileName;

gulp.task("pattern-import", function () {
    fs.unlinkSync(patternImportFile);
    fs.openSync(patternImportFile, 'xw');
    gulp.src(config.paths.source.patterns + '/**/*.scss')
        .pipe(tap(function (file) {
            var filePath = file.path;
            var newPath = filePath.replace(/.*\/bibb-templates\/source/, "..");
            newPath = newPath.replace('.scss', '');
            fs.appendFileSync(patternImportFile, "@import '" + newPath + "';\n");
//            console.log(newPath);
        }))
        .pipe(gulp.dest('./temp/sewer')); // this is important, otherwise pipe cuts off after 16 files!
    ;
});


