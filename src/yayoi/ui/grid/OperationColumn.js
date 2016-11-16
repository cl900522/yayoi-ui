"use strict";
yayoi.initPackages("yayoi.ui.grid");

yayoi.extend("yayoi.ui.grid.OperationColumn", "yayoi.ui.grid.Column", ["yayoi.ui.common.Icon"], function() {
    this.onRendering = function() {};
    this.operations = [];
    this.title = "操作";
    this.width = "100px";

    this.reRender = function() {
        var me = this;
        var container = this.getContainer();

        for(var i=0; i<this.operations.length; i++) {
            var operation = this.operations[i];
            var icon = {icon: this.operations[i].icon, size: "20px", click: function() {
                operation.click(me.getRowData());
            }};
            icon = new yayoi.ui.common.Icon(icon);
            var iconDiv = $("<div style='float:left'></div>");
            container.append(iconDiv);
            icon.placeAt(iconDiv);
        }
        container.css("padding-left", "20px");
    };
});
