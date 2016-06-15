"use strict";
yayoi.initPackages("yayoi.proxy");

yayoi.extend("yayoi.proxy.Proxy", "yayoi.core.Object", ["yayoi.model.Model"], function() {
    this.loaded = false;
    this.model = null;
    this.url = null;
    this.setModel = function(model) {
        this.model = model;
    };
    this.getModel = function() {
        return this.model;
    };
    this.setUrl = function(url) {
        this.url = url;
    };
    this.getUrl = function() {
        return this.url;
    };
});
