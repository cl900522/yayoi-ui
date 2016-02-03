"use strict";
yayoi.util.initPackages("yayoi.ui.common");

yayoi.util.extend("yayoi.ui.common.Component", "Object", [], function(){
    this._container;
    this._model; // model object to storing value
    /**
     * jquery selector to get container,
     * please reference to placeAt() function.
     * */
    this.selector;
    this.router; //value path in model
    this.visible = true;
    /**parent component
     */
    this._parent,

    this.placeAt = function(selector) {
        this.setContainer($(selector));
        this.render();
    };
    /**
     * render function of component,
     * it will call beforeRender(); onRendering(); afterRender() functions in order
     */
    this.render = function() {
        this.getContainer().empty();
        this.beforeRender();
        this.onRendering();
        this.afterRender();
        this.initEvents();
        this.afterEvents();
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
    this.afterEvents = function() {
    };
    this.setModel = function(model) {
        if(this._model != model) {
            this._model = model;
            this.invalidate();
            return true;
        }else {
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
    this._genExtend = function (){
        return function(params) {
            this.init = function(params) {
                for(var p in params){
                    this[p] = params[p];
                }
                if(this["selector"] != null){
                    this.placeAt(this["selector"]);
                }
            };
            this.init(params);
        }
    }
});

yayoi.util.extend("yayoi.ui.common.SubComponent", "Object", [], function(){
    this._parent,
    this.afterInit = function(){
        
    };
    this._genExtend = function (){
        return function(params) {
            this.init = function(params) {
                for(var p in params){
                    this[p] = params[p];
                }
                this.afterInit();
            };
            this.init(params);
        }
    }
});
