"use strict";
yayoi.util.initPackages("yayoi.ui.common");

yayoi.util.extend("yayoi.ui.common.ComponentsContainer", "yayoi.ui.common.BasicComponent", [], function() {
    /* Components list*/
    this.components;
    /*How components were placed, ltr[left to right](defalut) or rtl[right to left]*/
    this.align = "ltr";

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<table class='yayoi-container'><tr>";
        for (var i = 0; i < this.components.length; i++) {
            html += ("<td class='yayoi-container-cell' column='" + i + "'></td>");
        }
        html += "</tr></table>";
        container.html(html);
    };

    this.afterRender = function() {
        var container = this.getContainer();
        container.find(".yayoi-container-cell").css("float", this.align == "rtl" ? "right" : "left");

        for (var i = 0; i < this.components.length; i++) {
            var oComponentPlace = container.find(".yayoi-container-cell[column=" + i + "]");
            this.logger.info(oComponentPlace);
            this.components[i].placeAt(oComponentPlace);
        }
    };
});
