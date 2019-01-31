'use strict';

const $ = require('jquery');
const Utils = require('helpers/Utils');


const ContentToggle = (($) => {

    const NAME = 'contentToggle';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    const Default = {}

    class ContentToggle {

        static get Default() {
            return Default
        }

        constructor($element, config) {
            Utils.logInfo('content toggle constructor');

            this._config = $.extend({}, Default, config);
            this.$element = $element;

            this.isMoving = false;
            this.isOpen = false;

            this.$toggleTarget = this.$element.data('toggle-target');
            this.$contentHandle = $('#' + this.$toggleTarget);

            this.$element.on(
                'click',
                this.toggleContent.bind(this)
            );

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
            setTimeout(function () {
                this.isMoving = false;
            }.bind(this), 200);

        }

        activateLayer() {
            var _self = this;
            this.$contentHandle.slideToggle(200, function () {
                _self.$element.addClass('c-toggle__link--active');
                _self.$contentHandle.find('a').attr('tabindex', '0');
                _self.isOpen = true;
            });
        }

        deactivateLayer() {
            var _self = this;
            this.$contentHandle.slideToggle(200, function () {
                _self.$element.removeClass('c-toggle__link--active');
                _self.$contentHandle.find('a').attr('tabindex', '-1');
                _self.isOpen = false;
            });
        }

        static _jQueryInterface(config) {
            config = config || {};
            return this.each(() => {
                let $this = $(this);
                let _config = $.extend(
                    {},
                    ContentToggle.Default,
                    $this.data(),
                    typeof config === 'object' && config
                );

                new ContentToggle(this, _config)
            })
        }
    }


    $.fn[NAME] = ContentToggle._jQueryInterface;
    $.fn[NAME].Constructor = ContentToggle;
    $.fn[NAME].noConflict = () => {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return ContentToggle._jQueryInterface
    };

    return ContentToggle;

})(jQuery);

export default ContentToggle;