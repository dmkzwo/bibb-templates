'use strict';

const SHOW_INFO = false;

class Utils {

    static logInfo() {
        if (!SHOW_INFO) {
            return;
        }
        var args = Array.prototype.slice.call(arguments);
        if (args.length === 1) {
            if (typeof(args[0]) === 'object') {
                console.log('INFO:');
                console.log(args[0]);
            } else {
            console.log('INFO: ' + args[0]);
            }
        } else {
            console.log('INFO: ' + args.join(' | '));
        }
    }

    static logError(err) {
        console.log('ERROR: ' + err);
    }
}

module.exports = Utils;