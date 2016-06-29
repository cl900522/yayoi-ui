"use strict";
yayoi.initPackages("yayoi.ui.tab");

yayoi.extend("yayoi.ui.tab.Tab", "yayoi.ui.common.BasicComponent", ["yayoi.ui.tab.URLTabNode", "yayoi.ui.tab.HTMLTabNode", "yayoi.ui.tab.ComponentTabNode", "yayoi.ui.tab.TabNav"], function() {
    this.navBar;
    this.contentContainer;
    this.tabNavs = {};

    this.beforeRender = function() {

    };
    this.onRendering = function() {
        var container = this.getContainer();

        this.navBar = $('<ul></ul>');
        this.contentContainer = $('<div><div>');
        this.navBar.addClass("yayoi-ui-tabs-nav");
        this.contentContainer.addClass("yayoi-ui-tabs-main");

        container.addClass("yayoi-ui-tabs");
        container.append(this.navBar);
        container.append(this.contentContainer);
    };
    this.afterRender = function() {
        var tabs = this.tabs;
        for (var i = 0; i < tabs.length; i++) {
            this.addTab(tabs[i]);
        }
    };
    this.addTab = function(tab) {
        var tabNav = this.tabNavs[tab.code];
        this.deactiveAll();
        if (tabNav) {
            tabNav.setActive(true);
            return;
        }

        tabNav = this.createTabNav(tab);
        this.tabNavs[tab.code] = tabNav;
        tabNav.setActive(true);
    };
    this.createTabNav = function(tabNode) {
        /*create tabNode*/
        if (tabNode.hasOwnProperty("url")) {
            tabNode = new yayoi.ui.tab.URLTabNode(tabNode);
        }
        if (tabNode.hasOwnProperty("html")) {
            tabNode = new yayoi.ui.tab.HTMLTabNode(tabNode);
        }
        if (tabNode.hasOwnProperty("component")) {
            tabNode = new yayoi.ui.tab.ComponentTabNode(tabNode);
        }
        var tabNodeDiv = $("<div data-tabcode='" + tabNode.code + "'></div>")
        this.contentContainer.append(tabNodeDiv);
        tabNode.placeAt(tabNodeDiv);

        /*create tabNav*/
        var tabNavLi = $("<li data-tabcode=" + tabNode.code + "></li>");
        var tabNav = new yayoi.ui.tab.TabNav({
            node: tabNode,
            code: tabNode.code,
            title: tabNode.title,
            tab: this,
            closeable: tabNode.closeable
        });
        this.navBar.append(tabNavLi);
        tabNav.placeAt(tabNavLi);
        return tabNav;
    };
    this.getTab = function(code) {
        return this.tabNavs[code];
    };
    this.deactiveAll = function() {
        for (var p in this.tabNavs) {
            this.tabNavs[p].setActive(false);
        }
    };
    this.activeTab = function(tabNode) {
        if (typeof(tabNode) == "string") {
            tabNode = this.getTab(tabNode);
        }

        if(tabNode) {
            this.deactiveAll();
            tabNode.setActive(true);
        }
    };
    this.closeTab = function(tabNode) {
        if (typeof(tabNode) == "string") {
            tabNode = this.getTab(tabNode);
        }
        tabNode.close();

        var lastTabCode = this.navBar.find(">li:last").attr("data-tabcode");
        if (lastTabCode) {
            this.activeTab(lastTabCode);
        }
    };
    this.resize = function() {
        var container = this.getContainer();
        var frameHeight = container.height() - 40;
        this.contentContainer.height(frameHeight + "px");
    };
});
