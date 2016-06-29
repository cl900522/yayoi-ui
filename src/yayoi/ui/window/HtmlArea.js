"use strict";
yayoi.initPackages("yayoi.ui.window");

yayoi.extend("yayoi.ui.window.HtmlArea", "yayoi.ui.common.BasicComponent", [], function() {
    this.htmlContent = "";
    this.css = [];

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-htmlarea'></div>"
        container.html(html);
    };
    this.reRender = function() {
        var container = this.getContainer();
        container.css("color", this.color);
        container.css("color", this.color);
        container.find(".yayoi-htmlarea").html(this.htmlContent);
    };
    this.setHtmlContent = function(htmlContent) {
        this.htmlContent = htmlContent;
        this.invalidate();
    };
});
