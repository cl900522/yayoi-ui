"use strict";
yayoi.initPackages("yayoi.util");

yayoi.util.FormatUtil = new function() {
    this.isEmial = function(email) {
        return yayoi.config.expression.email.test(email);
    };

    this.isMobile = function(mobile) {
        return yayoi.config.expression.mobile.test(mobile);
    };
}
