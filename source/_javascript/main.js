const $ = require('jquery');

// third party modules
import 'popper.js';
import 'bootstrap';
import 'slick-carousel';
import 'vendor/ekko-lightbox';
import svg4everybody from 'svg4everybody';

const MainNavigation = require('navigation/main-navigation').default;
const PageNavigation = require('navigation/page-navigation').default;
const SearchLayer = require('header/search-layer').default;
const UserLayer = require('navigation/user-layer').default;
const HeaderStage = require('header/header-stage').default;

import {sliderSettings} from "helpers/slider-settings";
const Utils = require('helpers/Utils');
import 'helpers/image-copyright';
import 'helpers/tab-toggle';
import 'helpers/content-toggle';


$(document).ready(function () {

    svg4everybody();

    initLightbox();
    initSliders();
    initCopyright();
    initToggles();

    var $searchLayerWrapper = $('.js-header-search-layer');
    var searchLayer = new SearchLayer($searchLayerWrapper);

    var $userLayerWrapper = $('.js-user-layer');
    var userLayer = new UserLayer($userLayerWrapper);

    var $mainNavigationWrapper = $('.js-main-navigation');
    var mainNavigation = new MainNavigation($mainNavigationWrapper, searchLayer, userLayer);

    var $pageNavigationWrapper = $('.js-page-navigation');
    var pageNavigation = new PageNavigation($pageNavigationWrapper);

    var $homepageStage = $('.js-stage');
    var headerStage = new HeaderStage($homepageStage);

});


function initCopyright() {
    $('img[data-copyright]').each(function () {
        $(this).imageCopyright();
    });
}

function initToggles() {
    $('.js-toggle-tab').each(function () {
        $(this).tabToggle();
    });
    $('.js-content-toggle').each(function () {
        $(this).contentToggle();
    });
}

function initLightbox() {
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
}

function initSliders() {


    for (var selector in sliderSettings) {
        $(selector).slick(
            sliderSettings[selector]
        ).on('beforeChange', function () {
            $(this).addClass('slider-moving');
        }).on('afterChange', function () {
            $(this).removeClass('slider-moving');
        }).on('breakpoint', function () {
            initCopyright();
        });
    }
}