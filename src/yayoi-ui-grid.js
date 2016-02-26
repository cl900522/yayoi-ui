"use strict";
yayoi.util.initPackages("yayoi.ui.grid");

yayoi.util.extend("yayoi.ui.grid.Grid", "yayoi.ui.common.Component", [], function() {
    this.title;
    this.columns = [];
    this.page = {
        pageSize : 10,
        pageNo : 1
    };
    this.pageSize = 10;
    this.pageNo = 1;
    this.showCheckbox = true;
    this.showIndex = false;

    this.beforeRender = function(){
        for(var i=0; i<this.columns.length; i++) {
            var column = this.createColumn(this.columns[i]);
            this.columns[i] = column;
        }
    };
    this.onRendering = function() {
        var container = this.getContainer();
        var totalColumns = this.columns.length;
        var columnWidth = 0;

        var formHtml = "<div class='yayoi-grid-head'><div class='buttons'></div></div>";
        /*body start*/
        formHtml += "<div class='yayoi-grid-body'>";
        /*frozen grid start*/ /*frozen grid titles start*/
        formHtml += "<div class='yayoi-frozen-grid'><div class='yayoi-grid-titles'><table class='yayoi-grid-table'>";
        var tr = "<tr>";
        if(this.showIndex){
            tr += "<td class='row-column check-all'></td>"
        }
        if(this.showCheckbox) {
            tr += "<td class='check-column'><input type='checkbox'/></td>"
        }
        tr += "</tr>";
        formHtml += tr;
        /*frozen grid content start*/
        formHtml += "</table></div><div class='yayoi-grid-content'><table class='yayoi-grid-table'>";
        for(var i=0; i<this.page.pageSize; i++) {
            var tr = "<tr>";
            if(this.showIndex){
                tr += "<td class='row-column'><span>" + (i+1) + "</span></td>"
            }
            if(this.showCheckbox) {
                tr += "<td class='check-column'><input type='checkbox'/></td>"
            }
            tr += "</tr>";
            formHtml += tr;
        }
        formHtml += "</table></div></div>";

        /*flex grid start*/ /*flex grid titles start*/
        formHtml += "<div class='yayoi-flex-grid'><div class='yayoi-grid-titles'><table class='yayoi-grid-table'>";
        formHtml += "<tr>";
        for(var i=0; i<totalColumns; i++) {
            formHtml += "<td style='width:" + this.columns[i].width + "'><span>" + this.columns[i].title + "</span></td>";

            columnWidth += parseInt(this.columns[i].width.replace("px", ""));
        }
        formHtml += "</tr></table></div>";

        /*flex grid content start*/
        formHtml += "<div class='yayoi-grid-content'><table class='yayoi-grid-table'>";

        for(var i=0; i<this.pageSize; i++){
            formHtml += "<tr>";
            for(var j=0; j<totalColumns; j++) {
                formHtml += "<td style='width:" + this.columns[j].width + "'><div class='column' data-grid-row='" + i + "' data-grid-column='" + j + "' ></div></td>";
            }
            formHtml += "</tr>";
        }

        formHtml += "</table></div></div></div>";
        /*body end*/
        formHtml += "<div class='yayoi-grid-foot'><div class='pager'></div></div>";
        container.html(formHtml);

        /*css setting*/
        var frozenWidth = container.find(".yayoi-frozen-grid").width();
        var flexWidth = container.width() - frozenWidth;
        container.find(".yayoi-flex-grid").width(flexWidth);
        container.find(".yayoi-flex-grid table").width(columnWidth + totalColumns*2);
    };
    this.afterRender = function () {
        var container = this.getContainer();

        for(var i=0; i<this.pageSize; i++) {
            for(var j=0; j<this.columns.length; j++) {
                var column = this.columns[j];
                column.setContainer(container.find("div[data-grid-column="+j+"][data-grid-row=" + i + "]"));
                column.render();
            }
        }

        container.find(".check-all").click(function(){
            alert(1);
        });
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
                column.setContainer(container.find("div[data-grid-column="+j+"][data-grid-row=" + i + "]"));
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
    this.title = "Column Name";
    this.width = "auto";
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