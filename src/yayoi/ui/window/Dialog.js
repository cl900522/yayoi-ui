"use strict";
yayoi.util.initPackages("yayoi.ui.window");

yayoi.util.extend("yayoi.ui.window.Dialog", "yayoi.ui.common.ModelComponent", ["yayoi.ui.common.Button", "yayoi.ui.common.ComponentsContainer"], function() {
    this.isModel = true;
    this._mask = null;
    this._cancelButton = null;
    this._confirmButton = null;

    this.beforeRender = function() {
        var container = $("<div class='yayoi-dialog'></div>");
        $(document.body).append(container);
        this.setContainer(container);
    };
    this.onRendering = function() {
        var container = this.getContainer();

        var dialogHtml = "<div class='yayoi-dialog-head'>"
        + "<div class='title'>DialogTitle</div><div class='close-icon'></div>"
        + "</div>"
        + "<div class='yayoi-dialog-body'>"
        + "<p class='content'>DialogContent</p>"
        + "</div>"
        + "<div class='yayoi-dialog-foot'></div>";

        if (this.isModel) {
            var maskHtml = "<div class='yayoi-mask' style='display: none;'></div>";
            this._mask = $(maskHtml);
            container.before(this._mask);
        }
        container.html(dialogHtml);
    };
    this.afterRender = function() {
        var that = this;
        /*footer buttons*/
        this._cancelButton = new yayoi.ui.common.Button({
            text: "取消",
            icon: "remove",
            click: function() {
                that._close();
            }
        });
        this._confirmButton = new yayoi.ui.common.Button({
            text: "确定",
            icon: "ok-sign"
        });
        var buttons = new yayoi.ui.common.ComponentsContainer({
            align: "rtl",
            components: [
                this._cancelButton,
                this._confirmButton
            ]
        });
        var container = this.getContainer();
        buttons.placeAt(container.find(".yayoi-dialog-foot"));

        /*top-right close icon*/
        var closeIcon = new yayoi.ui.common.Icon({icon:"remove-sign", size: "20px", click: function() {
            that._close();
        }});
        closeIcon.placeAt(container.find(".close-icon"));
    };
    this.show = function(title, content, confirmFun) {
        if (!this._rendered) {
            this.render();
        }
        var container = this.getContainer();
        var that = this;
        container.find(".title").html(title || "");
        container.find(".content").html(content || "");

        if (confirmFun && confirm instanceof Function) {
            this._confirmButton.setClick(function() {
                that._close();
                confirmFun();
            });
        } else {
            this._confirmButton.setClick(function() {
                that._close();
            });
        }

        this._show();
    };
    this.close = function() {
        this._close();
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
