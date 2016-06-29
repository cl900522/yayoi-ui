"use strict";
yayoi.initPackages("yayoi.ui.tab");

yayoi.extend("yayoi.ui.tab.TabNode", "yayoi.ui.common.BasicComponent", [], function() {
    this.code;
    this.title;
    this.closeable = true;
    this.active = true;

    this.refresh = function() {
        this.render();
    };
    this.setActive = function(active) {
        this.active = active;
        this.invalidate();
    };
    this.reRender = function() {
        var container = this.getContainer();
        if (this.active) {
            container.removeClass("deactive").addClass("active");
        } else {
            container.removeClass("active").addClass("deactive");
        }
    };
    this.close = function() {
        var container = this.getContainer();
        container.remove();
    };
});
