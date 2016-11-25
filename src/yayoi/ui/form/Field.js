"use strict";
yayoi.initPackages("yayoi.ui.form");

yayoi.extend("yayoi.ui.form.Field", "yayoi.ui.common.BasicComponent", [], function(){
    this.title = "";
    this.value = "";
    this.name;
    this.formatter;
    this.hint = "";
    this.colspan = 1;

    this.onRendering = function() {
        var container = this.getContainer();

        var html = "<div class='yayoi-field'>";
        html += "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>";
        html += "<div class='yayoi-field-value'></div></div>";
        container.html(html);
    };

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
