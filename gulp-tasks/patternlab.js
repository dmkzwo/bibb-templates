const gulp = require('gulp');
const path = require('path');

const common = require('./_common.js');
const config = common.config;

const argv = require('minimist')(process.argv.slice(2));

const patternlab = require('@pattern-lab/patternlab-node')(config);


function build() {
    return patternlab.build({
        watch: argv.watch,
        cleanPublic: config.cleanPublic
    });
}

function serve() {
    return patternlab.serve({
            cleanPublic: config.cleanPublic
        }
    );
}

// function serve() {
//     return patternlab.serve({
//             cleanPublic: config.cleanPublic
//         }
//     ).then(() => {
//         // do something else when this promise resolves
//     });
// }

gulp.task('patternlab:version', function () {
    patternlab.version();
});

gulp.task('patternlab:help', function () {
    patternlab.help();
});

gulp.task('patternlab:patternsonly', function () {
    patternlab.patternsonly(config.cleanPublic);
});

gulp.task('patternlab:liststarterkits', function () {
    patternlab.liststarterkits();
});

gulp.task('patternlab:loadstarterkit', function () {
    patternlab.loadstarterkit(argv.kit, argv.clean);
});

gulp.task('patternlab:build', ['sass'], function () {
    build();
});

gulp.task('patternlab:serve', function () {
    serve();
});

gulp.task('patternlab:installplugin', function () {
    patternlab.installplugin(argv.plugin);
});

gulp.task('default', ['patternlab:help']);

