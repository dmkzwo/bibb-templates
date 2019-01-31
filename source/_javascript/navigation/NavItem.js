'use strict';

const Utils = require('helpers/Utils');

class NavItem {

    constructor(data = false) {

        this.pid = 0;
        this.level = 0;
        this.label = '';
        this.url = '';
        this.subItems = [];
        this.hideInLayer = false;

        if (data) {
            this.pid = data.pid;
            this.level = data.level;
            this.label = data.label;
            this.url = data.url;
            this.subItems = data.subItems;
            this.hideInLayer = data.hideInLayer;
        }

        this.initialPageId = -1;

        this.breadcrumbs = '';

    }

    hasSubItems() {
        return this.subItems.length > 0;
    }

    addBreadcrumbs(breadcrumbs) {
        this.breadcrumbs = breadcrumbs;
    }

    setInitialPageId(initialPageId) {
        this.initialPageId = initialPageId;
    }

    createNavLayerHtml() {
        var numSubItems = this.subItems.length;
        Utils.logInfo(numSubItems);
        var columnLayoutCssClass = '';
        if (numSubItems > 8) {
            columnLayoutCssClass = 'fr-main-navigation__layer-subitems--columns-max';
        } else if (numSubItems > 4) {
            columnLayoutCssClass = 'fr-main-navigation__layer-subitems--columns-high';
        } else {
            columnLayoutCssClass = 'fr-main-navigation__layer-subitems--columns-low';
        }
        var layerHtml = '';
        layerHtml += '<div id="js-main-navigation-layer-' + this.pid + '" class="fr-main-navigation__layer fr-main-navigation__layer-level-' + this.level + ' js-main-navigation-layer">';
        layerHtml += this.breadcrumbs;
        layerHtml += '    <div class="fr-main-navigation__layer-subitems ' + (!this.hideInLayer ? 'fr-main-navigation__layer-subitems--with-act-page' : '') + '">';
        layerHtml += '        <div class="container">';
        if (!this.hideInLayer) {
            layerHtml += '<div class="fr-main-navigation__layer-actpage">';
            layerHtml += '    <a href="' + this.url + '" class="fr-main-navigation__layer-actpage-link">' + this.label + '</a>';
            layerHtml += '</div>';
        }
        layerHtml += '            <ul class="fr-main-navigation__layer-subitems-list ' + columnLayoutCssClass + '">';
        for (var key in this.subItems) {
            const page = this.subItems[key];
            layerHtml += this.createNavItemHtml(page);
        }
        layerHtml += '            </ul>';
        layerHtml += '        </div>';
        layerHtml += '    </div>';
        layerHtml += '</div>';
        return layerHtml;
    }

    createNavItemHtml(page) {
        var output = '';
        output += '<li class="fr-main-navigation__layer-linkitem ' + (page.hasSubItems ? 'fr-main-navigation__layer-linkitem--withsubitems' : '') + '">';
        var addClass = (page.pid == this.initialPageId) ? 'fr-main-navigation__layer-link-subitems--active' : '';

        output += '<a class="fr-main-navigation__layer-link ' + addClass + ' ' + (page.hasSubItems ? 'fr-main-navigation__layer-link--withsubitems' : '') + '" href="' + page.url + '" data-pid="' + page.pid + '" tabIndex="0">' + page.label + '</a>';
        if (page.hasSubItems) {
            output += '<a class="fr-main-navigation__layer-link-subitems js-main-nav-item" href="#" data-pid="' + page.pid + '" tabIndex="0" title="Unterseiten von ' + page.label + '"><svg><use href="/images/sprites/misc.svg#arrow" xlink:href="/images/sprites/misc.svg#arrow"></use></svg></a>';
        }
        output += '</li>';
        return output;
    }

    createBreadCrumbLinkHtml() {
        return NavItem.createBreadCrumbHtmlLinkStatic(this.pid, this.label);
    }

    static createBreadCrumbHtmlLinkStatic(pid, label) {
        var output = '';
        output += '<li class="fr-main-navigation__breadcrumb-item">';
        output += '    <a href="#" class="js-breadcrumb-link fr-main-navigation__breadcrumb-link" data-pid="' + pid + '">';
        output += '    <svg><use href="/images/sprites/misc.svg#arrow-back" xlink:href="/images/sprites/misc.svg#arrow-back"></use></svg><span>' + label + '</span></a>';
        output += '    </a>';
        output += '</li>';
        return output;
    }

}

module.exports = NavItem;