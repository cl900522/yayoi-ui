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

    var newType = function (params){
        if(this["init"] == null || !(this["init"] instanceof Function)){
            this.init = function(params) {
                if(params instanceof Object){
                    for(var p in params){
                        this[p] = params[p];
                    }
                }
            };
        }
        this["init"](params);
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

yayoi.util.extend("yayoi.ui.path.Router", "Object", [], function(){
    this._pwd = "/";
    this._paths = [];
    this.init = function(params) {
        if(typeof params == "string"){
            this.cd(params);
        }
    }
    this.cd = function(path) {
        if(!path){
            return;
        }
        while(path.indexOf("//") != -1){
            path = path.replace("//" , "/");
        }
        if(path.startsWith("/")){
            this._paths = [];
        }
        path = path.split("/");
        for(var i=0; i<path.length; i++){
            if(!path[i]){
                continue;
            }
            if(path[i] == '..'){
                this._paths.pop()
            } else if(path[i] == '.'){

            } else {
                this._paths.push(path[i]);
            }
        }
//        while(this._pwd.endsWith("/")){
//            this._pwd = this._pwd.substring(0, this._pwd.lastIndexOf("/"));
//        }
//        while(path.indexOf("../") == 0){
//            this._pwd = this._pwd.substring(0, this._pwd.lastIndexOf("/") + 1);
//            path = path.substring(3, path.length);
//
//            this.cd(path)
//            return;
//        }
//        while(path.indexOf("./") == 0) {
//            path = path.substring(2, path.length);
//
//            this.cd(path)
//            return;
//        }
//        while(path.indexOf("/") == 0) {
//            this._pwd = path;
//            return;
//        }
//        if(!this._pwd.endsWith("/")) {
//            this._pwd += "/";
//        }
//        this._pwd += path;

        this.logger.debug("pwd:" + this.pwd());
    };
    this.pwd = function() {
        return "/" + this._paths.join("/");
    };
    /*解析路径为数组
     */
    this.parse = function(){
        return this._paths;
//        var paths = this._pwd.split("/");
//        for(var i=0; i<paths.length; i++){
//            if(!paths[i]){
//                paths.splice(i, 1);
//                i--;
//            }
//        }
//        return paths;
    };
});

/**
 * global log object
 */
yayoi.log = new yayoi.ui.log.Logger({typeName: "Yayoi global"});