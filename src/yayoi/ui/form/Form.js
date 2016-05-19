"use strict";
yayoi.util.initPackages("yayoi.ui.form");

/**
 * if we define the form with out defining success & error function, the form will be submitted with our processing response data.
 */
yayoi.util.extend("yayoi.ui.form.Form", "yayoi.ui.common.ModelComponent", ["yayoi.ui.form.TextField", "yayoi.ui.form.TextArea", "yayoi.ui.form.SingleSelect", "yayoi.ui.common.Button", "yayoi.ui.common.ComponentsContainer"], function() {
    this.title;
    this.columns = 2;
    this.fields = [];
    this.success;
    this.error;

    this.beforeRender = function() {
        for(var i=0; i<this.fields.length; i++) {
            var field = this.createField(this.fields[i]);
            this.fields[i] = field;
        }
    };
    this.onRendering = function() {
        var container = this.getContainer();
        var formHtml = "<form class='yayoi-form'>";
        formHtml += "<div class='yayoi-form-head'><div class='title'>" + this.title + "</div></div>";
        formHtml += "<div class='yayoi-form-body'><table>";

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

        formHtml += "</table></div>";
        formHtml += "<div class='yayoi-form-foot'></div>";
        formHtml += "</form>";
        container.html(formHtml);
    };
    this.afterRender = function () {
        var container = this.getContainer();
        for(var i=0; i<this.fields.length; i++) {
            var field = this.fields[i];
            field.placeAt(container.find("td[data-form-cell=" + i + "]"));
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
    this.reRender = function() {
        for(var i=0; i<this.fields.length; i++) {
            var field = this.fields[i];
            var value = this.getModelValue(field.router);
            console.log(value);
            field.setValue(value);
        }
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
                field = new yayoi.ui.form.TextField(params);
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
