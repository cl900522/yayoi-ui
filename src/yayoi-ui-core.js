window.yayoi = {
    util: {},
    log:{}
};

yayoi.log.error = function (domain){
    console.error("error:" + domain)
    for(var i=1; i<arguments.length; i++){
        console.error(arguments[i]);
    }
}
yayoi.log.info = function (domain){
    console.info("info:" + domain)
    for(var i=1; i<arguments.length; i++){
        console.info(arguments[i]);
    }
}

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

    newType.prototype = newPrototype;
    newPrototype["_typeName"] = newTypePath;
    newType.constructor = baseType;
    return newType;
}

