"use strict";
yayoi.initPackages("yayoi.proxy");

yayoi.extend("yayoi.proxy.HttpProxy", "yayoi.proxy.Proxy", ["yayoi.model.JsonModel", "yayoi.model.XMLModel"], function() {
    this.async = true;
    this.method = "post";
    this.params = {};
    this.dataType = "json";
    this.contentType = "json";

    this.success = function() {
        this.logger.info("You can add your own success function");
    };
    this.error = function() {
        this.logger.info("You can add your own error function");
    }
    this.parseData = function(data) {
        return data||{};
    };

    this._parseJsonData = function(result) {
        var model = new yayoi.model.JsonModel();
        if(typeof(result) == "string") {
            result = $.parseJSON(result);
        }
        model.setRootValue(this.parseData(result));
        this.setModel(model);

        this.success();
    };
    this._parseXmlData = function(result) {
        var model = new yayoi.model.XMLModel();
        if(typeof(result) == "string") {
            result = $.parseXML(result);
        } else {
            result = $(result);
        }
        model.setRootValue(this.parseData(result));
        this.setModel(model);

        this.success();
    };
    this.load = function() {
        var that = this;

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
                that.error();
            }
        });
    };
});
