"use strict";
yayoi.initPackages("yayoi.model");

yayoi.extend("yayoi.model.Validator", "yayoi.core.Object", [], function() {
    this.expression = null;
    this.required = false;
    this.isValid = function(value) {
        if(this.required && !value) {
            this.onFail();
        }
        if(this.expression.test(value)) {
            this.onFail();
        }
        return true;
    };
    this.onFail = function() {
    };
});
