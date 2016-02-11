"use strict";
yayoi.util.initPackages("yayoi.ui.common");

yayoi.util.extend("yayoi.ui.common.Component", "Object", [], function(){
    this._container;
    this._model; // model object to storing value
    /**
     * jquery selector to get container,
     * please reference to placeAt() function.
     * */
    this.router; //value path in model
    this.visible = true;
    /**parent component
     */
    this._rendered = false;

    this.init = function(params) {
        if(params instanceof Object){
            for(var p in params) {
                this[p] = params[p];
            }
            if(this["selector"] != null){
                this.placeAt(this["selector"]);
                delete this["selector"];
            }
        }
    };
    this.placeAt = function(selector) {
        this.setContainer($(selector));
        this.render();
    };
    /**
     * render function of component,
     * it will call beforeRender(); onRendering(); afterRender() functions in order
     */
    this.render = function() {
        if(this.getContainer()){
            this.getContainer().empty();
        }
        this.beforeRender();
        this.onRendering();
        this.afterRender();
        this.initEvents();
        this._rendered = true;
        if(this.getModel() != null) {
            this.invalidate()
        }
    }
    this.beforeRender = function() {
    };
    /*always rewrite this function of component to render the html content in container*/
    this.onRendering = function() {
    };
    this.afterRender = function() {
    };
    /*always rewrite this function to add events */
    this.initEvents = function() {
    };
    this.setModel = function(model) {
        if(model) {
            this._model = model;
            this.invalidate();
            return true;
        } else {
            return false;
        }
    };
    this.invalidate = function (){
        this.logger.info("You can define you modelChanged function to set your value.");
    }
    this.getModel = function() {
        return this._model;
    };
    this.getRouter = function() {
        return this.router;
    };
    this.setRouter = function(router) {
        if(this.router != router) {
            this.router = router || "";
            this.invalidate();
        }
    };
    this.setContainer = function(container){
        this._container = container;
    };
    this.getContainer = function() {
        return this._container;
    };
    this.setVisible = function(visible){
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
