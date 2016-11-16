"use strict";
yayoi.initPackages("yayoi.ui.grid");

yayoi.extend("yayoi.ui.grid.Grid", "yayoi.ui.common.ModelComponent", ["yayoi.ui.grid.TextColumn", "yayoi.ui.grid.OperationColumn", "yayoi.ui.grid.Pager", "yayoi.ui.common.ComponentsContainer"], function() {
    this.title;
    this.dataPath = "/rows";
    this.totalPath = "/total";

    this.columns = [];
    this.pageSize = 10;
    this.onRefresh;

    this.checkable = true;
    this.showIndex = false;
    this.operations = [];

    this.beforeRender = function() {
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.createColumn(this.columns[i]);
            this.columns[i] = column;
        }
        var operationColumn = new yayoi.ui.grid.OperationColumn({operations: this.operations});
        this.columns.push(operationColumn);
    };

    this.onRendering = function() {
        var container = this.getContainer();
        var totalColumns = this.columns.length;
        var columnWidth = 0;

        var formHtml = "<div class='yayoi-grid-head'><div class='buttons'></div></div>";
        /*body start*/
        formHtml += "<div class='yayoi-grid-body'>";
        /*frozen grid start*/
        /*frozen grid titles start*/
        formHtml += "<div class='yayoi-frozen-grid'><div class='yayoi-grid-titles'><table class='yayoi-grid-table'>";
        var tr = "<tr>";
        if (this.showIndex) {
            tr += "<td><div class='row-column'></div></td>"
        }
        if (this.checkable) {
            tr += "<td><div class='check-column'><input type='checkbox' class='check-all'/></div></td>"
        }
        tr += "</tr>";
        formHtml += tr;
        /*frozen grid content start*/
        formHtml += "</table></div>"
        formHtml += "<div class='yayoi-grid-content'><table class='yayoi-grid-table'>";
        for (var i = 0; i < this.pageSize; i++) {
            var tr = "<tr>";
            if (this.showIndex) {
                tr += "<td><div class='row-column' data-grid-row=" + i + "><span>" + (i + 1) + "</span></div></td>"
            }
            if (this.checkable) {
                tr += "<td><div class='check-column' data-grid-row=" + i + "><input type='checkbox'/></div></td>"
            }
            tr += "</tr>";
            formHtml += tr;
        }
        formHtml += "</table></div>";
        formHtml += "</div>";

        /*flex grid start*/
        /*flex grid titles start*/
        formHtml += "<div class='yayoi-flex-grid'><div class='yayoi-grid-titles'><table class='yayoi-grid-table'>";
        formHtml += "<tr>";
        for (var i = 0; i < totalColumns; i++) {
            formHtml += "<td style='width:" + this.columns[i].width + "'><span>" + this.columns[i].title + "</span></td>";

            columnWidth += parseInt(this.columns[i].width.replace("px", ""));
        }

        formHtml += "</tr></table></div>";

        /*flex grid content start*/
        formHtml += "<div class='yayoi-grid-content'><table class='yayoi-grid-table'>";

        for (var i = 0; i < this.pageSize; i++) {
            formHtml += "<tr>";
            for (var j = 0; j < totalColumns; j++) {
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
        var flexWidth = container.width() - frozenWidth - 1;
        container.find(".yayoi-flex-grid").width(flexWidth);
        container.find(".yayoi-flex-grid table").width(columnWidth + totalColumns * 2);
    };
    this.afterRender = function() {
        var container = this.getContainer();
        var that = this;
        container.find("[data-grid-row]").each(function() {
            var row = $(this).attr("data-grid-row");
            if (parseInt(row) % 2 == 0) {
                $(this).addClass("single-row");
            }
        })

        this.pager = new yayoi.ui.grid.Pager({currentPageNo: 1, totalPageNo: 1});
        this.pager.setOnChange(function(pageNo) {
            var pageSize = that.pageSize;
            if(that.onRefresh) {
                that.onRefresh({pageNo: pageNo, pageSize: pageSize});
            }
        });

        var footContainer = new yayoi.ui.common.ComponentsContainer({
            align: "rtl",
            components: [
                this.pager
            ]
        });
        footContainer.placeAt(container.find(".yayoi-grid-foot"));
    };
    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;
        container.find(".check-all").click(function() {
            if ($(this).attr("checked")) {
                for (var i = 0; i < that.pageSize; i++) {
                    that.selectRow(i);
                }
            } else {
                for (var i = 0; i < that.pageSize; i++) {
                    that.unselectRow(i);
                }
            }
        });
        container.find(".yayoi-frozen-grid input[type=checkbox]").click(function() {
            var row = $(this).parent().attr("data-grid-row");
            if ($(this).attr("checked")) {
                that.selectRow(row);
            } else {
                that.unselectRow(row);
            }
        });
    };
    this.reRender = function() {
        var container = this.getContainer();
        var rootValue = this.getRows();
        var totalPageNo = Math.ceil(this.getTotal()/this.pageSize);

        if (!rootValue instanceof Array) {
            throw "Grid value is not an array object.";
        }

        for (var i = 0; i < this.pageSize; i++) {
            var rowData = rootValue[i];
            container.find(".column[data-grid-row=" + i + "]").html("");
            if(rowData) {
                for (var j = 0; j < this.columns.length; j++) {
                    var column = this.columns[j];
                    column.setContainer(container.find("div[data-grid-column=" + j + "][data-grid-row=" + i + "]"));
                    column.setRowData(rowData);
                }
            }
        }

        this.pager.setTotalPageNo(totalPageNo);
    };
    this.selectRow = function(i) {
        var container = this.getContainer();
        container.find("div[data-grid-row=" + i + "]").addClass("selected");
        container.find(".yayoi-frozen-grid div[data-grid-row=" + i + "] input[type=checkbox]").attr("checked", "");
    };
    this.unselectRow = function(i) {
        var container = this.getContainer();
        container.find("div[data-grid-row=" + i + "]").removeClass("selected");
        container.find(".yayoi-frozen-grid div[data-grid-row=" + i + "] input[type=checkbox]").removeAttr("checked");
    };
    this.getColumn = function() {

    };
    this.createColumn = function(params) {
        var column = null,
            columnType = params["type"] || "text";
        delete params["type"];

        switch (columnType) {
            case "text":
                column = new yayoi.ui.grid.TextColumn(params);
                break;
            default:
                throw "Column type can not be supported";
        }
        return column;
    };
    this.getTotal = function() {
        return this.getModelValue(this.totalPath);
    };
    this.getRows = function() {
        return this.getModelValue(this.rowPath)||[];
    };
    this.setRefresh = function(refreshCall) {
        this.onRefresh = refreshCall;
    }
});
