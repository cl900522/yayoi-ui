"use strict";
yayoi.util.initPackages("yayoi.ui.common");

yayoi.util.extend("yayoi.ui.common.Component", "Object", [], function() {
    this._container;
    this._model; // model object to storing value
    this._modelPath = "/";
    /**
     * jquery selector to get container,
     * please reference to placeAt() function.
     * */
    this.router; //value path in model
    this.visible = true;
    /**parent component
     */
    this._rendered = false;

    this.hasProperty = function(p) {
        return (p in this);
    };

    this.init = function(params) {
        if (params instanceof Object) {
            for (var p in params) {
                var privateP = "_" + p;
                if(this.hasProperty(privateP)) {
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
        if (this.getModel() != null) {
            this.invalidate()
        }
    }
    this.beforeRender = function() {};
    /*always rewrite this function of component to render the html content in container*/
    this.onRendering = function() {};
    this.afterRender = function() {};
    /*always rewrite this function to add events */
    this.initEvents = function() {};
    this.setModel = function(model) {
        if (model) {
            this._model = model;
            if(this._rendered) {
                this.invalidate();
            }
            return true;
        } else {
            return false;
        }
    };
    this.invalidate = function() {
        this.logger.info("You can define you modelChanged function to set your value.");
    }
    this.getModel = function() {
        return this._model;
    };
    this.getModelPath = function() {
        return this._modelPath;
    };
    this.getModelValue = function(path) {
        var modelPath = this.getModelPath()
        return this.getModel().getValue(modelPath + "/" + path);
    };
    this.getRouter = function() {
        return this.router;
    };
    this.setRouter = function(router) {
        if (this.router != router) {
            this.router = router || "";
            this.invalidate();
        }
    };
    this.setContainer = function(container) {
        this._container = container;
    };
    this.getContainer = function() {
        return this._container;
    };
    this.setVisible = function(visible) {
        this.visible = visible;
        if (this.getVisible()) {
            this.getContainer().show();
        } else {
            this.getContainer().hide();
        }
    };
    this.getVisible = function() {
        return this.visible;
    };
});

yayoi.util.extend("yayoi.ui.common.Icon", "yayoi.ui.common.Component", [], function() {
    this.group = "FontAwesome";
    this.icon = "";
    this.src = "";
    this.size = "32px";
    this.rotate = 0;
    this.click = null;

    this.init_single = function(sIcon) {
        this.init({
            icon: sIcon
        });
    };

    this.setSize = function(size) {
        if(typeof(size) == "string" && size.endsWith("px")) {
            this.size = size;
            return;
        }
        if(typeof(size) == "number" && Number.isInteger(size)) {
            this.size = size + "px";
            return;
        }
        throw "Size param must be an integer or a string ends with 'px'";
    };

    this.setClick = function(click) {
        this.click = click;
    };

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<span class='yayoi-icon'/></span>";
        container.html(html);
    };

    this.afterRender = function() {
        var container = this.getContainer();
        var iconElement = container.find(".yayoi-icon");
        iconElement.attr("icon-group", this.group)
        iconElement.css("width", "auto");
        iconElement.css("font-size", this.size);
        iconElement.css("height", this.size);
        iconElement.addClass("icon-" + this.icon);

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
        container.find(".yayoi-icon").click(function() {
            if(that.click) {
                that.click();
            }
        });
    }
});

yayoi.util.extend("yayoi.ui.common.Button", "yayoi.ui.common.Component", [], function() {
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
        var html = "<div class='yayoi-button'>"
        + "<div class='yayoi-button-icon yayoi-button-icon-left'></div>"
        + "<div class='yayoi-button-text'></div>"
        + "<div class='yayoi-button-icon yayoi-button-icon-right'></div>"
        + "</div>";
        container.html(html);
    };

    this.afterRender = function() {
        this.setIcon(this.icon);
        this.setText(this.text);
    };

    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;
        container.find(".yayoi-button").click(function() {
            that.click();
        });
    };

    this._initIcon = function(icon) {
        var iconObject = null;
        var iconSize = "20px";
        if (icon) {
            if (typeof(icon) == "string") {
                iconObject = new yayoi.ui.common.Icon({
                    icon: icon
                });
            }
            if (typeof(icon) == "object") {
                if (icon instanceof yayoi.ui.commono.Icon) {
                    iconObject = icon;
                } else {
                    iconObject = new yayoi.ui.common.Icon(icon);
                }
            }
            iconObject.size = iconSize;
        }
        return iconObject;
    };

    this.setIcon = function(icon) {
        this.icon = this._initIcon(icon);
        var container = this.getContainer();
        var iconContaner = container.find(".yayoi-button-icon");
        iconContaner.hide();
        if (this.icon) {
            iconContaner = container.find(".yayoi-button-icon-" + this.iconPlace);
            this.icon.placeAt(iconContaner);
            iconContaner.show();
        }
    };

    this.setText = function(text) {
        this.text = text;
        var container = this.getContainer();
        container.find(".yayoi-button-text").html(this.text);
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

yayoi.util.extend("yayoi.ui.common.ComponentsContainer", "yayoi.ui.common.Component", [], function() {
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