"use strict";
yayoi.util.initPackages("yayoi.ui.form");

/**
 * if we define the form with out defining success & error function, the form will be submitted with our processing response data.
 */
yayoi.util.extend("yayoi.ui.form.Form", "yayoi.ui.common.Component", ["yayoi.ui.model.Model"], function(){
    this.title;
    this.action;
    this.method = "post";
    this.columns = 2;
    this.fields = [];
    this.success;
    this.error;
    this.invalidate = function() {
        for(var i=0; i<this.fields.length; i++) {
            var field = this.fields[i];
            if(!field.setModel(this.getModel())){
                if(field._rendered){
                    field.invalidate();
                }
            }
        }
    };
    this.beforeRender = function(){
        for(var i=0; i<this.fields.length; i++) {
            var field = this.createField(this.fields[i]);
            this.fields[i] = field;
        }
    };
    this.onRendering = function() {
        var container = this.getContainer();
        var formHtml = "<form class='yayoi-form' action='" + this.action + "' method='" + this.method + "' >"+
            "<div class='yayoi-form-head'><div class='title'>" + this.title + "</div></div>" +
            "<div class='yayoi-form-body'><table>";

            var i=0, totaColumns = this.columns;
            for(i=0; i<this.fields.length; i++){
                if (i % totaColumns == 0) {
                    formHtml += "<tr class='yayoi-form-row'>";
                }

                var colspan = this.fields[i].colspan;
                if(colspan > totaColumns - (i % totaColumns)){
                    colspan = totaColumns - (i % totaColumns);
                    this.fields[i].colspan = colspan;
                }

                formHtml += "<td class='yayoi-form-cell' data-form-cell='" + i + "' colspan='" + colspan + "'>";
                if (i % totaColumns == totaColumns - 1) {
                    formHtml += "</tr>";
                }
            }

            /**当field数量和column无法整除时，补齐剩余td标签
             */
            if(i % totaColumns != 0){
                while( i % totaColumns != 0) {
                    formHtml += "<td></td>";
                    i++;
                }
                formHtml += "</tr>";
            }

            formHtml += "</table></div>" +
            "<div class='yayoi-form-foot'></div>" +
            "</form>";
        container.html(formHtml);
    };
    this.afterRender = function () {
        var container = this.getContainer();
        for(var i=0; i<this.fields.length; i++) {
            var field = this.fields[i];

            var router = new yayoi.ui.util.Router(this.router);
            router.cd(field.router);

            field.router = router.pwd();
            field.setModel(this.getModel());

            field.setContainer(container.find("td[data-form-cell=" + i + "]"));
            field.render();
        }

        /*footer buttons*/
        var that =this;
        this._cancelButton = new yayoi.ui.common.Button({
            text: "取消",
            icon: "remove",
            click: function() {
                that.cancel();
            }
        });
        this._resetButton = new yayoi.ui.common.Button({
            text: "重置",
            icon: "rotate-right",
            click: function() {
                that.invalidate();
                that.reset();
            }
        });
        this._confirmButton = new yayoi.ui.common.Button({
            text: "确定",
            icon: "ok-sign",
            click: function() {
                that._submit();
            }
        });
        var buttons = new yayoi.ui.common.ComponentsContainer({
            align: "rtl",
            components: [
                this._cancelButton,
                this._resetButton,
                this._confirmButton
            ]
        });
        buttons.placeAt(container.find(".yayoi-form-foot"));
    };
    this.cancel = function () {
        this.logger.info("you can defind your own cancel action here.")
    };
    this.reset = function (){
        this.logger.info("you can add your own reset action here.")
    };
    this._submit = function() {
        if (!this.onSubmit()) {
            return;
        }

        var container = this.getContainer();
        var that = this;
        if(this["success"] != undefined || this["error"] != undefined){
            var options = {};
            if(this["success"] != undefined){
                options.success = this["success"];
            }
            if(this["error"] != undefined){
                options.error = this["error"];
            }

            container.find("form").ajaxSubmit(options);
        } else {
            container.find("form").submit();
        }
    };
    /**
     * if this function return false, the submit process stoped
     */
    this.onSubmit = function() {
        this.logger.info("you can defind your own onSubmit action here.");
        return true;
    };
    this.getField = function(arg1) {
        if(arg1 instanceof Number) {
            return this.fields[arg1];
        }
        if(arg1 instanceof String) {
            for(var i=0; i<this.fields.length; i++) {
                if(this.fields[i].name == arg1) {
                    return this.fields[i];
                }
            }
        }
        return null;
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
            case "singleSelect":
                field = new yayoi.ui.form.SingleSelect(params);
                break;
            case "date":
                field = new yayoi.ui.form.DateField(params);
                break;
            case "textarea":
                field = new yayoi.ui.form.TextArea(params);
                break;
            default:
                throw "Field type can not be supported";
        }
        return field;
    }
});

yayoi.util.extend("yayoi.ui.form.Field", "yayoi.ui.common.Component", [], function(){
    this.title = "";
    this.value = "";
    this.name;
    this.formatter;
    this.hint = "";
    this.colspan = 1;

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
    this.invalidate = function() {
        this.setValue(this.getModel().getValue(this.getRouter()))
    };
});

yayoi.util.extend("yayoi.ui.form.TextFiled", "yayoi.ui.form.Field", [], function(){
    this.format = "text";
    this.onRendering = function(){
        var container = this.getContainer();
        var html = "<div class='yayoi-field'>" +
            "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>" +
            "<div class='yayoi-field-value'>" +
            "<input class='yayoi-field-input' name='" + this.name + "' placeholder='" + this.hint + "' type='"+this.format+"' value='' />" +
            "</div></div>";
        container.html(html);
    };
    this.setValue = function(value) {
        var container = this.getContainer();
        container.find("input").val(value);
    };
    this.getValue = function() {
        var container = this.getContainer();
        return container.find("input").val();
    }
});
yayoi.util.extend("yayoi.ui.form.TextArea", "yayoi.ui.form.Field", [], function() {
    this.onRendering = function(){
        var container = this.getContainer();
        var html = "<div class='yayoi-field'>" +
            "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>" +
            "<div class='yayoi-field-value'>" +
            "<textarea class='yayoi-field-textarea' name='" + this.name + "' placeholder='" + this.hint + "'></textarea>" +
            "</div></div>";
        container.html(html);
    };
    this.setValue = function(value) {
        var container = this.getContainer();
        container.find("textarea").val(value);
    };
    this.getValue = function() {
        var container = this.getContainer();
        return container.find("textarea").val();
    }
});

yayoi.util.extend("yayoi.ui.form.SingleSelect", "yayoi.ui.form.Field", [], function() {
    this.selections = []; //每个对象包含value, text
    this.nullable = true;

    this.onRendering = function() {
        var container = this.getContainer();

        var selectHtml = "<select class='yayoi-field-select' name='" + this.name + "'>"
        if(this.nullable){
            selectHtml += "<option value=''>请选择</option>";
        }
        for(var i=0; i<this.selections.length; i++) {
            if((""+this.selections[i].value) == (""+this.value)) {
                selectHtml += "<option value='" + this.selections[i].value + "' selected='selected'>" + this.selections[i].text + "</option>";
            } else {
                selectHtml += "<option value='" + this.selections[i].value + "'>" + this.selections[i].text + "</option>";
            }
        }
        selectHtml += "</select>";

        var html = "<div class='yayoi-field'>" +
        "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>" +
        "<div class='yayoi-field-value'>" +
        selectHtml +
        "</div></div>";

        container.html(html);
    };

    this.select = function(value){
        var node = null;
        for(var i=0; i<this.selections.length; i++){
            if( "" + this.selections[i].value == "" + value) {
                this.selected = i;
                node = this.selections[i];
            }
        }
        if(node){
            this.container.find("a").removeClass("select").removeClass("white");
            this.container.find("a[param="+node.value+"]").addClass("white").addClass("select");

            this.container.find(".stats_v").val(node.value);
            this.container.find(".stats_i").val(node.text);
        }
    }

    this.getTextOf = function(value) {
        for(var i=0; i<this.selections.length; i++) {
            if(""+value==this.selections[i].value){
                return this.selections[i].text;
            }
        }
        return "";
    }

    this.setValue = function(value) {
        var container = this.getContainer();
        container.find("select").val(value);
    };
    this.getValue = function() {
        var container = this.getContainer();
        return container.find("select").val();
    }
});

yayoi.util.extend("yayoi.ui.form.MultySelect", "yayoi.ui.form.Field", [], function() {
    this.selections = []; //每个对象包含value, text
    this.nullable = true;

    this.onRendering = function() {
        var container = this.getContainer();

        var selectHtml = "<select class='yayoi-field-select' name='" + this.name + "'>"
        if(this.nullable){
            selectHtml += "<option value=''>请选择</option>";
        }
        for(var i=0; i<this.selections.length; i++) {
            if((""+this.selections[i].value) == (""+this.value)) {
                selectHtml += "<option value='" + this.selections[i].value + "' selected='selected'>" + this.selections[i].text + "</option>";
            } else {
                selectHtml += "<option value='" + this.selections[i].value + "'>" + this.selections[i].text + "</option>";
            }
        }
        selectHtml += "</select>";

        var html = "<div class='yayoi-field'>" +
        "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>" +
        "<div class='yayoi-field-value'>" +
        selectHtml +
        "</div></div>";

        container.html(html);
    };

    this.select = function(value){
        var node = null;
        for(var i=0; i<this.selections.length; i++){
            if( "" + this.selections[i].value == "" + value) {
                this.selected = i;
                node = this.selections[i];
            }
        }
        if(node){
            this.container.find("a").removeClass("select").removeClass("white");
            this.container.find("a[param="+node.value+"]").addClass("white").addClass("select");

            this.container.find(".stats_v").val(node.value);
            this.container.find(".stats_i").val(node.text);
        }
    }

    this.getTextOf = function(value) {
        for(var i=0; i<this.selections.length; i++) {
            if(""+value==this.selections[i].value){
                return this.selections[i].text;
            }
        }
        return "";
    }

    this.setValue = function(value) {
        var container = this.getContainer();
        container.find("select").val(value);
    };
    this.getValue = function() {
        var container = this.getContainer();
        return container.find("select").val();
    }
});

yayoi.util.extend("yayoi.ui.form.DateField", "yayoi.ui.form.Field", [], function() {
    this.onRendering = function(){
        var container = this.getContainer();
        var html = "<div class='yayoi-field'>" +
            "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>" +
            "<div class='yayoi-field-value'>" +
            "<input class='yayoi-field-input' name='" + this.name + "' placeholder='" + this.hint + "' type='date' value='' />" +
            "</div></div>";
        container.html(html);
    };
    this.setValue = function(value) {
        var container = this.getContainer();
        container.find("input").val(value);
    };
    this.getValue = function() {
        var container = this.getContainer();
        return container.find("input").val();
    }
});