"use strict";
yayoi.util.initPackages("yayoi.ui.grid");

yayoi.util.extend("yayoi.ui.grid.Grid", "yayoi.ui.common.Component", [], function() {
    this.title;
    this.showIndex = false;
    this.columns = [];
    this.pageSize = 10;
    this.pageNo = 1;

    this.beforeRender = function(){
        for(var i=0; i<this.columns.length; i++) {
            var column = this.createColumn(this.columns[i]);
            this.columns[i] = column;
        }
    };
    this.onRendering = function() {
        var container = this.getContainer();
        var formHtml = "<div class='yayoi-grid-head'><div class='buttons'></div></div>" +
            "<div class='yayoi-grid-body'>";

            var totalColumns = this.columns.length;

            formHtml += "<div class='yayoi-grid-title'>";
            for(var i=0; i<totalColumns; i++) {
                formHtml += "<div class='yayoi-grid-column'><span>" + this.columns[i].title + "</span></div>";
            }
            formHtml += "</div>";

            for(var i=0; i<this.pageSize; i++){
                formHtml += "<div class='yayoi-grid-row' data-grid-row='" + i + "'>";

                for(var j=0; j<totalColumns; j++) {
                    formHtml += "<div class='yayoi-grid-column' data-grid-column='" + j + "' ></div>";
                }

                formHtml += "</div>";
            }

        container.html(formHtml);
    };
    this.afterRender = function () {
        var container = this.getContainer();

        for(var i=0; i<this.pageSize; i++) {
            for(var j=0; j<this.columns.length; j++) {
                var column = this.columns[j];
                column.setContainer(container.find("div[data-grid-row=" + i + "]>div[data-grid-column="+j+"]"));
                column.render();
            }
        }
    };
    this.invalidate = function() {
        var container = this.getContainer();
        var rootValue = this.getModel().getValue(this.getRouter());
        var model = new yayoi.ui.model.JsonModel();

        if(!rootValue instanceof Array) {
            throw "Grid value is not an array object.";
        }

        for(var i=0; i<rootValue.length; i++) {
            model.setRootValue(rootValue[i]);

            for(var j=0; j<this.columns.length; j++) {
                var column = this.columns[j];
                column.setContainer(container.find("div[data-grid-row=" + i + "]>div[data-grid-column="+j+"]"));
                column.setModel(model);
            }
        }
    };
    this.initEvents = function () {
        var container = this.getContainer();
        var that =this;
//        container.find(".buttons").bind("click", function(){
//        });
    };
    this.getColumn = function(arg1) {
    };
    this.createColumn = function(params) {
        var column = null, columnType = params["type"] || "text";
        delete params["type"];

        switch (columnType){
            case "text":
                column = new yayoi.ui.grid.TextColumn(params);
                break;
            default:
                throw "Column type can not be supported";
        }
        return column;
    }
});

yayoi.util.extend("yayoi.ui.grid.Column", "yayoi.ui.common.Component", [], function(){
    this.title = "";
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
    };
});

yayoi.util.extend("yayoi.ui.grid.TextColumn", "yayoi.ui.grid.Column", [], function(){
    this.onRendering = function(){
        var container = this.getContainer();
        var html = "<span>" + this.getValue() + "</span>";
        container.html(html);
    };
    this.setValue = function(value) {
        var model = this.getModel();
        if(model){
            model.setValue(this.router, value);
        }
    };
    this.getValue = function() {
        var model = this.getModel();
        if(model) {
            return model.getValue(this.getRouter());
        } else {
            return "";
        }
    };
    this.invalidate = function () {
        var container = this.getContainer();
        container.find("span").html(this.getValue());
    }
});