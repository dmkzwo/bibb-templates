'use strict';

const $ = require('jquery');
const Utils = require('helpers/Utils');


class UserLayer {

    constructor($wrapper) {
        Utils.logInfo('user layer constructor');

        this.$wrapper = $wrapper;
        this.isMoving = false;
        //this.isOpen = false;

        this.$wrapper.hide();
        //this.initScrollWatchers();

        $('.js-user-layer-toggle').on(
            'click',
            this.handleToggleClick.bind(this)
        );

        $('.js-user-layer-close').on(
            'click',
            this.handleToggleClick.bind(this)
        );


    }


    // Event Handlers

    handleToggleClick(e) {
        e.preventDefault();

        if (this.isMoving) {
            return;
        }

        this.isMoving = true;

        this.positionUserLayer();

        if (this.isOpen()) {
            this.deactivateLayer();
        } else {
            this.activateLayer();
        }

        //var _self = this;
        setTimeout(function() {
            this.isMoving = false;
        }.bind(this), 500);

    }

    positionUserLayer() {
        if (this.isSticky()) {
            this.$wrapper.css('top', $('.fr-main-navigation__header').height());
        } else {
            this.$wrapper.css('top', $('.js-top-navigation').height() - $(window).scrollTop());
        }
    }

    isSticky() {
        return $('body').hasClass('js-main-navigation-sticky');
    }

    close() {
        if (this.isOpen()) {
            this.deactivateLayer();
        }
    }

    isOpen() {
        return this.$wrapper.hasClass('js-user-layer-open');
    }

    activateLayer() {
        this.$wrapper.show();
        this.$wrapper.addClass('js-user-layer-open');
        this.$wrapper.find('a').attr('tabIndex', 0);
        //this.isOpen = true;
    }

    deactivateLayer() {
        this.$wrapper.removeClass('js-user-layer-open');
        this.$wrapper.find('a').attr('tabIndex', -1);
        //this.isOpen = false;
        setTimeout(function() {
            this.$wrapper.hide();
        }.bind(this), 500);
    }
}

export default UserLayer;
