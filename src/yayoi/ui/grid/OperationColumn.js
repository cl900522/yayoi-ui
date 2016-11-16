"use strict";
yayoi.initPackages("yayoi.ui.grid");

yayoi.extend("yayoi.ui.grid.OperationColumn", "yayoi.ui.grid.Column", ["yayoi.ui.common.Icon"], function(Column) {
    this.onRendering = function() {};
    this.operations = [];
    this.title = "操作";

    this.init = function(params) {
        Column.prototype.init.call(this, params);

        if (this.operations) {
            this.width = 100 + 20 * this.operations.length + "px";
        }
    };

    this.reRender = function() {
        var me = this;
        var container = this.getContainer();

        function genClick(operation, rowData) {
            var click = operation.click;
            return function() {
                click(rowData);
            };
        }

        for (var i = 0; i < this.operations.length; i++) {
            var operation = this.operations[i];
            var rowData = this.getRowData();

            var icon = {
                icon: operation.icon,
                color: "#1E90FF",
                size: "20px",
                click: genClick(operation, rowData)
            };
            icon = new yayoi.ui.common.Icon(icon);
            var iconDiv = $("<div style='float:left'></div>");
            if (i == 0) {
                iconDiv.css("margin-left", "50px");
            }
            container.append(iconDiv);
            icon.placeAt(iconDiv);
        }
    };
});
