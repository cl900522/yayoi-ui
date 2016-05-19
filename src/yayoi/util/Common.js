"use strict";
yayoi.util.initPackages("yayoi.util");

yayoi.util.isEmial = function(email) {
    return yayoi.config.expression.email.test(email);
}

yayoi.util.isMobile = function(mobile) {
    return yayoi.config.expression.mobile.test(mobile);
}
