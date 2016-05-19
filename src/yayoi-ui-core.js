"use strict";
window.yayoi = {
    util: {},
    config: {
        global: {
            inited: false,
            devMode: false,
            rootPath: "./js/",
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
    if(!window.jQuery) {
        throw "Please import jQuery package."
    }
    function parseScriptTag() {
        $("script").each(function() {
            var scriptSrc = $(this).attr("src");
            if(!scriptSrc) {
                return;
            }

            var index = scriptSrc.indexOf("yayoi-ui-core.js");
            if(index != -1) {
                yayoi.config.global.rootPath = scriptSrc.substring(0, index);

                var devMode = $(this).attr("data-devMode");
                if(devMode === "true") {
                    yayoi.config.global.devMode = true;
                }

                var funName = $(this).attr("data-init");
                if(window[funName]) {
                    window[funName]();
                }
                return false;
            }
        })
    }

    $(parseScriptTag);
    $(function() {
        yayoi.log = new yayoi.ui.log.Logger({typeName: "Yayoi global"});
    });

    yayoi.config.global.inited = true;
}();


yayoi.util.isEmial = function(email) {
    return yayoi.config.expression.email.test(email);
}

yayoi.util.isMobile = function(mobile) {
    return yayoi.config.expression.mobile.test(mobile);
}

yayoi.util.loadJS = function(url, loadSuccess, async) {
    if(!async)  {
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
            if(loadSuccess) {
                loadSuccess(scriptContent);
            }
        },
        error: function() {
            throw "Fail to load js file:" + url;
        }
    });
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

yayoi.util.initPackages = function(packagesStr, defaultInitObject) {
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

/**
 * Help to distinguish if model js exist. if not, will load throught http request to get js file
 * @param  {String} packagesStr [model package path like yayoi.ui.common.Button]
 * @return {[type]}             [description]
 */
yayoi.util.require = function(packagesStr) {
    var packages = packagesStr.split(".");
    var currentPackage = window , parentPackage = currentPackage;
    for(var i=0; i<packages.length; i++){
        parentPackage = currentPackage;
        currentPackage = currentPackage["" + packages[i]];

        if(!currentPackage) {
            var packageJsFile = packages.join("-");
            packageJsFile = packageJsFile.substring(0, packageJsFile.lastIndexOf("-")) + ".js";

            var scriptContent = null;
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
                    eval(scriptContent);
                }
            }

            currentPackage = parentPackage["" + packages[i]];
        }
        if(currentPackage == null) {
            throw "Can not get " + packagesStr+ " js.";
        }
    }
}

yayoi.util.extend = function(newTypePath, baseType, importTypes, initFunction) {
    yayoi.util.require(baseType);
    baseType = yayoi.util.initPackages(baseType);

    if(! (baseType instanceof Function)) {
        throw "BaseType:" + baseType +" is not a function, so it can not be extended.";
    }

    var newPrototype = new baseType();

    var usingTypes = [];
    for(var i = 0; i < importTypes.length; i++){
        yayoi.util.require(importTypes[i]);
        var existType = yayoi.util.initPackages(importTypes[i]);
        usingTypes.push(existType);
    }
    initFunction.apply(newPrototype, usingTypes);

    var newType = function (params) {
        if(this["init"] == null || !(this["init"] instanceof Function)){
            this.init = function(params) {
                if(params instanceof Object) {
                    for(var p in params){
                        this[p] = params[p];
                    }
                }
            };
        };
        if(!params || params instanceof Object) {
            this["init"].call(this, params);
            return;
        } else {
            this["init_single"].call(this, params);
        }
    }

    newType = yayoi.util.initPackages(newTypePath, newType);

    newPrototype["_typeName"] = newTypePath;
    newPrototype["logger"] = new yayoi.ui.log.Logger({typeName: newTypePath});

    newType.prototype = newPrototype;
    newType.constructor = baseType;
    return newType;
}

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
