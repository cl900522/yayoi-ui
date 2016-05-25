"use strict";
yayoi.util.initPackages("yayoi.ui.form");

yayoi.util.extend("yayoi.ui.form.DateField", "yayoi.ui.form.Field", ["yayoi.ui.common.Icon", "yayoi.ui.form.DatePicker"], function() {
    this.picker = null;
    this.date = new Date();

    this.onRendering = function() {
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
        var that = this;

        this.picker = new yayoi.ui.form.DatePicker({
            target: input,
            onSelect: function(date) {
                that.setValue(date);
            }
        });
    };

    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;

        var input = container.find("input");
        input.focus(function() {
            that.picker.setValue(that.getValue());
            that.picker.show();
        });
    };

    this.reRender = function() {
        var value = this.value;
        var container = this.getContainer();
        if (value && value instanceof Date) {
            container.find("input").val(value.format("yyyy-MM-dd"));
        }
    };

    this.setValue = function(value) {
        if (value && value instanceof Date) {
            this.value = value;
        } else {
            try {
                this.value = new Date(value)
            } catch (e) {
                this.value = new Date();
            } finally {
            }
        }
        this.invalidate();
    };

    this.getValue = function() {
        return this.value;
    };
});
