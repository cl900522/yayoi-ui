"use strict";
yayoi.util.initPackages("yayoi.ui.tab");

yayoi.util.extend("yayoi.ui.tab.ComponentTabNode", "yayoi.ui.tab.TabNode", [], function() {
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
