"use strict";
yayoi.util.initPackages("yayoi.ui.grid");

yayoi.util.extend("yayoi.ui.grid.Pager", "yayoi.ui.common.BasicComponent", ["yayoi.ui.common.Icon"], function() {
    this.pageSize = 10;
    this.total = 0;
    this.currentNo = 1;
    this.totalPageNo = 0;
    this.onChange;

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-pager'>";
        html += "<div class='yayoi-pager-icon yayoi-pager-first'>第一页</div>";
        html += "<div class='yayoi-pager-icon yayoi-pager-previous'>前一页</div>";
        html += "<input class='yayoi-pager-input' value='1'/>";
        html += "<div class='yayoi-pager-icon yayoi-pager-next'>后一页</div>";
        html += "<div class='yayoi-pager-icon yayoi-pager-last'>最后一页</div>";
        html += "</div>";
        container.html(html);
    };
    this.afterRender = function() {
        var container = this.getContainer();
        var iconSize = "22px";
        this.firstIcon = new yayoi.ui.common.Icon({icon: "double-angle-left", size: iconSize});
        this.firstIcon.placeAt(container.find(".yayoi-pager-first"));

        this.previousIcon = new yayoi.ui.common.Icon({icon: "angle-left", size: iconSize});
        this.previousIcon.placeAt(container.find(".yayoi-pager-previous"));

        this.nextIcon = new yayoi.ui.common.Icon({icon: "angle-right", size: iconSize});
        this.nextIcon.placeAt(container.find(".yayoi-pager-next"));

        this.lastIcon = new yayoi.ui.common.Icon({icon: "double-angle-right", size: iconSize});
        this.lastIcon.placeAt(container.find(".yayoi-pager-last"));
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
