"use strict";
yayoi.util.initPackages("yayoi.ui.grid");

yayoi.util.extend("yayoi.ui.grid.Column", "yayoi.ui.common.BasicComponent", [], function() {
    this.title = "Column Name";
    this.width = "auto";

    this.router = "";
    this.rowData = {};
    this.decorate;

    this.setRowData = function(rowData) {
        this.rowData = rowData;
        this.invalidate();
    };
    this.getRowData = function() {
        return this.rowData;
    }
    this.getValue = function() {
        return this.rowData[this.router]||"";
    };
    this.setTitle = function(title) {
        this.title = title;
    };
    this.getTitle = function() {
        return this.title;
    };
    this.decorate = function(rowData) {
        return "<span>" + this.getValue() + "</span>";
    };
});
