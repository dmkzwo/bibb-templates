'use strict';

const NavItem = require('./NavItem');

console.log(location.hostname);
console.log(location.port);
console.log(location.protocol);
const ajaxEndpoint = 'http://127.0.0.1:2222/ajax.php';

class NavItems {

    constructor() {
        this.navItems = [];

        if (location.port === '3000') {
            this.ajaxEndpoint = location.protocol + '//' + location.hostname + ':2222/ajax.php';
        } else {
            this.ajaxEndpoint = location.protocol + '//' + location.hostname + '/ajax.php';
        }

    }


    addNavItem(navItem) {
        this.navItems[navItem.pid] = navItem;
    }

    existsNavItem(pid) {
        return pid in this.navItems;
    }

    getNavItem(pid) {
        if (pid === 0) {
            const rootNavItem = new NavItem();
            return rootNavItem;
        }
        if (this.existsNavItem(pid)) {
            return this.navItems[pid];
        }
        return false;
    }

    loadSubItems(pid) {
        const data = {};
        data.pid = pid;

        const _self = this;
        return $.ajax({
            url: _self.ajaxEndpoint,
            data: data,
            dataType: 'json'
        });
    }

}

module.exports = NavItems;
