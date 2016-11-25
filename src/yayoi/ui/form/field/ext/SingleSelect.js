"use strict";
yayoi.initPackages("yayoi.ui.form.field.ext");

yayoi.extend("yayoi.ui.form.field.ext.SingleSelect", "yayoi.ui.form.Field", [], function(Field) {
    this.selections = []; //每个对象包含value, text
    this.nullable = true;
    this.inputArea = null;
    this.selectArea = null;

    this.onRendering = function() {
        Field.prototype.onRendering.call(this);
        var container = this.getContainer();
        var valueDiv = container.find(".yayoi-field-value");

        this.inputArea = $("<input class='yayoi-field-select' name='" + this.name + "'></input>");
        this.selectArea = $("<div class='yayoi-field-select-selections'><ul></ul></div>");
        valueDiv.append(this.inputArea);
        valueDiv.append(this.selectArea);
    };
    this.reRender = function() {
        var ul = this.selectArea.find("ul");
        ul.find("li").remove();

        var me = this;
        function clickRow(i) {
            return function() {
                me.selectIndex(i);
                me.selectArea.hide();
            }
        }

        var value = this.value;
        var found = false;
        for (var i = 0; i < this.selections.length; i++) {
            var selection = this.selections[i];
            var li = $("<li>" + selection.text + "</li>");
            li.bind("click", clickRow(i));
            ul.append(li);
            if (selection.value == value) {
                found = true;
                clickRow(i)();
            }
        }
        if (!found) {
            this.getContainer().find(".yayoi-field-select").val("");
            this.getContainer().find(".yayoi-field-select-selections li").removeClass("selected");
        }
    };
    this.initEvents = function() {
        var me = this;
        this.inputArea.bind("click", function() {
            me.selectArea.show();
        });
    };
    this.selectIndex = function(index) {
        this.selected = index;
        if (index >= this.selections.length) {
            throw "SingleSelect has only " + this.selections.length + "selections.";
        }
        var node = this.selections[index];
        if (node) {
            this.getContainer().find(".yayoi-field-select").val(node.text);
            this.getContainer().find(".yayoi-field-select-selections li").removeClass("selected");
            this.getContainer().find(".yayoi-field-select-selections li").eq(index).addClass("selected");
        }
    };
    this.getTextOf = function(value) {
        for (var i = 0; i < this.selections.length; i++) {
            if (value == this.selections[i].value) {
                return this.selections[i].text;
            }
        }
        return null;
    };
    this.setValue = function(value) {
        this.value = value;
        this.invalidate();
    };
    this.getValue = function() {
        return this.selections[this.selected].value;
    };
    this.setSelections = function(selections) {
        this.selections = selections;
        this.invalidate();
    }
});
