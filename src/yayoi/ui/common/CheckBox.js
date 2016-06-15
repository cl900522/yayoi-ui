"use strict";
yayoi.initPackages("yayoi.ui.common");

yayoi.extend("yayoi.ui.common.CheckBox", "yayoi.ui.common.BasicComponent", ["yayoi.ui.common.Icon"], function() {
    /*Icon value it can be set as string or Object like {icon: "remove"}*/
    this.icon = null;
    /*Text to be shown in button*/
    this.text = "";
    /* Is checked*/
    this.checked = false;

    /*Action performed when clicked*/
    this.onChange = function() {
        this.logger.info("Add your own change for checkbox.");
    };

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-checkbox'>";
        html += "<div class='yayoi-checkbox-icon'></div>";
        html += "<div class='yayoi-checkbox-text'></div>";
        html += "</div>";
        container.html(html);
    };

    this.afterRender = function() {
        this.icon = new yayoi.ui.common.Icon("unchecked");
        this.icon.setSize("20px");
        var container = this.getContainer();
        var iconContaner = container.find(".yayoi-checkbox-icon");
        this.icon.placeAt(iconContaner);
    };

    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;
        container.find(".yayoi-checkbox").click(function() {
            that.setChecked(!that.checked);
            that.onChange();
        });
    };

    this.reRender = function() {
        var container = this.getContainer();
        container.find(".yayoi-checkbox-text").html(this.text);

        if (this.checked) {
            this.icon.reset("check");
        } else {
            this.icon.reset("unchecked");
        }
    };

    this.setText = function(text) {
        this.text = text;
        this.invalidate();
    };

    this.getText = function() {
        return this.text;
    };

    this.setOnChange = function(fClick) {
        this.onChange = fClick;
    };

    this.getOnChange = function() {
        return this.onChange;
    };

    this.setChecked = function(bChecked) {
        this.checked = bChecked;
        this.invalidate();
    }
});
