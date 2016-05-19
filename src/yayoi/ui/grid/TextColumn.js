"use strict";
yayoi.util.initPackages("yayoi.ui.grid");

yayoi.util.extend("yayoi.ui.grid.TextColumn", "yayoi.ui.grid.Column", [], function() {
    this.onRendering = function() {};

    this.reRender = function() {
        var container = this.getContainer();
        container.html(this.decorate(this.getRowData()));
    };
});
