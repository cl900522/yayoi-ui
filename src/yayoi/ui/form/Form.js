"use strict";
yayoi.initPackages("yayoi.ui.form");

/**
 * if we define the form with out defining success & error function, the form will be submitted with our processing response data.
 */
yayoi.extend("yayoi.ui.form.Form", "yayoi.ui.common.ModelComponent",
    ["yayoi.ui.form.TextField", "yayoi.ui.form.DateField", "yayoi.ui.form.TextArea",
    "yayoi.ui.form.SingleSelect", "yayoi.ui.common.Button", "yayoi.ui.common.ComponentsContainer",
    "yayoi.ui.form.field.ext.SingleSelect"], function() {
    this.title;
    this.columns = 2;
    this.fields = [];
    this.buttons = [];

    this.beforeRender = function() {
        for (var i = 0; i < this.fields.length; i++) {
            var field = this.createField(this.fields[i]);
            this.fields[i] = field;
        }
        var buttons = this.buttons;
        this.buttons = [];
        for (var i = 0; i < buttons.length; i++) {
            this.buttons.push(new yayoi.ui.common.Button(buttons[i]));
        }
    };
    this.onRendering = function() {
        var container = this.getContainer();
        var formHtml = "<form class='yayoi-form'>";
        formHtml += "<div class='yayoi-form-head'><div class='title'>" + this.title + "</div></div>";
        formHtml += "<div class='yayoi-form-body'><table>";

        var i = 0,
            totaColumns = this.columns;
        for (i = 0; i < this.fields.length; i++) {
            if (i % totaColumns == 0) {
                formHtml += "<tr class='yayoi-form-row'>";
            }

            var colspan = this.fields[i].colspan;
            if (colspan > totaColumns - (i % totaColumns)) {
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
        if (i % totaColumns != 0) {
            while (i % totaColumns != 0) {
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
    this.afterRender = function() {
        var container = this.getContainer();
        for (var i = 0; i < this.fields.length; i++) {
            var field = this.fields[i];
            field.placeAt(container.find("td[data-form-cell=" + i + "]"));
        }

        /*footer buttons*/
        var that = this;

        var buttonContainer = new yayoi.ui.common.ComponentsContainer({
            align: "rtl",
            components: this.buttons
        });
        buttonContainer.placeAt(container.find(".yayoi-form-foot"));
    };
    this.reRender = function() {
        for (var i = 0; i < this.fields.length; i++) {
            var field = this.fields[i];
            var value = this.getModelValue(field.router);
            field.setValue(value);
        }
    };
    this.getField = function(fieldKey) {
        if (fieldKey instanceof Number) {
            return this.fields[fieldKey];
        }
        if (fieldKey instanceof String) {
            for (var i = 0; i < this.fields.length; i++) {
                if (this.fields[i].name == fieldKey) {
                    return this.fields[i];
                }
            }
        }
        return null;
    };
    this.createField = function(params) {
        var field = null,
            fieldType = params["type"];
        delete params["type"];

        if (!fieldType) {
            throw "Can not decide the field type.";
        }
        switch (fieldType) {
            case "text":
                field = new yayoi.ui.form.TextField(params);
                break;
            case "singleSelect":
                field = new yayoi.ui.form.field.ext.SingleSelect(params);
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
    };
    this.finishEdit = function() {
        var fields = this.fields;
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            var value = field.getValue();
            this.setModelValue(field.router, value);
        }
        return true;
    }
});
