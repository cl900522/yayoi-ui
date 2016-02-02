"use strict";
window.yayoi = {
    util: {},
};

yayoi.util.initPackages = function(packagesStr, defaultInitObject){
    var packages = packagesStr.split(".");
    var currentPackage = window;
    for(var i=0; i<packages.length; i++){
        if(currentPackage["" + packages[i]] == null){
            if(i == packages.length-1 && defaultInitObject != null){
                currentPackage["" + packages[i]] = defaultInitObject;
            } else {
                currentPackage["" + packages[i]] = {};
            }
        }
        currentPackage = currentPackage["" + packages[i]];
    }
    return currentPackage;
}

yayoi.util.extend = function(newTypePath, baseType, importTypes, initFunction){
    baseType = yayoi.util.initPackages(baseType)
    if(! baseType instanceof Function){
        console.error("BaseType is not a function, so it can not be extended.");
    }

    var newPrototype = new baseType();

    var usingTypes = [];
    for(var i = 0; i < importTypes.length; i++){
        var existType = yayoi.util.initPackages(importTypes[i]);
        usingTypes.push(existType);
    }
    initFunction.call(newPrototype, usingTypes);

    var newType = null;

    if(newPrototype._genExtend != null){
        newType = newPrototype._genExtend();
    } else {
        newType = function (params){
            this.init = function(params) {
                for(var p in params){
                    this[p] = params[p];
                }
            };
            this.init(params);
        }
    }

    newType = yayoi.util.initPackages(newTypePath, newType);

    newPrototype["_typeName"] = newTypePath;
    newPrototype["logger"] = new yayoi.ui.log.Logger({typeName: newTypePath});

    newType.prototype = newPrototype;
    newType.constructor = baseType;
    return newType;
}

yayoi.util.extend("yayoi.ui.log.Logger", "Object", [], function(){
    this.typeName = "";
    this.debug = function(log) {
        if(!console){
            return;
        }
        console.debug(this.typeName + ": " + JSON.stringify(log));
    };
    this.info = function(log) {
        if(!console){
            return;
        }
        console.info(this.typeName + ": " + JSON.stringify(log));
    };
    this.error = function(log) {
        if(!console){
            return;
        }
        console.error(this.typeName + ": " + JSON.stringify(log));
    };
    this.clear = function(log) {
        clear();
    };
});

/**
 * global log object
 */
yayoi.log = new yayoi.ui.log.Logger({typeName: "Yayoi global"});