"use strict";
yayoi.initPackages("yayoi.ui.form");

yayoi.extend("yayoi.ui.form.TextArea", "yayoi.ui.form.Field", [], function() {
    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-field'>";
        html += "<div class='yayoi-field-title'><span>" + this.title + "</span></div>";
        html += "<div class='yayoi-field-value'>";
        html += "<textarea class='yayoi-field-textarea' name='" + this.name + "' placeholder='" + this.hint + "'></textarea>";
        html += "</div></div>";
        container.html(html);
    };
    this.reRender = function() {
        var value = this.value;
        var container = this.getContainer();
        container.find("textarea").val(value);
    };
    this.setValue = function(value) {
        this.value = value;
        this.invalidate();
    };
    this.getValue = function() {
        var container = this.getContainer();
        return container.find("textarea").val();
    }
});
