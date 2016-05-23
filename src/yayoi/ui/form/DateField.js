"use strict";
yayoi.util.initPackages("yayoi.ui.form");

yayoi.util.extend("yayoi.ui.form.DateField", "yayoi.ui.form.Field", ["yayoi.ui.common.Icon"], function() {
    this.picker = null;
    this.dateStr = "<table class='date-picker-date'><thead><tr><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td><tr></thead><tbody></tbody></table>";
    this.dateList = $(this.dateStr);

    this.onRendering = function(){
        var container = this.getContainer();
        var html = "<div class='yayoi-field'>";
        html += "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>";
        html += "<div class='yayoi-field-value'>";
        html += "<input class='yayoi-field-input' name='" + this.name + "' placeholder='" + this.hint + "' type='text' value='' />";
        html += "</div></div>";
        container.html(html);
    };

    this.afterRender = function() {
        var pickerStr = "<div class='yayoi-date-picker'>";
        pickerStr += "<div class='head'>";
        pickerStr += "<div class='icon-left-box'>"
        pickerStr += "</div>";
        pickerStr += "<div class='title-box'>"
        pickerStr += "<span class='title'>2016年05月<span>"
        pickerStr += "</div>";
        pickerStr += "<div class='icon-right-box'>"
        pickerStr += "</div>";
        pickerStr += "</div>";
        pickerStr += "<div class='datepicker-body'></div>";
        pickerStr += "</div>";
        this.picker = $(pickerStr);
        this.picker.hide();
        $(document.body).append(this.picker);

        var leftIcon = new yayoi.ui.common.Icon({icon: "angle-left", size: "20px"});
        leftIcon.placeAt(this.picker.find(".head .icon-left-box"));

        var rightIcon = new yayoi.ui.common.Icon({icon: "angle-right", size: "20px"});
        rightIcon.placeAt(this.picker.find(".head .icon-right-box"));
    };
    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;

        var input = container.find("input");
        input.focus(function() {
            var target = $(this);
            var picker = that.picker;
            var position = target.position();

            var cursor = new Date();
            var year = cursor.getYear()
            var month = cursor.getMonth();
            cursor.setDate(1);
            var x = cursor.getDay();
            cursor = new Date(cursor.getTime() - (24*3600*1000*x));
            var s = "<tr>";
            for (var i = 0; i < 42; i++) {
                s += "<td>" + (cursor.getDate() + 1) + "</td>";
                if ((i + 1) % 7 == 0) {
                    s += "</tr><tr>"
                }
                if (cursor.getMonth() !== month && (i + 1) % 7 == 0) {
                    break;
                }
                cursor.setDate(cursor.getDate() + 1);
            }
            that.logger.info(s);
            that.dateList.find("tbody").html(s);
            picker.find(".datepicker-body").append(that.dateList);

            picker.css("top", position.top + target.height());
            picker.css("left", position.left + 5);
            picker.show();
        });
    };
    this.reRender = function() {
        var value = this.value;
        var container = this.getContainer();
        container.find("input").val(value);
    }
    this.setValue = function(value) {
        this.value = value;
        this.invalidate();
    };
    this.getValue = function() {
        if(this.getRendered()) {
            var container = this.getContainer();
            this.value = container.find("input").val();
        }
        return this.value;
    }
});
