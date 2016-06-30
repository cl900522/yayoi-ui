"use strict";
yayoi.initPackages("yayoi.model");

yayoi.extend("yayoi.model.Validator", "yayoi.core.Object", [], function() {
    /*Is value must be exist*/
    this.required = false;
    this.length = null;
    /*RegExp to test value*/
    this.expression = null;
    /*self validate function, return true if pass, or false if fail*/
    this.validate = null;

    this.isValid = function(value) {
        if (this.required && !value) {
            return false;
        }
        if (this.expression && !this.expression.test(value)) {
            return false;
        }
        if (this.validate) {
            if (!this.validate(value)) {
                return false;
            }
        }
        return true;
    };
});
