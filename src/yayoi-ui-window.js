"use strict";
yayoi.util.initPackages("yayoi.ui.window");

yayoi.util.extend("yayoi.ui.window.Dialog", "yayoi.ui.common.Component", [], function() {
    this.isModel = true;
    this._mask = null;

    this.beforeRender = function (){
        var container = $("<div class='yayoi-dialog'></div>");
        $(document.body).append(container);
        this.setContainer(container);
    }
    this.onRendering = function() {
        var container = this.getContainer();

        var dialogHtml = "<div class='yayoi-dialog-head'>"
          +"<div class='title'>DialogTitle</div><div class='button'><a href='javascript:void(0)' class='yayoi-icon-close'><i></i></a></div>"
          +"</div>"
          +"<div class='yayoi-dialog-body'>"
          +"<p class='content'>DialogContent</p>"
          +"</div>"
          +"<div class='yayoi-dialog-foot'><div class='buttons'>"
          +"<input type='button' class='yayoi-button yayoi-button-cancel' value='取消' />"
          +"<input type='button' class='yayoi-button yayoi-button-submit' value='确定' />"
          +"</div></div>";

        if(this.isModel){
            var maskHtml = "<div class='yayoi-mask' style='display: none;'></div>";
            this._mask = $(maskHtml);
            container.before(this._mask);
        }
        container.html(dialogHtml);
    };
    this.initEvents = function() {
        var container=this.getContainer();

        //添加默认绑定
        var that =this, closeFun = function(){
            that._close();
        }
        container.find(".yayoi-button-cancel").bind("click", closeFun);
        container.find(".yayoi-button-submit").bind("click", closeFun);
        container.find(".button").bind("click", closeFun);
    };
    this.show = function(title, content, confirmFun) {
        if(!this._rendered) {
            this.render();
        }
        var container=this.getContainer();
        container.find(".title").html(title||"");
        container.find(".content").html(content||"");

        container.find(".yayoi-button-submit").unbind("click");
        var that =this, closeFun = function(){
            that._close();
        }
        container.find(".yayoi-button-submit").bind("click", closeFun);
        if (confirmFun && confirm instanceof Function) {
            container.find(".yayoi-button-submit").bind("click", confirmFun);
        }

        this._show();
    };
    this.close = function(){
        this._close();
    };
    this._show = function(){
        var container=this.getContainer();
        container.show();
        var width = document.body.offsetWidth;
        var height = screen.height;

        var dialg_w = container.width();
        var dialg_h = container.height();
        if(this.isModel){
            this._mask.show();

            //设置背景大小
            this._mask.css("width", width);
            this._mask.css("height", height);
        }
        container.css("left", Math.ceil((width - dialg_w)/2));
        container.css("top", Math.ceil(height/4));
    };
    this._close = function(){
        this.getContainer().hide();

        if(this.isModel){
            this._mask.hide();
        }
    };
});