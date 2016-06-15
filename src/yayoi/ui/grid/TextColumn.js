"use strict";
yayoi.initPackages("yayoi.ui.grid");

yayoi.extend("yayoi.ui.grid.TextColumn", "yayoi.ui.grid.Column", [], function() {
    this.onRendering = function() {};

    this.reRender = function() {
        var container = this.getContainer();
        container.html(this.decorate(this.getRowData()));
    };
});
