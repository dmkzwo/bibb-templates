'use strict';

const $ = require('jquery');
const Utils = require('helpers/Utils');

const NavItems = require('./NavItems');
const NavItem = require('./NavItem');

const scrollMonitor = require('scrollmonitor');


class MainNavigation {

    constructor($wrapper, searchLayer = false, userLayer = false) {
        Utils.logInfo('main nav constructor');

        this.$wrapper = $wrapper;
        this.searchLayer = searchLayer;

        this.initScrollWatchers();

        this.$burger = $wrapper.find('.js-main-nav-burger-container');

        this.navItems = new NavItems();
        this.breadCrumbs = [];
        this.navPath = [];
        this.newActiveHeight = 0;

        this.isProcessing = false;
        this.mayBeInitial = true;
        this.isClickBreadcrumb = false;

        this.initialPageId = 0;

        this.resetNavPath();
        this.resetBreadcrumbs();

        this.$wrapper.on(
            'click',
            '.js-main-nav-item',
            this.handleMainNavItemClick.bind(this)
        );

        this.$wrapper.on(
            'click',
            '.js-main-nav-burger',
            this.handleMainNavBurgerClick.bind(this)
        );

        this.$wrapper.on(
            'click',
            '.js-breadcrumb-link',
            this.handleBreadCrumbLinkClick.bind(this)
        );

        this.$wrapper.on(
            'click',
            '.js-main-navigation-close',
            this.handleMainNavCloseClick.bind(this)
        );

    }

    initScrollWatchers() {
        const elementToWatch = this.$wrapper;
        const elementWatcher = scrollMonitor.create(elementToWatch);
        elementWatcher.lock();

        elementWatcher.stateChange(function () {
            if (elementWatcher.isAboveViewport) {
                this.$wrapper.addClass('fr-main-navigation--sticky');
                $('body').addClass('js-main-navigation-sticky');
                this.positionSearchLayer(true);
                this.fillGap(true);
                this.hideUserLayer();
            } else {
                this.$wrapper.removeClass('fr-main-navigation--sticky');
                $('body').removeClass('js-main-navigation-sticky');
                this.positionSearchLayer(false);
                this.fillGap(false);
            }
        }.bind(this));
    }

    positionSearchLayer(isSticky) {
        if (isSticky) {
            $('.js-header-search-layer').css('top', $('.fr-main-navigation__header').height());
        } else {
            $('.js-header-search-layer').css('top', $('.js-top-navigation').height());
        }
    }

    hideUserLayer() {
        $('.js-user-layer').removeClass('js-user-layer-open').hide();
    }

    fillGap(isSticky) {
        if (isSticky) {
            $('.js-main-navigation-placeholder').css('height', $('.fr-main-navigation__header').height());
        } else {
            $('.js-main-navigation-placeholder').css('height', 0);
        }
    }

    closeSearchLayer() {
        if (this.searchLayer) {
            this.searchLayer.close();
        }
    }

    // Event Handlers

    handleMainNavBurgerClick(e) {
        e.preventDefault();

        if (this.isProcessing) {
            return;
        }

        this.closeSearchLayer();

        const $burgerButton = $(e.currentTarget);

        if ($burgerButton.hasClass('is-active')) {
            this.handleMainNavCloseClick(e);
            $burgerButton.removeClass('is-active');
        } else {
            this.handleMainNavItemClick(e);
            $burgerButton.addClass('is-active');
        }
    }

    handleMainNavItemClick(e) {
        e.preventDefault();

        if (this.isProcessing) {
            return;
        }

        this.closeSearchLayer();

        var pageId = this.processInitialState(e);

        this.isProcessing = true;

        this.setBarLinkState(e);

        // check if nav item is already loaded
        if (this.navItems.existsNavItem(pageId)) {
            // activate nav layer
            const actNavItem = this.navItems.getNavItem(pageId);
            this.updateNavPath(actNavItem);
            this.activateNavLayer(pageId);

        } else {
            var _self = this;
            this.navItems.loadSubItems(pageId)
                .then(this.processSubItems.bind(this))
                .catch(function (jqXHR) {
                    // var errorData = JSON.parse(jqXHR.responseText);
                    // alert(errorData.errors);
                    Utils.logError(jqXHR.responseText)
                    _self.isProcessing = false;
                });

        }
    }

    processInitialState(e) {

        const $actLink = $(e.currentTarget);
        var pageId = $actLink.data('pid');
        Utils.logInfo('main nav item - event: click - pid: ' + pageId + ' - label: ' + $actLink.html());

        if (this.mayBeInitial) {
            const initial = this.$wrapper.data('initial');
            if (initial) {
                const initialNavPath = JSON.parse(JSON.stringify(initial));
                Utils.logInfo('initial: ' + initialNavPath);

                if (this.isInitialPathClicked(pageId, initialNavPath)) {
                    if (initialNavPath.length > 1) {
                        const initialPage = initialNavPath.pop();
                        this.initialPageId = initialPage.pid;

                        Utils.logInfo('initial page id: ', this.initialPageId);

                        Utils.logInfo('has sub items:', initialPage.subItems === true);
                        //Utils.logInfo('initial page id: ' + pageId, navPathPids);
                        if (initialPage.subItems) {
                            pageId = initialPage.pid;
                            this.populateNavPath(initialNavPath);
                        } else {
                            const parentPage = initialNavPath.pop();
                            this.populateNavPath(initialNavPath);
                            pageId = parentPage.pid;
                        }
                    }

                }

                // remove data-initial
                $actLink.removeAttr('data-initial');
            }
        }
        this.mayBeInitial = false;

        return pageId;
    }

    isInitialPathClicked(pageId, initialNavPath) {
        //Utils.logInfo('checkInitial', pageId, initialNavPath[0].pid);
        return (pageId == initialNavPath[0].pid) || (pageId == 0);
    }

    setBarLinkState(e) {
        const $actLink = $(e.currentTarget);

        if ($actLink.hasClass('fr-main-navigation__bar-link')) {
            $('.js-main-nav-item').removeClass('fr-main-navigation__bar-link--trail');
            $actLink.addClass('fr-main-navigation__bar-link--trail');
            this.resetActiveLayerHeight();
        }
    }

    resetBarLinkStates() {
        $('.fr-main-navigation__bar-link').removeClass('fr-main-navigation__bar-link--trail');
    }



    handleBreadCrumbLinkClick(e) {
        e.preventDefault();

        if (this.isProcessing) {
            return;
        }

        this.isClickBreadcrumb = true;
        this.handleMainNavItemClick(e);

        // const $actLink = $(e.currentTarget);
        // const pid = $actLink.data('pid');
        // this.activateNavLayer(pid);

    }

    handleMainNavCloseHover(e) {
        Utils.logInfo('close hover');
    }

    handleMainNavCloseClick(e) {
        Utils.logInfo('close clicked');
        e.preventDefault();

        if (this.isProcessing) {
            return;
        }

        Utils.logInfo('close executed');

        this.closeSearchLayer();

        // this.activateNavLayer(0);
        this.closeAllLayers();
        this.resetBarLinkStates();
        this.resetLayerContainerHeight();

    }


    processSubItems(data, pageId) {
        //Utils.logInfo('processSubItems' + data);
        const objResponse = JSON.parse(JSON.stringify(data));

        if (objResponse.status === 'error') {
            Utils.logError(objResponse.error);
            this.isProcessing = false;
            this.isClickBreadcrumb = false;
            return;
        }

        const objData = objResponse.data;
        const pid = objData.pid;

        //var newNavItem = new NavItem(pid, objData.level, objData.url, objData.label, objData.subItems);
        var newNavItem = new NavItem(objData);
        newNavItem.setInitialPageId(this.initialPageId);

        this.addToBreadCrumbs(newNavItem);
        this.updateNavPath(newNavItem);

        newNavItem.addBreadcrumbs(this.createBreadCrumbHtml());
        this.addSubItemsLayer(newNavItem);

        this.navItems.addNavItem(newNavItem);

        var _self = this;
        setTimeout(function () {
            _self.activateNavLayer(pid);
        }, 100);
    }


    // Layer functions

    addSubItemsLayer(navItem) {
        Utils.logInfo('function: addSubItemsLayer');
        this.$wrapper.find('.fr-main-navigation__layer-container').append(navItem.createNavLayerHtml());
    }

    activateNavLayer(pid) {
        Utils.logInfo('function: activateNavLayer(' + pid + ')');

        this.isProcessing = true;

        const navItem = this.navItems.getNavItem(pid);

        this.reorganizeNavLayers(navItem);
        this.adjustActiveLayerHeight();
        this.adjustTabIndices(navItem);
        this.adjustLayerContainerHeight();
        this.adjustScrollPaneHeight();

        // wait for the animation to complete
        // sync this time with the css value
        var _self = this;
        setTimeout(function () {
            _self.isProcessing = false;
            _self.isClickBreadcrumb = false;
        }, 500);  // 0.5s
    }

    reorganizeNavLayers(navItem) {
        Utils.logInfo('function: reorganizeNavLayers', this.navPath);
        // reset
        this.$wrapper.find('.js-main-navigation-layer')
            .removeClass('fr-main-navigation__layer--trail')
            .removeClass('fr-main-navigation__layer--active')
            .removeClass('fr-main-navigation__layer--show');

        const newLevel = navItem.level;
        var trailFound = false;
        const startLevel = this.isMobile() ? 0 : 1;

        for (var i = startLevel; i < this.navPath.length; i++) {
            var level = i;
            // Utils.logInfo(level + ' ' + newLevel);
            var navPathPid = this.navPath[i].pid;
            if (level < newLevel) {
                this.$wrapper.find('#js-main-navigation-layer-' + navPathPid).addClass('fr-main-navigation__layer--trail');
                if (this.$wrapper.find('#js-main-navigation-layer-' + navPathPid).length) {
                    trailFound = true;
                }
            } else if (level === newLevel) {
                this.$wrapper.find('#js-main-navigation-layer-' + navPathPid).addClass('fr-main-navigation__layer--active');
                Utils.logInfo('setHeight', this.newActiveHeight);
                this.$wrapper.find('#js-main-navigation-layer-' + navPathPid).css('min-height', this.newActiveHeight + 'px');
                if (this.isClickBreadcrumb) {
                    Utils.logInfo('add show');
                    this.$wrapper.find('#js-main-navigation-layer-' + navPathPid).addClass('fr-main-navigation__layer--show');
                }
            }
        }
    }

    adjustTabIndices(navItem) {
        this.$wrapper.find('.js-main-navigation-layer a').attr('tabIndex', -1);

        const $actLayer = this.$wrapper.find('#js-main-navigation-layer-' + navItem.pid);
        $actLayer.find('a').attr('tabIndex', 0);
    }

    adjustActiveLayerHeight() {
        var _self = this;
        this.$wrapper.find('.fr-main-navigation__layer--trail, .fr-main-navigation__layer--active').each(function (index) {
            var actHeight = $(this).height() * 1;
            _self.newActiveHeight = (actHeight > _self.newActiveHeight) ? actHeight : _self.newActiveHeight;
            _self.newActiveHeight = Math.floor(_self.newActiveHeight);
            Utils.logInfo(index, actHeight, _self.newActiveHeight);
        });
    }

    resetActiveLayerHeight() {
        this.newActiveHeight = 0;
        this.$wrapper.find('.fr-main-navigation__layer').css('min-height', 0);
    }

    adjustLayerContainerHeight() {
        var newContainerHeight = 0;
        this.$wrapper.find('.fr-main-navigation__layer--active').each(function (index) {
            var actHeight = $(this).height() * 1;
            newContainerHeight = (actHeight > newContainerHeight) ? actHeight : newContainerHeight;
            Utils.logInfo('newContainerHeight', newContainerHeight);
        });
        this.$wrapper.find('.fr-main-navigation__layer-container').css('height', (Math.floor(newContainerHeight) + 15) + 'px');
    }

    adjustScrollPaneHeight() {
        var windowInnerHeight = window.innerHeight;
        var breadCrumbHeight = $('.fr-main-navigation__breadcrumbs').height();
        var navBarHeight = $('.fr-main-navigation').height();
        var subItemsHeight = $('.fr-main-navigation__layer-subitems-list').height();

        var newScrollPaneHeight = windowInnerHeight - breadCrumbHeight - navBarHeight - 100;
        Utils.logInfo('scrollpane', newScrollPaneHeight, subItemsHeight);

        var heightStr = 'auto';
        if (newScrollPaneHeight < subItemsHeight) {
            heightStr = (Math.floor(newScrollPaneHeight)) + 'px';
        }

        this.$wrapper.find('.fr-main-navigation__layer-subitems .container').css('height', heightStr);
    }

    resetLayerContainerHeight() {
        var newContainerHeight = 0;
        var _self = this;
        setTimeout(function () {
            _self.$wrapper.find('.fr-main-navigation__layer-container').css('height', newContainerHeight + 'px');
        }, 500);
    }

    closeAllLayers() {
        this.$wrapper.find('.js-main-navigation-layer')
            .removeClass('fr-main-navigation__layer--trail')
            .removeClass('fr-main-navigation__layer--active')
            .removeClass('fr-main-navigation__layer--show');
    }

    // Breadcrumb functions

    resetBreadcrumbs() {
        this.addToBreadCrumbsByPid(0, 'Startseite');
    }

    addToBreadCrumbs(navItem) {
        Utils.logInfo('function: addToBreadCrumbs');
        Utils.logInfo(navItem);
        const newBreadCrumbLink = navItem.createBreadCrumbLinkHtml();
        this.breadCrumbs[navItem.pid] = newBreadCrumbLink;
    }

    addToBreadCrumbsByPid(pid, label) {
        const newBreadCrumbLink = NavItem.createBreadCrumbHtmlLinkStatic(pid, label)
        this.breadCrumbs[pid] = newBreadCrumbLink;
    }

    createBreadCrumbHtml() {
        var breadCrumbHtml = '';
        breadCrumbHtml += '<div class="fr-main-navigation__breadcrumbs">';
        breadCrumbHtml += '    <div class="container">';
        breadCrumbHtml += '    <div class="fr-main-navigation__breadcrumbs-inside">';
        breadCrumbHtml += '        <a class="js-main-navigation-close fr-main-navigation__layer-close"><svg><use href="/images/sprites/misc.svg#close" xlink:href="/images/sprites/misc.svg#close"></use></svg></a>';
        if (this.showBreadcrumbs()) {
            breadCrumbHtml += '        <ul class="fr-main-navigation__breadcrumb-list">';
            const startLevel = this.isMobile() ? 0 : 1;
            for (var i = startLevel; i < this.navPath.length - 1; i++) {
                breadCrumbHtml += this.breadCrumbs[this.navPath[i].pid];
            }
            breadCrumbHtml += '        </ul>';
        } else {
            breadCrumbHtml += '&nbsp;';
        }
        breadCrumbHtml += '    </div>';
        breadCrumbHtml += '    </div>';
        breadCrumbHtml += '</div>';
        return breadCrumbHtml;

    }

    showBreadcrumbs() {
        return this.navPath.length > (this.isMobile() ? 1 : 2);
    }


    updateNavPath(navItem) {
        this.adjustNavPath(navItem.level);
        this.navPath.push(
            {
                pid: navItem.pid
            }
        );
        Utils.logInfo(this.navPath);
    }

    adjustNavPath(level) {
        this.navPath = this.navPath.slice(0, level);
    }

    resetNavPath() {
        this.navPath = [{pid: 0}];
    }

    addPidToNavPath(pid) {
        this.navPath.push(
            {
                pid: pid
            }
        );
    }

    populateNavPath(initialNavPath) {
        this.resetNavPath();
        for (var i = 0; i < initialNavPath.length; i++) {
            const actPid = initialNavPath[i].pid;
            const actLabel = initialNavPath[i].label;
            this.addPidToNavPath(actPid);
            this.addToBreadCrumbsByPid(actPid, actLabel);

        }
    }

    isMobile() {
        return $(this.$burger).css('display') === 'block';
    }
}

export default MainNavigation;
