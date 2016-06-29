"use strict";
yayoi.initPackages("yayoi.ui.tab");

yayoi.extend("yayoi.ui.tab.URLTabNode", "yayoi.ui.tab.TabNode", [], function() {
    this.url;

    this.onRendering = function() {
        var container = this.getContainer();
        var frame = $('<iframe src="' + this.url + '"scrolling="auto" frameborder="0"></iframe>');
        container.append(frame);
    };
});
