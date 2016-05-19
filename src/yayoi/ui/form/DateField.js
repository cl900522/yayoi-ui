"use strict";
yayoi.util.initPackages("yayoi.ui.form");

yayoi.util.extend("yayoi.ui.form.DateField", "yayoi.ui.form.Field", [], function() {
    this.onRendering = function(){
        var container = this.getContainer();
        var html = "<div class='yayoi-field'>";
        html += "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>";
        html += "<div class='yayoi-field-value'>";
        html += "<input class='yayoi-field-input' name='" + this.name + "' placeholder='" + this.hint + "' type='date' value='' />";
        html += "</div></div>";
        container.html(html);
    };
    this.reRender = function() {
        var value = this.value;
        var container = this.getContainer();
        container.find("input").val(value);
    }
    this.setValue = function(value) {
        this.value = value;
        this.invalidate();
    };
    this.getValue = function() {
        if(this.getRendered()) {
            var container = this.getContainer();
            this.value = container.find("input").val();
        }
        return this.value;
    }
});
