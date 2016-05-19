"use strict";
yayoi.util.initPackages("yayoi.ui.tab");

yayoi.util.extend("yayoi.ui.tab.HTMLTabNode", "yayoi.ui.tab.TabNode", [], function() {
    this.html;

    this.onRendering = function() {
        var container = this.getContainer();
        container.html(this.html);
    };
    this.refresh = function() {
        this.render();
    };
});
