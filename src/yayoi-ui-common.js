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

yayoi.util.extend("yayoi.ui.form.Form", "yayoi.ui.common.Component", [], function(){
    this.title;
    this.action;
    this.method = "post";
    this.columns = 2;
    this.fields = [];
    this.onRendering = function() {
        var container = this.getContainer();
        var formHtml = "<form class='yayoi-form' action='" + this.action + "' method='" + this.method + "' >"+
            "<div class='yayoi-form-head'><span class='yayoi-form-head-title'>" + this.title + "</span></div>" +
            "<div class='yayoi-form-body'><table>";

            var i=0
            for(var i=0; i<this.fields.length; i++){
                if (i % this.columns == 0) {
                    formHtml += "<tr class='yayoi-form-row'>";
                }
                formHtml += "<td class='yayoi-form-cell' name='form-cell-" + i + "'>";
                if (i % this.columns == this.columns - 1) {
                    formHtml += "</tr>";
                }
            }

            if(i%this.columns != 0){
                while( i%this.columns != 0) {
                    formHtml += "<td></td>";
                    i++;
                }
                formHtml += "</tr>";
            }

            formHtml += "</table></div>" +
            "<div class='yayoi-form-foot'><div class='yayoi-form-foot-buttons'>" +
            "<input type='button' class='yayoi-button yayoi-button-cancel' value='取消' />" +
            "<input type='reset' class='yayoi-button yayoi-button-reset' value='重置' />" +
            "<input type='button' class='yayoi-button yayoi-button-submit' value='确定' />" +
            "</div></div>" +
            "</form>";
        container.html(formHtml);

        for(var i=0; i<this.fields.length; i++) {
            var field = this.createField(this.fields[i]);
            field.setContainer(container.find("td[name=form-cell-" + i + "]"));
            field.render();
        }
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
    };
    this.createField = function(params) {
        var field = null, fieldType = params["type"];
        delete params["type"];

        if(!fieldType){
            throw "Can not decide the field type.";
        }
        switch (fieldType){
            case "text":
                field = new yayoi.ui.form.TextFiled(params);
                break;
            case "select":
                break;
            case "radio":
                break;
            default:
                throw "Field type can not be supported";
        }
        return field;
    }
});

yayoi.util.extend("yayoi.ui.form.Field", "yayoi.ui.common.Component", ["yayoi.ui.form.TextField"], function(){
    this.title = "";
    this.value = "";
    this.name;
    this.formatter;
    this.hint = "";

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
    };
});

yayoi.util.extend("yayoi.ui.form.TextFiled", "yayoi.ui.form.Field", [], function(){
    this.onRendering = function(){
        var container = this.getContainer();
        var html = "<div class='yayoi-field'>" +
            "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>" +
            "<div class='yayoi-field-value'>"+
            "<input class='yayoi-field-input' placeholder='" + this.hint + "' type='text' value='' />" +
            "</div></div>";
        container.html(html);
    };
});