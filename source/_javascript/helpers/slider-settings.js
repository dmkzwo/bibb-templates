'use strict';

import {breakpoints} from "helpers/breakpoints";

const slickSliderSettings = [];

// Full width slider (static on mobile)
slickSliderSettings['.js-row-slider.c-teaser-row-slider--xs-static'] =
    {
        slidesToShow: 4,
        slidesToScroll: 4,
        centerPadding: '0px',
        infinite: true,
        dots: true,
        responsive: [
            {
                breakpoint: breakpoints['xl'],
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: breakpoints['lg'],
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false
                }
            },
            {
                breakpoint: breakpoints['sm'],
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: '0px',
                    infinite: false,
                    dots: false,
                    arrows: false,
                    vertical: true
                }
            }
        ]
    };

// Full width slider (non static on mobile)
slickSliderSettings['.js-row-slider:not(.c-teaser-row-slider--xs-static)'] =
    {
        slidesToShow: 4,
        slidesToScroll: 4,
        centerPadding: '0px',
        infinite: true,
        dots: true,
        responsive: [
            {
                breakpoint: breakpoints['xl'],
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: breakpoints['lg'],
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false
                }
            },
            {
                breakpoint: breakpoints['sm'],
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };

// Content column slider
slickSliderSettings['.fr-main-column .js-content-slider'] =
    {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: '0px',
        infinite: true,
        responsive: [
            {
                breakpoint: breakpoints['xl'],
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: breakpoints['lg'],
                settings: {
                    slidesToShow: 2,
                    arrows: false
                }
            },
            {
                breakpoint: breakpoints['md'],
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: breakpoints['sm'],
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    arrows: false
                }
            }
        ]
    };

// Right column slider
slickSliderSettings['.fr-rc-column .js-content-slider'] =
    {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: '0px',
        infinite: true,
        responsive: [
            {
                breakpoint: breakpoints['lg'],
                settings: {
                    slidesToShow: 2,
                    arrows: false
                }
            },
            {
                breakpoint: breakpoints['md'],
                settings: {
                    slidesToShow: 1,
                    arrow: false
                }
            },
            {
                breakpoint: breakpoints['sm'],
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    arrows: false
                }
            }
        ]
    };

// Vertical slider (events)
slickSliderSettings['.js-vertical-slider'] =
    {
        slidesToShow: 3,
        slidesToScroll: 1,
        centerPadding: '0px',
        infinite: true,
        vertical: true
    };

export const sliderSettings = slickSliderSettings;