"use strict";
yayoi.initPackages("yayoi.ui.tab");

yayoi.extend("yayoi.ui.tab.HTMLTabNode", "yayoi.ui.tab.TabNode", [], function() {
    this.html;

    this.onRendering = function() {
        var container = this.getContainer();
        container.html(this.html);
    };
});
