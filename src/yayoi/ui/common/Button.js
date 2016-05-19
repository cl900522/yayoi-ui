"use strict";
yayoi.util.initPackages("yayoi.ui.common");

yayoi.util.extend("yayoi.ui.common.Button", "yayoi.ui.common.BasicComponent", ["yayoi.ui.common.Icon"], function() {
    /* To do decide icon shown on  leftor right*/
    this.iconPlace = "left";
    /*Icon value it can be set as string or Object like {icon: "remove"}*/
    this.icon = null;
    /*Text to be shown in button*/
    this.text = "";

    /*Action performed when clicked*/
    this.click = function() {
        this.logger.info("Add your own click for button.");
    };

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-button'>";
        html += "<div class='yayoi-button-icon yayoi-button-icon-left'></div>";
        html += "<div class='yayoi-button-text'></div>";
        html += "<div class='yayoi-button-icon yayoi-button-icon-right'></div>";
        html += "</div>";
        container.html(html);
    };
    this.afterRender = function() {
        if (this.icon && typeof(this.icon) == "string") {
            this.icon = new yayoi.ui.common.Icon(this.icon);
        }
    };
    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;
        container.find(".yayoi-button").click(function() {
            that.click();
        });
    };
    this.reRender = function() {
        var container = this.getContainer();
        container.find(".yayoi-button-text").html(this.text);

        var iconContaner = container.find(".yayoi-button-icon");
        iconContaner.hide();
        if (this.icon) {
            this.icon.setSize("20px");
            iconContaner = container.find(".yayoi-button-icon-" + this.iconPlace);
            this.icon.placeAt(iconContaner);
            iconContaner.show();
        }
    };
    this.setIcon = function(sIcon) {
        if (this.icon && this.icon instanceof yayoi.ui.common.Icon) {
            this.icon.reset(sIcon);
        } else {
            this.icon = new yayoi.ui.common.Icon(sIcon);
        }
        this.invalidate();
    };

    this.setText = function(text) {
        this.text = text;
        this.invalidate();
    };

    this.getText = function() {
        return this.text;
    };

    this.setClick = function(click) {
        this.click = click;
    };

    this.getClick = function() {
        return this.click;
    };
});
