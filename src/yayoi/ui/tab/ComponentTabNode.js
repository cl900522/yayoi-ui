"use strict";
yayoi.initPackages("yayoi.ui.tab");

yayoi.extend("yayoi.ui.tab.ComponentTabNode", "yayoi.ui.tab.TabNode", [], function() {
    this.component = null;

    this.onRendering = function() {
        var container = this.getContainer();
        component.placeAt(container);
    };
});
