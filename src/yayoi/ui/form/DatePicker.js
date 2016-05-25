"use strict";
yayoi.util.initPackages("yayoi.ui.form");

yayoi.util.extend("yayoi.ui.form.DatePicker", "yayoi.ui.common.BasicComponent", ["yayoi.ui.common.Icon", "yayoi.util.DateUtil"], function() {

    this.tempDate = new Date();
    this.onSelect = function(value) {
        this.logger.info(value);
    };

    this.target = null;
    this.levels = {
        year: 1,
        month: 2,
        day: 3
    };
    this.level = this.levels.day;

    this.daysString = "<table class='date-picker-days'><thead><tr><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td><tr></thead><tbody></tbody></table>";

    this.monthsString = "<table class='date-picker-months'><tbody>";
    this.monthsString += "<tr><td data-month='1'>1月</td><td data-month='2'>2月</td><td data-month='3'>3月</td><td data-month='4'>4月</td></tr>";
    this.monthsString += "<tr><td data-month='5'>5月</td><td data-month='6'>6月</td><td data-month='7'>7月</td><td data-month='8'>8月</td></tr>";
    this.monthsString += "<tr><td data-month='9'>9月</td><td data-month='10'>10月</td><td data-month='11'>11月</td><td data-month='12'>12月</td></tr>";
    this.monthsString += "</tbody></table>";

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
            if (that.level == that.levels.day) {
                that.tempDate.setMonth(that.tempDate.getMonth() - 1);
            }
            if (that.level == that.levels.month) {
                that.tempDate.setFullYear(that.tempDate.getFullYear() - 1);
            }
            if (that.level == that.levels.year) {
                that.tempDate.setFullYear(that.tempDate.getFullYear() - 12);
            }
            that.resetTitle();
            that.resetBody();
        });

        var rightIcon = container.find(".head .icon-right-box");
        rightIcon.click(function(event) {
            if (that.level == that.levels.day) {
                that.tempDate.setMonth(that.tempDate.getMonth() + 1);
            }
            if (that.level == that.levels.month) {
                that.tempDate.setFullYear(that.tempDate.getFullYear() + 1);
            }
            if (that.level == that.levels.year) {
                that.tempDate.setFullYear(that.tempDate.getFullYear() + 12);
            }
            that.resetTitle();
            that.resetBody();
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
            var year = tempDate.getFullYear();
            container.find(".head .title-box .title").html((year - 6) + "-" + (year + 5));
        }
        if (this.level == this.levels.month) {
            container.find(".head .title-box .title").html(tempDate.format("yyyy年"));
        }
        if (this.level == this.levels.day) {
            container.find(".head .title-box .title").html(tempDate.format("yyyy年M月"));
        }
    };

    this.resetBody = function() {
        var container = this.getContainer();
        var tempDate = this.tempDate;
        var that = this;

        if (this.level == this.levels.year) {
            var yearSelect = this.generateYearList();
            container.find(".datepicker-body").html(yearSelect);
            container.find("td[data-year='" + tempDate.getFullYear() + "']").addClass('current');
        }
        if (this.level == this.levels.month) {
            var monthSelect = this.generateMonthList();
            container.find(".datepicker-body").html(monthSelect);
            container.find("td[data-month='" + (tempDate.getMonth() + 1) + "']").addClass('current');
        }
        if (this.level == this.levels.day) {
            var daysSelect = this.generateDayList();
            container.find(".datepicker-body").html(daysSelect);
            container.find("td[data-month='" + tempDate.getMonth() + "']").addClass('current');
        }
        container.find(".datepicker-body tbody td").click(function() {
            var target = $(this);

            if (that.level == that.levels.year) {
                var year = target.attr("data-year");
                that.tempDate.setFullYear(year);
            }
            if (that.level == that.levels.month) {
                var month = target.attr("data-month");
                that.tempDate.setMonth(month - 1);
            }
            if (that.level == that.levels.day) {
                var month = target.attr("data-month");
                that.tempDate.setMonth(month - 1);
                var day = target.attr("data-day");
                that.tempDate.setDate(day);
            }
            if (that.level < that.levels.day) {
                that.level = that.level + 1;
                that.resetTitle();
                that.resetBody();
            } else {
                that.setVisible(false);
                if (that.onSelect) {
                    that.onSelect(that.tempDate);
                }
            }
        });
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
        cursor.setDate(1);
        var day = cursor.getDay();
        cursor = new Date(cursor.getTime() - (24 * 3600 * 1000 * day));
        var daysString = "<tr>";
        for (var i = 0; i < 60; i++) {
            daysString += "<td data-month='" + cursor.getMonth() + "' data-day='" + cursor.getDate() + "'>" + cursor.getDate() + "</td>";
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
    };

    this.generateYearList = function() {
        var cursor = new Date(this.tempDate.getTime());
        this.logger.info(cursor.getFullYear());

        cursor.setFullYear(cursor.getFullYear() - 6);
        var yearsString = "<tr>";
        for (var i = 0; i < 12; i++) {
            yearsString += "<td data-year='" + cursor.getFullYear() + "'>" + cursor.getFullYear() + "</td>";
            if ((i + 1) % 4 == 0) {
                yearsString += "</tr><tr>"
            }
            cursor.setFullYear(cursor.getFullYear() + 1);
        }
        var select = $(this.yearsString);
        select.find("tbody").html($(yearsString));
        return select;
    };

    this.setOnSelect = function(onSelect) {
        this.onSelect = onSelect;
    };

    this.setValue = function(value) {
        if (value && value instanceof Date) {
            this.tempDate = value;
        } else {
            this.tempDate = new Date();
        }
    };
});
