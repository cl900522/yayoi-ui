"use strict";
yayoi.util.initPackages("yayoi.proxy");

yayoi.util.extend("yayoi.proxy.Proxy", "Object", ["yayoi.model.Model"], function() {
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
