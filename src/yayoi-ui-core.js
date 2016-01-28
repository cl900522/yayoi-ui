window.yayoi = {
    util: {},
    log:{}
};

yayoi.log.error = function (loginfo){
    console.error(loginfo)
}
yayoi.log.info = function (loginfo){
    console.info(loginfo)
}

yayoi.util.initPackages = function(packagesStr){
    var packages = packagesStr.split(".");
    var currentPackage = window;
    for(var i=0; i<packages.length; i++){
        if(currentPackage["" + packages[i]] == null){
            currentPackage["" + packages[i]] = {};
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

    var newType = yayoi.util.initPackages(newTypePath);
    
    if(baseType._toextend != null){
        newType = baseType._toextend;
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

    newType.prototype = newPrototype;
    newPrototype["_typeName"] = newTypePath;
    newType.constructor = baseType;
    return newType;
}

