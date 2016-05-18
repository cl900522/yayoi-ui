"use strict";
yayoi.util.initPackages("yayoi.ui.common");

yayoi.util.extend("yayoi.ui.common.Object", "Object", [], function() {
    this.hasProperty = function(p) {
        return (p in this);
    };
    this.init = function(params) {
        if (params instanceof Object) {
            for (var p in params) {
                var privateP = "_" + p;
                if (this.hasProperty(privateP)) {
                    this[privateP] = params[p];
                    continue;
                }
                this[p] = params[p];
            }
        }
    };
});

yayoi.util.extend("yayoi.ui.common.BasicComponent", "yayoi.ui.common.Object", [], function() {
    /**
     * jquery selector to get container,
     * please reference to placeAt() function.
     * */
    this._container;
    this._rendered = false;
    this._visible = true;

    this.init = function(params) {
        if (params instanceof Object) {
            for (var p in params) {
                var privateP = "_" + p;
                if (this.hasProperty(privateP)) {
                    this[privateP] = params[p];
                    continue;
                }
                this[p] = params[p];
            }
            if (this["selector"] != null) {
                this.placeAt(this["selector"]);
                delete this["selector"];
            }
        }
    };

    this.placeAt = function(selector) {
        if (typeof(selector) == "string") {
            this.setContainer($(selector));
        } else if (typeof(selector) == "object" && selector instanceof jQuery) {
            this.setContainer(selector);
        } else {
            throw "selector param is not supported";
        }
        this.render();
    };
    /**
     * render function of component,
     * it will call beforeRender(); onRendering(); afterRender() functions in order
     */
    this.render = function() {
        if (this.getContainer()) {
            this.getContainer().empty();
        }
        this.beforeRender();
        this.onRendering();
        this.afterRender();
        this.initEvents();
        this._rendered = true;
        this.invalidate();
        var bVisible = this.getVisible();
        this.setVisible(bVisible);
    };
    /*things done before rendering*/
    this.beforeRender = function() {};
    /*always rewrite this function of component to render the html content in container*/
    this.onRendering = function() {};
    /*do after render the main body of container*/
    this.afterRender = function() {};
    /*always rewrite this function to add events */
    this.initEvents = function() {};
    /*rerender part of the component related to data*/
    this.reRender = function() {};

    /*call this if data changed*/
    this.invalidate = function() {
        if (this.getContainer()) {
            if (!this.getRendered()) {
                this.render();
            } else {
                this.reRender();
            }
        }
    };
    this.setContainer = function(container) {
        this._container = container;
    };
    this.getContainer = function() {
        return this._container;
    };
    this.setVisible = function(bVisible) {
        if (bVisible) {
            this.getContainer().show();
        } else {
            this.getContainer().hide();
        }
        this._visible = bVisible;
    };
    this.getVisible = function() {
        return this._visible;
    };
    this.getRendered = function() {
        return this._rendered;
    };
});

yayoi.util.extend("yayoi.ui.common.ModelComponent", "yayoi.ui.common.BasicComponent", [], function() {
    this._model; // model object to storing value
    this._router; //value path in model

    /*call this if model changed*/
    this.invalidate = function() {
        if (this.getContainer()) {
            if (!this.getRendered()) {
                this.render();
            } else {
                if (this.getModel()) {
                    this.reRender();
                }
            }
        }
    };
    this.setModel = function(oModel, sRouter) {
        if (oModel) {
            if (this._model) {
                this._model.removeListener(this);
            }
            this._model = oModel;
            this._router = sRouter || "/";
            if (this._model) {
                this._model.addListener(this);
            }
            this.invalidate();
            return true;
        } else {
            return false;
        }
    };
    this.getModel = function() {
        return this._model;
    };
    this.getRouter = function() {
        return this._router;
    };
    this.getModelValue = function(path) {
        if (this.getModel()) {
            var router = this.getRouter();
            return this.getModel().getValue(router + "/" + path);
        } else {
            return null;
        }
    };
});

yayoi.util.extend("yayoi.ui.common.Icon", "yayoi.ui.common.BasicComponent", [], function() {
    this.group = "FontAwesome";
    this.icon = "";
    this.src = "";

    this.size = "32px";
    this.rotate = 0;
    this.color = "black";
    this.click = null;

    this.init_single = function(sIcon) {
        this.init({
            icon: sIcon
        });
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

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<span class='yayoi-icon'/></span>";
        container.html(html);
    };

    this.afterRender = function() {
        var container = this.getContainer();
        var iconElement = container.find(".yayoi-icon");
        var rotateDeg = "rotate(" + this.rotate + "deg)";
        iconElement.css("-webkit-transform", rotateDeg);
        iconElement.css("-moz-transform", rotateDeg);
        iconElement.css("-ms-transform", rotateDeg);
        iconElement.css("-o-transform", rotateDeg);
        iconElement.css("transform", rotateDeg);
    };

    this.reRender = function() {
        var container = this.getContainer();
        var iconElement = container.find(".yayoi-icon");
        iconElement.attr("icon-group", this.group)
        iconElement.css("font-size", this.size);
        iconElement.css("height", this.size);
        iconElement.addClass("icon-" + this.icon);
        iconElement.css("color", this.color);
    };

    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;
        container.find(".yayoi-icon").click(function() {
            if (that.click) {
                that.click();
            }
        });
    }
});

yayoi.util.extend("yayoi.ui.common.CheckBox", "yayoi.ui.common.BasicComponent", [], function() {
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

yayoi.util.extend("yayoi.ui.common.Button", "yayoi.ui.common.BasicComponent", [], function() {
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

yayoi.util.extend("yayoi.ui.common.ComponentsContainer", "yayoi.ui.common.BasicComponent", [], function() {
    /* Components list*/
    this.components;
    /*How components were placed, ltr[left to right](defalut) or rtl[right to left]*/
    this.align = "ltr";

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<table class='yayoi-container'><tr>";
        for (var i = 0; i < this.components.length; i++) {
            html += ("<td class='yayoi-container-cell' column='" + i + "'></td>");
        }
        html += "</tr></table>";
        container.html(html);
    };

    this.afterRender = function() {
        var container = this.getContainer();
        container.find(".yayoi-container-cell").css("float", this.align == "rtl" ? "right" : "left");

        for (var i = 0; i < this.components.length; i++) {
            var oComponentPlace = container.find(".yayoi-container-cell[column=" + i + "]");
            this.logger.info(oComponentPlace);
            this.components[i].placeAt(oComponentPlace);
        }
    };
});
