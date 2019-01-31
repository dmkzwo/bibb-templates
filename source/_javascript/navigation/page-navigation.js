'use strict';

// const $ = require('jquery');
const Utils = require('helpers/Utils');

class PageNavigation {

    constructor($wrapper) {
        Utils.logInfo('page nav constructor');

        this.$wrapper = $wrapper;
        this.isMoving = false;
        this.isOpen = false;

        this.$wrapper.on(
            'click',
            '.js-page-navigation-show-siblings',
            this.handleParentClick.bind(this)
        );
    }

    // Event Handlers
    handleParentClick(e) {
        e.preventDefault();

        if (this.isMoving) {
            return;
        }

        this.isMoving = true;

        if (this.isOpen) {
            this.$wrapper.removeClass('fr-page-navigation__siblings-link--active');
            this.$wrapper.find('.js-page-navigation-siblings-list').removeClass('js-page-navigation-siblings-open');
            this.$wrapper.find('.js-page-navigation-siblings-list a').attr('tabIndex', -1);
            this.isOpen = false;
        } else {
            this.$wrapper.addClass('fr-page-navigation__siblings-link--active');
            this.$wrapper.find('.js-page-navigation-siblings-list').addClass('js-page-navigation-siblings-open');
            this.$wrapper.find('.js-page-navigation-siblings-list a').attr('tabIndex', 0);
            this.isOpen = true;
        }

        //var _self = this;
        setTimeout(function() {
            this.isMoving = false;
        }.bind(this), 500);

    }

}

export default PageNavigation;
