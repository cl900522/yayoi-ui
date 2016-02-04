"use strict";
yayoi.util.initPackages("yayoi.ui.tab");

yayoi.util.extend("yayoi.ui.tab.TabNode", "yayoi.ui.common.Component", [], function(){
    this.code;
    this.title;
    this.closeable = true;
});

yayoi.util.extend("yayoi.ui.tab.URLTabNode", "yayoi.ui.tab.TabNode", [], function(){
    this.url;

    this.onRendering = function() {
        var container = this.getContainer();
        var frame = $('<iframe src="'+this.url+'"scrolling="auto" frameborder="0"></iframe>');
        container.append(frame);
    };
    this.refresh = function() {
        this.render();
    };
});
yayoi.util.extend("yayoi.ui.tab.HTMLTabNode", "yayoi.ui.tab.TabNode", [], function(){
    this.html;

    this.onRendering = function() {
        var container = this.getContainer();
        container.html(this.html);
    };
    this.refresh = function() {
        this.render();
    };
});
yayoi.util.extend("yayoi.ui.tab.ComponentTabNode", "yayoi.ui.tab.TabNode", [], function(){
    this.component;

    this.onRendering = function() {
        var container = this.getContainer();
        component.setContainer(container);
        component.render();
    };
    this.refresh = function() {
        this.render();
    };
});

yayoi.util.extend("yayoi.ui.tab.Tab", "yayoi.ui.common.Component", [], function(){
    this.navBar;
    this.contentContainer;
    this.tabNodes = {};

    this.onRendering = function() {
        var container = this.getContainer();

        this.navBar = $('<ul></ul>');
        this.contentContainer = $('<div><div>');
        this.navBar.addClass("yayoi-ui-tabs-nav");
        this.contentContainer.addClass("yayoi-ui-tabs-main");

        container.addClass("yayoi-ui-tabs");
        container.append(this.navBar);
        container.append(this.contentContainer);

        var tabs = this.tabs;
        for(var i=0; i<tabs.length; i++) {
            this.addTab(tabs[i]);
        }
    };
    this.resize = function() {
        var container = this.getContainer();
        var frameHeight = container.height() - 40;
        this.contentContainer.height(frameHeight + "px");
    };
    this.addTab = function(tab) {
        if(!(tab instanceof yayoi.ui.tab.TabNode)){
            var tab;
            if(tab.hasOwnProperty("url")){
                tab = new yayoi.ui.tab.URLTabNode(tab);
            }
            if(tab.hasOwnProperty("html")){
                tab = new yayoi.ui.tab.HTMLTabNode(tab);
            }
            if(tab.hasOwnProperty("component")){
                tab = new yayoi.ui.tab.HTMLTabNode(tab);
            }
            this.addTab(tab);
            return;
        }

        if(this.tabNodes[tab.code]){
            this.tabNodes[tab.code].active();
            return;
        }

        this.createNavBar(tab);

        var tabContainer = $("<div data-tabcode='" + tab.code + "' class='active'></div>")
        this.deactiveAll();
        this.contentContainer.append(tabContainer);
        tab.setContainer(tabContainer);
        tab.render();

        this.tabNodes[tab.code] = tab;
    };
    this.createNavBar = function(tabNode){
        var that = this;

        var tabNav = $("<li data-tabcode=" + tabNode.code + " class='active'><span>" + tabNode.title + "</span><a class='closeTab'></a></li>");
        var closeButton = tabNav.find(".closeTab");
        if(tabNode.closeable){
            closeButton.bind("click", function(event){
                that.closeTab(tabNode);
            });
            closeButton.show();
        } else {
            closeButton.hide();
        }

        tabNav.bind("click", function(event){
            var tabCode = $(this).attr("data-tabcode");

            if(tabCode){
                that.activeTab(tabCode);
            }
        });

        this.navBar.append(tabNav);
    };
    this.getTab = function(code) {
        return this.tabNodes[code];
    };
    this.deactiveAll = function() {
        for(var p in this.tabNodes){
            var selector = "[data-tabcode='" + this.tabNodes[p].code + "']"
            this.navBar.find(selector).removeClass("active").addClass("deactive");
            this.contentContainer.find(selector).removeClass("active").addClass("deactive");
        }
    };
    this.activeTab = function(tabNode) {
        if(!(tabNode instanceof yayoi.ui.tab.TabNode)){
            var tab = this.getTab(tabNode);
            this.activeTab(tab);
            return;
        }

        var selector = "[data-tabcode='" + tabNode.code + "']";
        this.deactiveAll();
        this.navBar.find(selector).removeClass("deactive").addClass("active");
        this.contentContainer.find(selector).removeClass("deactive").addClass("active");
    };
    this.closeTab = function(tabNode) {
        if(!(tabNode instanceof yayoi.ui.tab.TabNode)){
            var tab = this.getTab(tabNode);
            this.closeTab(tab);
            return;
        }

        var selector = "[data-tabcode='" + tabNode.code + "']";
        this.deactiveAll();
        this.navBar.find(selector).remove();
        this.contentContainer.find(selector).remove();
        delete this.tabNodes[tabNode.code];

        var lastTabCode = this.navBar.find(">li:last").attr("data-tabcode");
        if(lastTabCode) {
            this.activeTab(lastTabCode);
        }
    };
});
