"use strict";
yayoi.initPackages("yayoi.core");

yayoi.require("yayoi.core.Object");
yayoi.require("yayoi.util.Common");

yayoi.extend("yayoi.core.Core", "yayoi.core.Object", ["yayoi.util.Common"], function() {
    this.components = {};
    this.inited = false;

    this.init = function() {
        this.inited = true;
    };

    this.regist = function(yObject) {
        if (yObject instanceof yayoi.core.Object) {
            if (!yObject.hasOwnProperty("id")) {
                var sId = yayoi.util.Common.randomId();
                while (this.getObject(sId)) {
                    sId = yayoi.util.Common.randomId();
                }
                yObject.id = sId;
            } else {
                var oExist = this.getObject(yObject.getId());

                if (oExist && oExist != yObject) {
                    throw "Component with Id:" + yObject.getId() + " has been registed.";
                }
            }
            this.components[yObject.getId()] = yObject;
        }
    };

    this.unregist = function(o) {
        if (o instanceof yayoi.core.Object) {
            o = o.getId();
        }

        if (o && typeof(o) == "string") {
            delete this.components[o];
        }
    };

    this.getObject = function(sId) {
        return this.components[sId];
    };
});
