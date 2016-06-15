"use strict";
yayoi.initPackages("yayoi.ui.common");

yayoi.extend("yayoi.ui.common.BasicComponent", "yayoi.core.Object", [], function() {
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
            yayoi.getCore().regist(this);
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
