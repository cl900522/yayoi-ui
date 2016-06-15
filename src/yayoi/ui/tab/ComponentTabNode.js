"use strict";
yayoi.initPackages("yayoi.ui.tab");

yayoi.extend("yayoi.ui.tab.ComponentTabNode", "yayoi.ui.tab.TabNode", [], function() {
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
