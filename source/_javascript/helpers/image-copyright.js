'use strict';

const $ = require('jquery');
const Utils = require('helpers/Utils');


const ImageCopyright = (($) => {

    const NAME = 'imageCopyright';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const Default = {
    }

    class ImageCopyright {

        static get Default() {
            return Default
        }

        constructor($element, config) {
            Utils.logInfo('image copyright constructor');

            this._config = $.extend({}, Default, config);
            this.$element = $element;

            this.isMoving = false;
            this.isOpen = false;

            if (!this.isProcessed()) {
                let [ containerHandle, layerHandle, linkHandle ] = this.addCopyright();
                this.$containerHandle = containerHandle;
                this.$layerHandle = layerHandle;
                this.$linkHandle = linkHandle;
            } else {
                const $parentFigure = this.getParentFigure();
                this.$containerHandle = $parentFigure.find('.c-image-container');
                this.$layerHandle = $parentFigure.find('.js-copyright-close');
                this.$linkHandle = $parentFigure.find('.js-copyright-open');
            }

            this.$linkHandle.on(
                'click',
                this.toggleLayer.bind(this)
            );

            this.$layerHandle.on(
                'click',
                this.toggleLayer.bind(this)
            );

        }


        addCopyright() {
            const copyrightText = this.$element.data('copyright');

            const copyrightLayerHtml = '<div class="c-image-container__copyright-layer js-copyright-close"><div class="c-image-container__copyright-layer-close"><svg><use href="/images/sprites/misc.svg#close" xlink:href="/images/sprites/misc.svg#close"></use></svg></div>' + copyrightText + '</div>';
//            const copyrightLinkHtml = '<a href="#" class="c-image-container__copyright-link js-copyright-open" title="Copyright Informationen anzeigen"><svg><use href="/images/sprites/misc.svg#copyright" xlink:href="/images/sprites/misc.svg#copyright"></use></svg></a>';
            const copyrightLinkHtml = '<a href="#" class="c-image-container__copyright-link js-copyright-open" title="Copyright Informationen anzeigen"><i class="icon-Copyright"></i></a>';

            const $parentFigure = this.getParentFigure();

            $parentFigure.children().first().wrap('<div class="c-image-container" />');
            $parentFigure.children().first().append(copyrightLayerHtml);
            $parentFigure.children().first().append(copyrightLinkHtml);

            this.$element.attr('data-cradded', '1');

            return [ $parentFigure.find('.c-image-container'), $parentFigure.find('.js-copyright-close'), $parentFigure.find('.js-copyright-open') ];
        }

        isProcessed() {
            return (this.$element.attr('data-cradded') === '1');
        }

        getParentFigure() {
            return this.$element.parents('figure');
        }

        toggleLayer(e) {
            e.preventDefault();

            if (this.isMoving) {
                return;
            }

            this.isMoving = true;

            if (this.isOpen) {
                this.deactivateLayer();
            } else {
                this.activateLayer();
            }

            //var _self = this;
            setTimeout(function() {
                this.isMoving = false;
            }.bind(this), 500);

        }

        activateLayer() {
            this.$containerHandle.addClass('c-image-container--active')
            this.$layerHandle.addClass('c-image-container__copyright-layer--active');
            this.$linkHandle.addClass('c-image-container__copyright-link--active');
            this.isOpen = true;
        }

        deactivateLayer() {
            this.$containerHandle.removeClass('c-image-container--active')
            this.$layerHandle.removeClass('c-image-container__copyright-layer--active');
            this.$linkHandle.removeClass('c-image-container__copyright-link--active');
            this.isOpen = false;
        }

        static _jQueryInterface(config) {
            config = config || {};
            return this.each(() => {
                let $this = $(this);
                let _config = $.extend(
                    {},
                    ImageCopyright.Default,
                    $this.data(),
                    typeof config === 'object' && config
                );

                new ImageCopyright(this, _config)
            })
        }
    }



    $.fn[NAME]             = ImageCopyright._jQueryInterface;
    $.fn[NAME].Constructor = ImageCopyright;
    $.fn[NAME].noConflict  = () => {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return ImageCopyright._jQueryInterface
    };

    return ImageCopyright;

})(jQuery);

export default ImageCopyright;