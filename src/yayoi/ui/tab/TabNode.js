"use strict";
yayoi.initPackages("yayoi.ui.tab");

yayoi.extend("yayoi.ui.tab.TabNode", "yayoi.ui.common.ModelComponent", [], function() {
    this.code;
    this.title;
    this.closeable = true;
});
