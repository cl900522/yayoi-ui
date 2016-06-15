"use strict";
yayoi.initPackages("yayoi.core");

yayoi.core.Object = function() {
    this.id;
    this.typeName = "yayoi.core.Object";

    this.getId = function() {
        return this.id;
    };

    this.destroy = function() {
        yayoi.getCore().unregist(this);
    };

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
    this.toString = function() {
        return this.typeName;
    };
}
