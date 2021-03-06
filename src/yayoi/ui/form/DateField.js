"use strict";
yayoi.initPackages("yayoi.ui.form");

yayoi.extend("yayoi.ui.form.DateField", "yayoi.ui.form.Field", ["yayoi.ui.common.Icon", "yayoi.ui.form.DatePicker"], function() {
    this.picker = null;
    this.dateIcon = null;

    this.date = new Date();

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-field'>";
        html += "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>";
        html += "<div class='yayoi-field-value'>";
        html += "<input class='yayoi-field-date' name='" + this.name + "' placeholder='" + this.hint + "' type='text' readonly='true' value='' />";
        html += "<div class='yayoi-field-date-icon'></div>";
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
        that.picker.setVisible(false);

        this.dateIcon = new yayoi.ui.common.Icon({
            icon: "calendar",
            size: "20px"
        });
        this.dateIcon.placeAt(container.find(".yayoi-field-date-icon"));
    };

    this.initEvents = function() {
        var that = this;
        var container = this.getContainer();

        var tooglePicker = function() {
            that.tooglePicker();
        };

        this.dateIcon.setClick(tooglePicker);
        container.find("input").click(tooglePicker);
    };

    this.tooglePicker = function() {
        if (this.picker.getVisible()) {
            this.picker.setVisible(false);
        } else {
            this.picker.setValue(this.getValue());
            this.picker.show();
        }
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
            } finally {}
        }
        this.invalidate();
    };

    this.getValue = function() {
        return this.value;
    };
});
