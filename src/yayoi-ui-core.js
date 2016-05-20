"use strict";
window.yayoi = {
    util: {},
    config: {
        global: {
            element: null,
            version: 1.0,
            inited: false,
            devMode: false,
            rootPath: "/js/",
            logLevel: "debug"
        },
        expression: {
            email: /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/,
            mobile: /^13[0-9]{1}[0-9]{8}$|15[012356789]{1}[0-9]{8}$|17[678]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$/
        }
    }
};

/**
 * execute init function to set params or other things
 * you can add the function to be executed after yayoi inited to attr of script tag like:
 * <script type="text/javascript" src="../src/yayoi-ui-core.js" data-init="startYayoi"></script>
 */
yayoi.init = function() {
    if (!window.jQuery) {
        throw "Please import jQuery package."
    }

    function parseScriptTag() {
        var element = null;

        $("script").each(function() {
            var scriptSrc = $(this).attr("src");
            if (!scriptSrc) {
                return;
            }

            var index = scriptSrc.indexOf("yayoi-ui-core.js");
            if (index != -1) {
                yayoi.config.global.rootPath = scriptSrc.substring(0, index);
<<<<<<< HEAD
                element = $(this);
=======

                var devMode = $(this).attr("data-devMode");
                if(devMode === "true") {
                    yayoi.config.global.devMode = true;
                }

                var funName = $(this).attr("data-init");
                if(window[funName]) {
                    window[funName]();
                }
>>>>>>> 6f6c65436dd82780dd261dabcdc93c67a0cf3094
                return false;
            }
        });

        yayoi.util.require("yayoi.util.Logger");
        yayoi.log = new yayoi.util.Logger({
            typeName: "Yayoi global"
        });

        /* decide if in dev mode */
        var devMode = element.attr("data-devMode");
        if (devMode === "true") {
            yayoi.config.global.devMode = true;
        }

        /*execute init method*/
        var funName = element.attr("data-init");
        if (window[funName]) {
            window[funName]();
        }
    }

    $(parseScriptTag);

    yayoi.config.global.inited = true;
}();

yayoi.util.loadJS = function(url, loadSuccess, async) {
    if (!async) {
        async = false;
    }
    $.ajax({
        url: url,
        type: 'GET',
        async: async,
        cache: true,
        global: true,
        dataType: "html",
        success: function(scriptContent) {
            eval(scriptContent);
            if (loadSuccess) {
                loadSuccess(scriptContent);
            }
        },
        error: function() {
            throw "Fail to load js file:" + url;
        }
    });
}

yayoi.util.initPackages = function(packagesStr, defaultInitObject) {
    var packages = packagesStr.split(".");
    var currentPackage = window;
    for (var i = 0; i < packages.length; i++) {
        if (currentPackage["" + packages[i]] == null) {
            if (i == packages.length - 1 && defaultInitObject != null) {
                currentPackage["" + packages[i]] = defaultInitObject;
            } else {
                currentPackage["" + packages[i]] = {};
            }
        }
        currentPackage = currentPackage["" + packages[i]];
    }
    return currentPackage;
}

/**
 * Help to distinguish if model js exist. if not, will load throught http request to get js file
 * @param  {String} packagesStr [model package path like yayoi.ui.common.Button]
 * @return {[type]}             [description]
 */
yayoi.util.require = function(packagesStr) {
    var packages = packagesStr.split(".");
    var currentPackage = window,
        parentPackage = currentPackage;
    for (var i = 0; i < packages.length; i++) {
        parentPackage = currentPackage;
        currentPackage = currentPackage["" + packages[i]];

        if (!currentPackage) {
            var packageJsFile = packages.join("/") + ".js";
            var packageKey = packagesStr + yayoi.config.global.version;

            var scriptContent = null;
<<<<<<< HEAD
            if (window.localStorage) {
                scriptContent = window.localStorage[packageKey];
            }

            if (yayoi.config.global.devMode || !scriptContent) {
                yayoi.util.loadJS(yayoi.config.global.rootPath + packageJsFile, function(gotScriptContent) {
                    if (window.localStorage) {
                        window.localStorage[packageKey] = gotScriptContent;
                    }
                }, false);
            } else {
                if (scriptContent) {
=======
            if(window.localStorage) {
                scriptContent = window.localStorage[packageJsFile];
            }

            if(yayoi.config.global.devMode || !scriptContent) {
                yayoi.util.loadJS(yayoi.config.global.rootPath + packageJsFile, function(scriptContent){
                    if(window.localStorage && yayoi.config.global.devMode) {
                        window.localStorage[packageJsFile] = scriptContent;
                    }
                }, false);
            } else {
                if(scriptContent) {
>>>>>>> 6f6c65436dd82780dd261dabcdc93c67a0cf3094
                    eval(scriptContent);
                }
            }

            currentPackage = parentPackage["" + packages[i]];
        }
        if (currentPackage == null) {
            throw "Can not get " + packagesStr + " js.";
        }
    }
}

yayoi.util.extend = function(newTypePath, baseType, importTypes, initFunction) {
    yayoi.util.require(baseType);

    baseType = yayoi.util.initPackages(baseType);

    if (!baseType || !(baseType instanceof Function)) {
        throw "BaseType:" + baseType + " is not a function, so it can not be extended.";
    }

    var newPrototype = new baseType();

    var usingTypes = [];
    for (var i = 0; i < importTypes.length; i++) {
        yayoi.util.require(importTypes[i]);
        var existType = yayoi.util.initPackages(importTypes[i]);
        usingTypes.push(existType);
    }
    initFunction.apply(newPrototype, usingTypes);

    var newType = function(params) {
        if (!this["init"] || !(this["init"] instanceof Function)) {
            this.init = function(params) {
                if (params instanceof Object) {
                    for (var p in params) {
                        this[p] = params[p];
                    }
                }
            };
        };
        if (!params || params instanceof Object) {
            this["init"].call(this, params);
        } else {
            this["init_single"].call(this, params);
        }
    }

    newType = yayoi.util.initPackages(newTypePath, newType);

    newPrototype["_typeName"] = newTypePath;
    newPrototype["logger"] = new yayoi.util.Logger({
        typeName: newTypePath
    });

    newType.prototype = newPrototype;
    newType.constructor = baseType;
    return newType;
}
<<<<<<< HEAD
=======

yayoi.util.extend("yayoi.ui.log.Logger", "Object", [], function() {
    this.levels = {
        debug: 1,
        info: 2,
        warn: 3,
        error: 4
    }
    this.typeName = null;
    this.debug = function() {
        var logLevel = this.levels[yayoi.config.global.logLevel];
        if(logLevel > this.levels.debug) {
            return;
        }
        if(!console){
            return;
        }
        console.log("%c" + this.typeName + " %cdebug", "color: rgb(245, 198, 31); font-size:12px; font-weight: bold;","color: rgb(245, 198, 31); font-size:12px;");
        for(var i=0; i<arguments.length; i++) {
            console.debug(arguments[i]);
        }
    };
    this.info = function() {
        var logLevel = this.levels[yayoi.config.global.logLevel];
        if(logLevel > this.levels.info) {
            return;
        }
        if(!console){
            return;
        }
        console.log("%c" + this.typeName + " %cinfo" , "color: rgb(31, 33, 245); font-size:12px; font-weight: bold;", "color: rgb(31, 33, 245); font-size:12px;");
        for(var i=0; i<arguments.length; i++) {
            console.info(arguments[i]);
        }
    };
    this.warn = function() {
        var logLevel = this.levels[yayoi.config.global.logLevel];
        if(logLevel > this.levels.warn) {
            return;
        }
        if(!console){
            return;
        }
        console.log("%c" + this.typeName + " %cwarn" , "color: rgb(245, 114, 31); font-size:12px; font-weight: bold;", "color: rgb(245, 114, 31); font-size:12px;");
        for(var i=0; i<arguments.length; i++) {
            console.warn(arguments[i]);
        }
    };
    this.error = function() {
        var logLevel = this.levels[yayoi.config.global.logLevel];
        if(logLevel > this.levels.error) {
            return;
        }
        if(!console){
            return;
        }
        console.log("%c" + this.typeName + " %cerror" , "color: rgb(245, 31, 31); font-size:12px; font-weight: bold;", "color: rgb(245, 31, 31); font-size:12px;");
        for(var i=0; i<arguments.length; i++) {
            console.error(arguments[i]);
        }
    };
    this.clear = function() {
        clear();
    };
});

yayoi.util.extend("yayoi.ui.util.Router", "Object", [], function(){
    this._paths = null;
    this.init_single = function(params) {
        this.init(params);
    };

    this.init = function(params) {
        //调用初始化_paths，as it is an object.
        this._paths = [];
        if(typeof params == "string") {
            this.cd(params);
        }
    };

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
    };
    this.pwd = function() {
        var pwd = "/" + this._paths.join("/");
        this.logger.debug("pwd:" + pwd);
        return pwd;
    };
    /*解析路径为数组
     */
    this.parse = function(){
        return this._paths;
    };
});
>>>>>>> 6f6c65436dd82780dd261dabcdc93c67a0cf3094
