"use strict";
yayoi.util.initPackages("yayoi.ui.tab");

yayoi.util.extend("yayoi.ui.tab.TabNode", "yayoi.ui.common.ModelComponent", [], function() {
    this.code;
    this.title;
    this.closeable = true;
});
