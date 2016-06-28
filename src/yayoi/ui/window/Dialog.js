"use strict";
yayoi.initPackages("yayoi.ui.window");

yayoi.extend("yayoi.ui.window.Dialog", "yayoi.ui.window.Window", ["yayoi.ui.common.Button", "yayoi.ui.common.ComponentsContainer"], function() {
    this.isModel = true;
    this._mask = null;

    this._msgComponent = null;
    this._cancelButton = null;
    this._confirmButton = null;

    this.open = function(title, content, confirmFun) {
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

        this.setTitle(title);

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

        this.open();
    };
});
