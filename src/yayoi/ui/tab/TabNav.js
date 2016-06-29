"use strict";
yayoi.initPackages("yayoi.ui.tab");

yayoi.extend("yayoi.ui.tab.TabNav", "yayoi.ui.common.BasicComponent", ["yayoi.ui.common.Icon"], function() {
    this.title = null;
    this.active = true;
    this.closeable = true;

    this.closeIcon = null;
    this.node = null;
    this.tab = null;

    this.onRendering = function() {
        var container = this.getContainer();
        container.html("<span></span><div class='closeTab'></div>");
        this.closeIcon = new yayoi.ui.common.Icon({
            icon: "remove",
            size: "10px"
        });
        this.closeIcon.placeAt(container.find(".closeTab"));
    };
    this.afterRender = function() {

    };
    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;
        container.bind("click", function(event) {
            that.tab.activeTab(that);
        });
        this.closeIcon.setClick(function(event) {
            that.tab.closeTab(that);
        });
    };
    this.setCloseable = function(closeable) {
        this.closeable = closeable;
        this.invalidate();
    };
    this.setTitle = function(title) {
        this.title = title;
        this.invalidate();
    };
    this.setActive = function(active) {
        this.node.setActive(active);
        this.active = active;
        this.invalidate();
    };
    this.reRender = function() {
        var container = this.getContainer();
        container.find("span").html(this.title);
        this.closeIcon.setVisible(this.closeable);
        if (this.active) {
            container.removeClass("deactive").addClass("active");
            this.closeIcon.setColor("#60a7ff");
        } else {
            container.removeClass("active").addClass("deactive");
            this.closeIcon.setColor("white");
        }
    };
    this.close = function() {
        this.node.close();
        var container = this.getContainer();
        container.remove();
    };
});
