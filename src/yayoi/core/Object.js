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
        yayoi.merge(this, params);
    };

    this.toString = function() {
        return this.typeName;
    };
}
