'use strict';

const $ = require('jquery');
const Utils = require('helpers/Utils');


const TabToggle = (($) => {

    const NAME = 'tabToggle';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const Default = {
    }

    class TabToggle {

        static get Default() {
            return Default
        }

        constructor($element, config) {
            Utils.logInfo('content toggle constructor');

            this._config = $.extend({}, Default, config);
            this.$element = $element;

            this.isMoving = false;
            this.isOpen = false;

            this.$element.show();

            if (!this.isProcessed()) {
                let [ contentHandle, linkHandle ] = this.addToggle();
                this.$linkHandle = linkHandle;
                this.$contentHandle = contentHandle;
                this.$contentHandle.find('a').attr('tabindex', '-1');
            } else {
                this.$linkHandle = this.$element.find('.js-toggle-link');
                this.$contentHandle = this.$element.find('.c-toggle__content');
            }

            this.$linkHandle.on(
                'click',
                this.toggleContent.bind(this)
            );

        }


        addToggle() {
            const linkText = this.$element.data('togglelink');

            this.$element.addClass('c-toggle');

            // wrap inner
            this.$element.wrapInner('<div class="c-toggle__content">');

            // append link
            this.$element.append('<div class="c-toggle__link-container"><a href="#" class="c-toggle__link js-toggle-link" title="' + linkText + '"><span class="focus" tabindex="-1"></span></a></div>');

            // mark as processed
            this.$element.attr('data-toggle-created', '1');

            return [ this.$element.find('.c-toggle__content'), this.$element.find('.js-toggle-link') ];
        }

        isProcessed() {
            return (this.$element.attr('data-toggle-created') === '1');
        }

        toggleContent(e) {
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
            this.$contentHandle.addClass('c-toggle__content--active')
            this.$linkHandle.addClass('c-toggle__link--active');
            this.$contentHandle.find('a').attr('tabindex', '0');
            this.isOpen = true;
        }

        deactivateLayer() {
            this.$contentHandle.removeClass('c-toggle__content--active')
            this.$linkHandle.removeClass('c-toggle__link--active');
            this.$contentHandle.find('a').attr('tabindex', '-1');
            this.isOpen = false;
        }

        static _jQueryInterface(config) {
            config = config || {};
            return this.each(() => {
                let $this = $(this);
                let _config = $.extend(
                    {},
                    TabToggle.Default,
                    $this.data(),
                    typeof config === 'object' && config
                );

                new TabToggle(this, _config)
            })
        }
    }



    $.fn[NAME]             = TabToggle._jQueryInterface;
    $.fn[NAME].Constructor = TabToggle;
    $.fn[NAME].noConflict  = () => {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return TabToggle._jQueryInterface
    };

    return TabToggle;

})(jQuery);

export default TabToggle;