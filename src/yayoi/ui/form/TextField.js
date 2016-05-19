"use strict";
yayoi.util.initPackages("yayoi.ui.form");

yayoi.util.extend("yayoi.ui.form.TextField", "yayoi.ui.form.Field", [], function(){
    this.format = "text";
    this.onRendering = function(){
        var container = this.getContainer();
        var html = "<div class='yayoi-field'>";
        html += "<div class='yayoi-field-title'><span>" + this.title + "</span></div>";
        html += "<div class='yayoi-field-value'>";
        html += "<input class='yayoi-field-input' name='" + this.name + "' placeholder='" + this.hint + "' type='" + this.format + "' value='' />";
        html += "</div></div>";
        container.html(html);
    };
    this.reRender = function() {
        var value = this.value;
        var container = this.getContainer();
        container.find("input").val(value);
    };
    this.setValue = function(value) {
        this.value = value;
        this.invalidate();
    };
    this.getValue = function() {
        var container = this.getContainer();
        return container.find("input").val();
    }
});
