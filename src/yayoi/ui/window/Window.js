"use strict";
yayoi.initPackages("yayoi.ui.window");

yayoi.extend("yayoi.ui.window.Window", "yayoi.ui.common.BasicComponent", ["yayoi.ui.common.Button", "yayoi.ui.common.ComponentsContainer"], function() {
    this.title = "";
    this.isModel = true;
    this.components = [];
    this.buttons = [];
    this._mask = null;

    this.beforeRender = function() {
        var buttons = this.buttons;
        this.buttons = [];
        for (var i = 0; i < buttons.length; i++) {
            if(buttons[i] instanceof yayoi.ui.common.Button) {
                this.buttons.push(buttons[i]);
            } else {
                this.buttons.push(new yayoi.ui.common.Button(buttons[i]));
            }
        }
    };
    this.onRendering = function() {
        var container = this.getContainer();

        var dialogHtml = "<div class='yayoi-dialog-head'>";
        dialogHtml += "<div class='title'></div><div class='close-icon'></div>";
        dialogHtml += "</div>";
        dialogHtml += "<div class='yayoi-dialog-body'>";
        dialogHtml += "</div>";
        dialogHtml += "<div class='yayoi-dialog-foot'></div>";

        if (this.isModel) {
            var maskHtml = "<div class='yayoi-mask' style='display: none;'></div>";
            this._mask = $(maskHtml);
            container.before(this._mask);
        }
        container.html(dialogHtml);
    };
    this.afterRender = function() {
        var container = this.getContainer();
        var that = this;
        /*body components*/
        var bodyContainer = new yayoi.ui.common.ComponentsContainer({
            align: "utd",
            components: this.components
        });
        bodyContainer.placeAt(container.find(".yayoi-dialog-body"));

        /*footer buttons*/
        var buttonContainer = new yayoi.ui.common.ComponentsContainer({
            align: "rtl",
            components: this.buttons
        });
        buttonContainer.placeAt(container.find(".yayoi-dialog-foot"));

        /*top-right close icon*/
        var closeIcon = new yayoi.ui.common.Icon({
            icon: "remove-sign",
            size: "20px",
            click: function() {
                that._close();
            }
        });
        closeIcon.placeAt(container.find(".close-icon"));
    };
    this.reRender = function() {
        var container = this.getContainer();
        container.find(".title").html(this.title || "");
    };
    this.open = function() {
        if (!this.getRendered()) {
            var container = $("<div class='yayoi-dialog'></div>");
            $(document.body).append(container);
            this.placeAt(container);
        }
        this._show();
    };
    this.close = function() {
        this._close();
    };
    this.setTitle = function(title) {
        this.title = title;
        this.invalidate();
    };
    this._show = function() {
        var container = this.getContainer();
        var width = document.body.offsetWidth;
        var height = screen.height;

        var dialg_w = container.width();
        var dialg_h = container.height();
        if (this.isModel) {
            this._mask.show();

            //设置背景大小
            this._mask.css("width", width);
            this._mask.css("height", height);
        }
        container.css("left", Math.ceil((width - dialg_w) / 2));
        container.css("top", Math.ceil(height / 4));

        this.setVisible(true);
    };
    this._close = function() {
        this.setVisible(false);

        if (this.isModel) {
            this._mask.hide();
        }
    };
});
