const config = require('../patternlab-config.json');
const path = require('path');

module.exports = {

    resolvePath: function (pathInput) {
        return path.resolve(pathInput).replace(/\\/g, "/");
    },
    config: config
}

