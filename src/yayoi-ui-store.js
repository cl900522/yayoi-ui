"use strict";
yayoi.util.initPackages("yayoi.ui.store");

yayoi.util.extend("yayoi.ui.store.Store", "Object", ["yayoi.ui.model.Model"], function() {
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

yayoi.util.extend("yayoi.ui.store.HttpStore", "yayoi.ui.store.Store", [], function() {
    this.async = true;
    this.method = "post";
    this.params = {};
    this.dataType = "json";
    this.contentType = "json";

    this.success = function() {
        this.logger.info("You can add your own success function");
    };
    this.erroor = function() {
        this.logger.info("You can add your own error function");
    }
    this.parseData = function(data) {
        return data||{};
    };

    this._parseJsonData = function(result) {
        var model = new yayoi.ui.model.JsonModel();
        if(typeof(result) == "string") {
            result = $.parseJSON(result);
        }
        model.setRootValue(this.parseData(result));
        this.setModel(model);

        this.loaded = true;
        this.success();
    };
    this._parseXmlData = function(result) {
        var model = new yayoi.ui.model.XMLModel();
        if(typeof(result) == "string") {
            result = $.parseXML(result);
        } else {
            result = $(result);
        }
        model.setRootValue(this.parseData(result));
        this.setModel(model);

        this.loaded = true;
        this.success();
    };
    this.load = function() {
        var that = this;
        if(this.loaded) {
            return;
        }
        $.ajax({
            url : that.url,
            async : that.async,
            method : that.method,
            dataType: that.dataType,
            params : that.params,
            complete : function() {
            },
            success : function(result) {
                if(that.dataType == "json") {
                    that._parseJsonData(result);
                }
                if(that.dataType == "xml") {
                    that._parseXmlData(result);
                }
            },
            error: function(e) {
                this.error();
            }
        });
    };
});
