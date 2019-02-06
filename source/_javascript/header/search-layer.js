'use strict';

const $ = require('jquery');
const Utils = require('helpers/Utils');


class SearchLayer {

    constructor($wrapper) {
        Utils.logInfo('search layer constructor');

        this.$wrapper = $wrapper;
        this.isMoving = false;
        this.isOpen = false;

        this.userLayer = false;

        //this.initScrollWatchers();
        this.$wrapper.find('a').attr('tabIndex', -1);
        this.$wrapper.find('input').attr('tabIndex', -1);
        this.$wrapper.find('button').attr('tabIndex', -1);


        $('.js-search-layer-toggle').on(
            'click',
            this.handleToggleClick.bind(this)
        );

        $('.js-header-search-layer-close').on(
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

        this.positionSearchLayer();

        if (this.isOpen) {
            this.deactivateLayer();
        } else {
            this.activateLayer();
            this.userLayer.close();
        }

        //var _self = this;
        setTimeout(function() {
            this.isMoving = false;
        }.bind(this), 500);

    }

    positionSearchLayer() {
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
        if (this.isOpen) {
            this.deactivateLayer();
        }
    }

    setUserLayer(userLayer) {
        this.userLayer = userLayer;
        console.log(this.userLayer);
    }

    activateLayer() {
        this.$wrapper.addClass('js-header-search-layer-open');
        this.$wrapper.find('a').attr('tabIndex', 0);
        this.$wrapper.find('input').attr('tabIndex', 0);
        this.$wrapper.find('button').attr('tabIndex', 0);
        this.isOpen = true;
    }

    deactivateLayer() {
        this.$wrapper.removeClass('js-header-search-layer-open');
        this.$wrapper.find('a').attr('tabIndex', -1);
        this.$wrapper.find('input').attr('tabIndex', -1);
        this.$wrapper.find('button').attr('tabIndex', -1);
        this.isOpen = false;
    }
}

export default SearchLayer;
