"use strict";
yayoi.util.initPackages("yayoi.ui.form");

<<<<<<< HEAD
yayoi.util.extend("yayoi.ui.form.DateField", "yayoi.ui.form.Field", ["yayoi.ui.common.Icon", "yayoi.ui.form.DatePicker"], function() {
    this.picker = null;
    this.dateIcon = null;

    this.date = new Date();

    this.onRendering = function() {
=======
yayoi.util.extend("yayoi.ui.form.DateField", "yayoi.ui.form.Field", ["yayoi.ui.common.Icon"], function() {
    this.picker = null;
    this.dateStr = "<table class='date-picker-date'><thead><tr><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td><tr></thead></table>";
    this.dateList = $(this.dateStr);

    this.onRendering = function(){
>>>>>>> bf896feaf21f66f013c9863e6271b6f40177ead8
        var container = this.getContainer();
        var html = "<div class='yayoi-field'>";
        html += "<div class='yayoi-field-title'><span>" + this.getTitle() + "</span></div>";
        html += "<div class='yayoi-field-value'>";
<<<<<<< HEAD
        html += "<input class='yayoi-field-date' name='" + this.name + "' placeholder='" + this.hint + "' type='text' disabled='disabled' value='' />";
        html += "<div class='yayoi-field-date-icon'></div>";
=======
        html += "<input class='yayoi-field-input' name='" + this.name + "' placeholder='" + this.hint + "' type='text' value='' />";
>>>>>>> bf896feaf21f66f013c9863e6271b6f40177ead8
        html += "</div></div>";
        container.html(html);
    };

    this.afterRender = function() {
<<<<<<< HEAD
        var container = this.getContainer();
        var input = container.find("input");
        var that = this;

        this.picker = new yayoi.ui.form.DatePicker({
            target: input,
            onSelect: function(date) {
                that.setValue(date);
            }
        });

        this.dateIcon = new yayoi.ui.common.Icon({icon: "calendar", size: "20px"});
        this.dateIcon.placeAt(container.find(".yayoi-field-date-icon"))
    };

    this.initEvents = function() {
        var that = this;

        this.dateIcon.setClick(function() {
            that.picker.setValue(that.getValue());
            that.picker.show();
        });
    };

=======
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
            that.logger.info(position);

            picker.find(".datepicker-body").append(that.dateList);



            picker.css("top", position.top + target.height());
            picker.css("left", position.left + 5);
            picker.show();
        });
    };
>>>>>>> bf896feaf21f66f013c9863e6271b6f40177ead8
    this.reRender = function() {
        var value = this.value;
        var container = this.getContainer();
        if (value && value instanceof Date) {
            container.find("input").val(value.format("yyyy-MM-dd"));
        }
    };

    this.setValue = function(value) {
        if (value && value instanceof Date) {
            this.value = value;
        } else {
            try {
                this.value = new Date(value)
            } catch (e) {
                this.value = new Date();
            } finally {
            }
        }
        this.invalidate();
    };

    this.getValue = function() {
        return this.value;
    };
});
