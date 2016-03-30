"use strict";
yayoi.util.initPackages("yayoi.ui.store");

yayoi.util.extend("yayoi.ui.store.Store", "Object", [], function() {
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
        result = eval(result);
        model.setRootValue(this.parseData(result));
        this.setModel(model);

        this.loaded = true;
        this.success();
    };
    this._parseXmlData = function(result) {
        this.logger.error("Currently we we donot supprt xml model");

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
                that.logger.info("Http request complete.");
            },
            success : function(result) {
                that.logger.info("Http request success.");
                if(that.dataType == "json") {
                    that._parseJsonData(result);
                }
                if(that.dataType == "xml") {
                    this._parseXmlData(result);
                }
            },
            error: function(e) {
                that.logger.info("Fail to load http resource.");
                that.logger.info(e);
                this.error();
            }
        });
    };
});
