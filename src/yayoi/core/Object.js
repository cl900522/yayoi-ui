"use strict";
yayoi.util.initPackages("yayoi.core");

yayoi.util.extend("yayoi.core.Object", "Object", [], function() {
    this.hasProperty = function(p) {
        return (p in this);
    };
    this.init = function(params) {
        if (params instanceof Object) {
            for (var p in params) {
                var privateP = "_" + p;
                if (this.hasProperty(privateP)) {
                    this[privateP] = params[p];
                    continue;
                }
                this[p] = params[p];
            }
        }
    };
});
