yayoi.util.initPackages("yayoi.ui.common");

yayoi.util.extend("yayoi.ui.common.Component", "Object", [], function(){
    /**
     * jquery selector to get container,
     * please reference to placeAt() function.
     * */
    this.selector;
    this._container;
    this._model;

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
    }
    this.beforeRender = function() {
    };
    this.onRendering = function() {
    };
    this.afterRender = function() {
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
    }
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

yayoi.util.extend("yayoi.ui.form.Field", "yayoi.ui.common.Component", [], function(){
    this.title;
    this.value;
    this.formatter;

    this.setTitle = function(title) {
        this.title = title;
    };
    this.getTitle = function() {
        return this.title;
    }
    this.setValue = function(value) {
        this.value = value;
    };
    this.getValue = function() {
        return this.value;
    }
    this.setFormatter = function(formmater) {
        this.formmater = formmater;
    };
    this.getFormatter = function() {
        return this.formmater;
    }
});

yayoi.util.extend("yayoi.ui.form.Form", "yayoi.ui.common.Component", [], function(){
    this.title;
    this.action;
    this.method = "post";
    this.columns = 2;
    this.fields = [];
    this.onRendering = function() {
        var container = this.getContainer();
        var formHtml = "<form class='yayoi-form' action'" + this.action + "' method='" + this.method + "' >"+
            "<div class='yayoi-form-head'><span class='yayoi-form-head-title'>" + this.title + "</span></div>" +
            "<table class='yayoi-form-body'>" +
            "<tr class='yayoi-form-row'></tr>" +
            "</table>" +
            "<div class='yayoi-form-foot'><div class='yayoi-form-foot-buttons'>" +
            "<input type='button' class='yayoi-button yayoi-button-cancel' value='取消' />" +
            "<input type='reset' class='yayoi-button yayoi-button-reset' value='重置' />" +
            "<input type='button' class='yayoi-button yayoi-button-submit' value='确定' />" +
            "</div></div>" +
            "</form>";
        container.html(formHtml);
    };
    this.afterRender = function () {
        var container = this.getContainer();
        var that =this;
        container.find(".yayoi-button-cancel").bind("click", function(){
            that.cancel();
        });
        container.find(".yayoi-button-reset").bind("click", function() {
            that.reset();
        });
        container.find(".yayoi-button-submit").bind("click", function() {
            that._submit();
        });
    };
    this.cancel = function () {
        yayoi.log.info("","you can defind your own cancel action here.")
    };
    this.reset = function (){
        yayoi.log.info("","you can add your own reset action here.")
    };
    this._submit = function() {
        this.onSubmit();
        var container = this.getContainer();
        var that = this;
        container.find("form").ajaxSubmit({
            success: that.success,
            error: that.error
        });
    };
    this.onSubmit = function() {
        yayoi.log.info("","you can defind your own onSubmit action here.")
    };
    this.success = function(result){
        yayoi.log.info("","you can defind your own success action here.")
    };
    this.error = function(error){
        yayoi.log.info("","you can defind your own error action here.")
    }
});

yayoi.util.extend("yayoi.ui.form.TextFiled", "yayoi.ui.form.Field", [], function(){
    this.onRendering = function(){
        var container = this.getContainer();
        
        
        
        container.html();
    };
});