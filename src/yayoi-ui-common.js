yayoi.util.initPackages("yayoi.ui.common");

yayoi.util.extend("yayoi.ui.common.Component", "Object", [], function(){
    /**
     * jquery selector to get container,
     * please reference to placeAt() function.
     * */
    this.selector;
    this._container;
    this._model;
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
        this.beforeRender();
        this.onRendering();
        this.afterRender();
        this.initEvents();
        this.afterEvents();
    }
    this.beforeRender = function() {
    };
    this.onRendering = function() {
    };
    this.afterRender = function() {
    };
    this.initEvents = function() {
    };
    this.afterEvents = function() {
    };
    this.setModel = function(model) {
        this._model = model;
        this.render();
    };
    this.getModel = function() {
        return this._model;
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
