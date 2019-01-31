'use strict';

import {breakpoints} from "helpers/breakpoints";

const $ = require('jquery');
const Utils = require('helpers/Utils');

//import 'slick-carousel';

class HeaderStage {

    constructor($wrapper) {
        Utils.logInfo('header stage constructor');

        this.$wrapper = $wrapper;

        this.$slider = $wrapper.find('.js-stage-slider');
        this.$tabs = $wrapper.find('.js-stage-tabs');
        this.stageType = this.$wrapper.data('stage-type');

        //this.preInitSlider();
        this.$slider.on(
            'init',
            this.preInitSlider()
        );

        this.initSlider();

        this.$wrapper.on(
            'click',
            '.js-stage-slider-click',
            this.handleStageTabClick.bind(this)
        );

        const self = this;

        $(window).on(
            'resize',
            function()  { self.doOnResize(); }
        );
    }

    preInitSlider() {
        this.rePositionStageOverlay();
        this.adjustTabIndices();

        var self = this;
        window.setTimeout(function() {
            self.resetCopyrights();
        }, 100);

    }

    initSlider() {
        const self = this;
        this.$slider.slick(
            {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerPadding: '0px',
                infinite: true,
                dots: false,
                arrows: false,
                fade: true
                ,
                responsive: [
                    {
                        breakpoint: breakpoints['md'],
                        settings: {
                            dots: true,
                            fade: false
                        }
                    }
                ]
            }
        ).on('afterChange', function (event, slick, currentSlide) {
            self.setTabs(currentSlide);
            self.adjustTabIndices();
        });

        this.$slider.on('breakpoint', function() {
            self.resetCopyrights();
        });

    }


    setTabs(currentSlide) {
        // reset all tabs
        this.$tabs.find('.fr-header-stage-type-' + this.stageType + '__tab').removeClass('fr-header-stage-type-' + this.stageType + '__tab--active');
        this.$tabs.find('.fr-header-stage-type-' + this.stageType + '__tab-link').removeClass('fr-header-stage-type-' + this.stageType + '__tab-link--active');

        // set current tab
        const $currentSlide = this.$tabs.find('.fr-header-stage-type-' + this.stageType + '__tab').eq(currentSlide);
        $currentSlide.addClass('fr-header-stage-type-' + this.stageType + '__tab--active');
        $currentSlide.find('a').addClass('fr-header-stage-type-' + this.stageType + '__tab-link--active');

        this.$tabs.find('.fr-header-stage-type-' + this.stageType + '__tab-link').attr('tabIndex', 0);
        $currentSlide.find('a').attr('tabIndex', -1);
    }


    handleStageTabClick(e) {
        e.preventDefault();
        let slideIndex = $(e.currentTarget).data('stage-slide');
        var slider = $('.js-stage-slider');
        slider[0].slick.slickGoTo(parseInt(slideIndex));
    }


    adjustTabIndices() {
        this.$wrapper.find('.slick-slide a').attr('tabIndex', -1);
        this.$wrapper.find('.slick-current a').attr('tabIndex', 0);
    }

    resetCopyrights() {
        this.$slider.find('img[data-copyright]').each(function () {
            $(this).imageCopyright();
        });
    }

    doOnResize() {
        this.rePositionStageOverlay();
    }

    rePositionStageOverlay() {
        const $tabContainer = $('.fr-header-stage-type-' + this.stageType + '__tab-container');
        var tabContainerHeight = 0;
        if ($tabContainer.css('display') !== 'none') {
            tabContainerHeight = $tabContainer.height();
        }
        $('.fr-header-stage-type-' + this.stageType + '__overlay').css('bottom', tabContainerHeight + 'px');
        $('.fr-header-stage-type-' + this.stageType + '__copyright').css('bottom', tabContainerHeight + 'px');
    }
}

export default HeaderStage;
