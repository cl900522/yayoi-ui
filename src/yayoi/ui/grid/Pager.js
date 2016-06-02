"use strict";
yayoi.util.initPackages("yayoi.ui.grid");

yayoi.util.extend("yayoi.ui.grid.Pager", "yayoi.ui.common.BasicComponent", ["yayoi.ui.common.Icon"], function() {
    this.currentNo = 1;
    this.totalPageNo = 12;
    this.onChange;

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-pager'>";
        html += "<div class='yayoi-pager-icon yayoi-pager-first'>第一页</div>";
        html += "<div class='yayoi-pager-icon yayoi-pager-previous'>前一页</div>";
        html += "<div class='yayoi-pager-input'><input value='1'/></div>";
        html += "<div class='yayoi-pager-icon yayoi-pager-next'>后一页</div>";
        html += "<div class='yayoi-pager-icon yayoi-pager-last'>最后一页</div>";
        html += "</div>";
        container.html(html);
    };

    this.afterRender = function() {
        var container = this.getContainer();
        var iconSize = "22px";
        this.firstIcon = new yayoi.ui.common.Icon({
            icon: "double-angle-left",
            size: iconSize
        });
        this.firstIcon.placeAt(container.find(".yayoi-pager-first"));

        this.previousIcon = new yayoi.ui.common.Icon({
            icon: "angle-left",
            size: iconSize
        });
        this.previousIcon.placeAt(container.find(".yayoi-pager-previous"));

        this.nextIcon = new yayoi.ui.common.Icon({
            icon: "angle-right",
            size: iconSize
        });
        this.nextIcon.placeAt(container.find(".yayoi-pager-next"));

        this.lastIcon = new yayoi.ui.common.Icon({
            icon: "double-angle-right",
            size: iconSize
        });
        this.lastIcon.placeAt(container.find(".yayoi-pager-last"));
    };

    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;

        this.firstIcon.setClick(function() {
            that.setCurrentPageNo(1);
        });
        this.previousIcon.setClick(function() {
            that.setCurrentPageNo(that.currentNo - 1);
        });
        this.nextIcon.setClick(function() {
            that.setCurrentPageNo(that.currentNo + 1);
        });
        this.lastIcon.setClick(function() {
            that.setCurrentPageNo(that.totalPageNo);
        });
        container.find(".yayoi-pager-input input").change(function(event) {
            var value = $(this).val();
            try {
                value = parseInt(value)
                if (Number.isNaN(value)) {
                    value = 1;
                }
            } catch (e) {
                value = 1;
            }
            that.setCurrentPageNo(value);
        });
    };

    this.reRender = function() {
        var container = this.getContainer();
        container.find(".yayoi-pager-input input").val(this.currentNo);
    };
    this.setCurrentPageNo = function(currentNo) {
        if (currentNo > this.totalPageNo) {
            currentNo = this.totalPageNo;
        }
        if (currentNo < 1) {
            currentNo = 1;
        }
        if(this.currentNo == currentNo) {
            return;
        }
        this.currentNo = currentNo;
        this.invalidate();
        if (this.onChange) {
            this.onChange(this.currentNo);
        }
    };
    this.setTotalPageNo = function(totalPageNo) {
        this.totalPageNo = Math.ceil(totalPageNo);
        if (this.currentNo > this.totalPageNo) {
            this.setCurrentPageNo(this.totalPageNo)
        }
    };
    this.setOnChange = function(onChange) {
        this.onChange = onChange;
    };
});
