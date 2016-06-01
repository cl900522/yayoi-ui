"use strict";
yayoi.util.initPackages("yayoi.ui.grid");

yayoi.util.extend("yayoi.ui.grid.Pager", "yayoi.ui.common.BasicComponent", [], function() {
    this.pageSize = 10;
    this.total = 0;
    this.currentNo = 1;
    this.totalPageNo = 0;
    this.onChange;

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-pager'>";
        html += "<span>第一页</span>";
        html += "<span>前一页</span>";
        html += "<input value='1'/>";
        html += "<span>后一页</span>";
        html += "<span>最后一页</span>";
        html += "</div>";
        container.html(html);
    };

    this.reRender = function() {
        var container = this.getContainer();
        this.totalPageNo = Math.ceil(this.total / this.pageSize);
        if(this.currentNo > this.totalPageNo) {
            this.currentNo = this.totalPageNo;
        }
    };

    this.setTotal = function(total) {
        this.total = total;
        this.invalidate();
    }
    this.setCurrentNo = function(currentNo) {
        this.currentNo = currentNo;
        this.invalidate();
    };
    this.setPageSize = function(pageSize) {
        this.pageSize = pageSize;
        this.invalidate();
    };
    this.setOnChange = function(onChange) {
        this.onChange = onChange;
    };
});
