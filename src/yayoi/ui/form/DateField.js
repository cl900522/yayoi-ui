"use strict";
yayoi.util.initPackages("yayoi.ui.form");

yayoi.util.extend("yayoi.ui.form.DateField", "yayoi.ui.form.Field", ["yayoi.ui.common.Icon", "yayoi.ui.form.DatePicker"], function() {
    this.picker = null;
    this.date = new Date();

    this.onRendering = function(){
        var container = this.getContainer();
        var html = "<div class='yayoi-field'>";
        html += "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>";
        html += "<div class='yayoi-field-value'>";
        html += "<input class='yayoi-field-input' name='" + this.name + "' placeholder='" + this.hint + "' type='text' value='' />";
        html += "</div></div>";
        container.html(html);
    };

    this.afterRender = function() {
        var container = this.getContainer();
        var input = container.find("input");
        this.picker = new yayoi.ui.form.DatePicker({target: input});
    };

    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;

        var input = container.find("input");
        input.focus(function() {
            that.picker.show(function() {
                that.logger.info(that.picker);
            });
        });
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
        var container = this.getContainer();
        if(container) {
            this.value = container.find("input").val();
        }
        return this.value;
    };
});
