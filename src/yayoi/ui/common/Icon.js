"use strict";
yayoi.initPackages("yayoi.ui.common");

yayoi.extend("yayoi.ui.common.Icon", "yayoi.ui.common.BasicComponent", [], function(BasicComponent) {
    this.group = "FontAwesome";
    this.icon = "";
    this.src = "";

    this.size = "32px";
    this.rotate = 0;
    this.color = "black";
    this.click = null;

    this.init = function(params) {
        if(typeof(params) == "string") {
            this.icon = params;
        }

        BasicComponent.prototype.init.call(this, params);
    };

    this.reset = function(sIcon, sGroup) {
        if (sIcon) {
            var container = this.getContainer();
            if (container) {
                var iconElement = container.find(".yayoi-icon");
                iconElement.removeClass("icon-" + this.icon);
            }
            this.icon = sIcon;
        }
        if (sGroup) {
            this.group = sGroup;
        }
        this.invalidate();
    };

    this.setSize = function(size) {
        if (typeof(size) == "number" && Number.isInteger(size)) {
            this.setSize(size + "px");
            return;
        }
        if (typeof(size) == "string" && size.endsWith("px")) {
            this.size = size;
            this.invalidate();
            return;
        }
        throw "Size param must be an integer or a string ends with 'px'";
    };

    this.setClick = function(click) {
        this.click = click;
    };

    this.setColor = function(sColor) {
        this.color = sColor;
        this.invalidate();
    }

    this.setRotate = function(rotate) {
        this.rotate = rotate;
        this.invalidate();
    };

    this.setSrc = function(src) {
        this.src = src;
        this.invalidate();
    };

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<span class='yayoi-icon'/></span>";
        container.html(html);
    };

    this.afterRender = function() {
    };

    this.reRender = function() {
        var container = this.getContainer();
        var iconElement = container.find(".yayoi-icon");
        iconElement.attr("icon-group", this.group)
        iconElement.css("font-size", this.size);
        iconElement.css("height", this.size);
        iconElement.css("width", this.size);
        iconElement.addClass("icon-" + this.icon);
        iconElement.css("color", this.color);
        iconElement.css("background", "url('" + this.src + "') no-repeat");

        var rotateDeg = "rotate(" + this.rotate + "deg)";
        iconElement.css("-webkit-transform", rotateDeg);
        iconElement.css("-moz-transform", rotateDeg);
        iconElement.css("-ms-transform", rotateDeg);
        iconElement.css("-o-transform", rotateDeg);
        iconElement.css("transform", rotateDeg);
    };

    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;
        container.click(function() {
            if (that.click) {
                that.click();
            }
        });
    }
});
