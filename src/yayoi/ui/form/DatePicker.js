"use strict";
yayoi.util.initPackages("yayoi.ui.form");

yayoi.util.extend("yayoi.ui.form.DatePicker", "yayoi.ui.common.BasicComponent", ["yayoi.ui.common.Icon", "yayoi.util.DateUtil"], function() {
    this.date = new Date();
    this.tempDate = new Date();
    this.target = null;
    this.levels = {
        year: 1,
        month: 2,
        day: 3
    };
    this.level = this.levels.day;

    this.daysString = "<table class='date-picker-days'><thead><tr><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td><tr></thead><tbody></tbody></table>";

    this.monthsString = "<table class='date-picker-months'><tbody><tr><td>1月</td><td>2月</td><td>3月</td><td>4月</td></tr>";
    this.monthsString += "<tr><td>5月</td><td>6月</td><td>7月</td><td>8月</td></tr>";
    this.monthsString += "<tr><td>9月</td><td>10月</td><td>11月</td><td>12月</td></tr></tbody></table>";

    this.yearsString = "<table class='date-picker-years'><tbody></tbody></table>";

    this.onRendering = function() {
        var container = this.getContainer();
        var pickerStr = "<div class='head'>";
        pickerStr += "<div class='icon-left-box'>"
        pickerStr += "</div>";
        pickerStr += "<div class='title-box'>"
        pickerStr += "<span class='title'>2016年05月<span>"
        pickerStr += "</div>";
        pickerStr += "<div class='icon-right-box'>"
        pickerStr += "</div>";
        pickerStr += "</div>";
        pickerStr += "<div class='datepicker-body'></div>";
        container.html(pickerStr);
        container.hide();
    };

    this.afterRender = function() {
        var container = this.getContainer();

        var leftIcon = new yayoi.ui.common.Icon({
            icon: "angle-left",
            size: "20px"
        });
        leftIcon.placeAt(container.find(".head .icon-left-box"));

        var rightIcon = new yayoi.ui.common.Icon({
            icon: "angle-right",
            size: "20px"
        });
        rightIcon.placeAt(container.find(".head .icon-right-box"));
    };

    this.initEvents = function() {
        var container = this.getContainer();
        var title = container.find(".head .title-box");
        var that = this;

        title.click(function(event) {
            that.level = (that.level > 1) ? (that.level - 1) : 1;
            that.resetTitle();
            that.resetBody();
        });

        var leftIcon = container.find(".head .icon-left-box");
        leftIcon.click(function(event) {
            alert("left");
        });

        var rightIcon = container.find(".head .icon-right-box");
        rightIcon.click(function(event) {
            alert("right");
        });
    };

    this.show = function() {
        var container = this.getContainer();
        var that = this;

        if (!container) {
            container = $("<div class='yayoi-date-picker'></div>");
            $(document.body).append(container);
            this.placeAt(container);
        }
        var target = this.target;
        var position = target.position();
        /*定位确定*/
        container.css("top", position.top + target.height());
        container.css("left", position.left + 5);

        /*等级重置*/
        this.level = this.levels.day;
        this.resetTitle();
        this.resetBody();

        this.setVisible(true);
    };

    this.resetTitle = function() {
        var container = this.getContainer();
        var tempDate = this.tempDate;

        if (this.level == this.levels.year) {
            container.find(".head .title-box .title").html(tempDate.format("yyyy年"));
        }
        if (this.level == this.levels.month) {
            container.find(".head .title-box .title").html(tempDate.format("yyyy年M月"));
        }
        if (this.level == this.levels.day) {
            container.find(".head .title-box .title").html(tempDate.format("yyyy年M月d日"));
        }
    };

    this.resetBody = function() {
        var container = this.getContainer();
        if (this.level == this.levels.year) {
            var yearSelect = this.generateYearList();
            container.find(".datepicker-body").html(yearSelect);
        }
        if (this.level == this.levels.month) {
            var monthSelect = this.generateMonthList();
            container.find(".datepicker-body").html(monthSelect);
        }
        if (this.level == this.levels.day) {
            var daysSelect = this.generateDayList();
            container.find(".datepicker-body").html(daysSelect);
        }
    };

    /**
     * create the Day list of a month for user to select
     * @param  {Date} monthDay any day of a month
     * @return {jQuery}    an jquery object contains the days in months
     */
    this.generateDayList = function() {
        var cursor = new Date(this.tempDate.getTime());
        var year = cursor.getYear()
        var month = cursor.getMonth();
        var day = cursor.getDay();
        cursor.setDate(1);
        cursor = new Date(cursor.getTime() - (24 * 3600 * 1000 * day));
        var daysString = "<tr>";
        for (var i = 0; i < 60; i++) {
            daysString += "<td>" + cursor.getDate() + "</td>";
            if ((i + 1) % 7 == 0) {
                daysString += "</tr><tr>"
            }
            if (cursor.getMonth() !== month && (i + 1) % 7 == 0) {
                break;
            }
            cursor.setDate(cursor.getDate() + 1);
        }
        var select = $(this.daysString);
        select.find("tbody").html($(daysString));
        return select;
    };

    this.generateMonthList = function() {
        return $(this.monthsString);
    }

    this.generateYearList = function() {
        var cursor = new Date(this.tempDate.getTime());

        var year = cursor.getYear()-6;
        var yearString = "<tr>";
        for(var i=0; i<12; i++) {
            yearString += "<td>" + cursor.getYear() + "</td>";
            if ((i + 1) % 4 == 0) {
                yearString += "</tr><tr>"
            }
            cursor.setYear(cursor.getYear() + 1);
        }
    }
});
