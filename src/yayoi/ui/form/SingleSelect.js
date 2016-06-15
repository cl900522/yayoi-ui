"use strict";
yayoi.initPackages("yayoi.ui.form");

yayoi.extend("yayoi.ui.form.SingleSelect", "yayoi.ui.form.Field", [], function() {
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

        var html = "<div class='yayoi-field'>";
        html += "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>";
        html += "<div class='yayoi-field-value'>" + selectHtml + "</div></div>";

        container.html(html);
    };
    this.reRender = function() {
        var value = this.value;
        var container = this.getContainer();
        container.find("select").val(value);
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
    };
    this.getTextOf = function(value) {
        for(var i=0; i<this.selections.length; i++) {
            if(""+value==this.selections[i].value){
                return this.selections[i].text;
            }
        }
        return "";
    };
    this.setValue = function(value) {
        this.value = value;
        this.invalidate();
    };
    this.getValue = function() {
        var container = this.getContainer();
        return container.find("select").val();
    }
});
