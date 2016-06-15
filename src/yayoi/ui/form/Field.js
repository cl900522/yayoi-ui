"use strict";
yayoi.initPackages("yayoi.ui.form");

yayoi.extend("yayoi.ui.form.Field", "yayoi.ui.common.BasicComponent", [], function(){
    this.title = "";
    this.value = "";
    this.name;
    this.formatter;
    this.hint = "";
    this.colspan = 1;

    this.setTitle = function(title) {
        this.title = title;
    };
    this.getTitle = function() {
        return this.title;
    }
    this.setValue = function(value) {
        this.value = value;
    };
    this.getValue = function() {
        return this.value;
    }
    this.setFormatter = function(formmater) {
        this.formmater = formmater;
    };
    this.getFormatter = function() {
        return this.formmater;
    };
});
