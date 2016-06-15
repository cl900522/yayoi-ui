"use strict";
window.yayoi = {
    instance: null,
    config: {
        global: {
            element: null,
            version: 1.0,
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
                element = $(this);
                return false;
            }
        });

        /* decide if in dev mode */
        var devMode = element.attr("data-devMode");
        if (devMode === "true") {
            yayoi.config.global.devMode = true;
        }

        yayoi.require("yayoi.core.Object");

        yayoi.require("yayoi.util.Logger");
        this.logger = new yayoi.util.Logger({
            typeName: "Yayoi Global"
        });

        yayoi.require("yayoi.core.Core");
        yayoi.instance = new yayoi.core.Core();

        /*execute init method*/
        var funName = element.attr("data-init");
        if (window[funName]) {
            window[funName]();
        }
    }

    $(parseScriptTag);
}();

yayoi.getCore = function() {
    if (yayoi.instance && yayoi.instance.inited) {
        return yayoi.instance;
    }
};

yayoi.loadJS = function(url, loadSuccess, async) {
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

yayoi.initPackages = function(packagesStr, defaultInitObject) {
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
yayoi.require = function(packagesStr) {
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
            if (window.localStorage) {
                scriptContent = window.localStorage[packageKey];
            }

            if (yayoi.config.global.devMode || !scriptContent) {
                yayoi.loadJS(yayoi.config.global.rootPath + packageJsFile, function(gotScriptContent) {
                    if (window.localStorage) {
                        window.localStorage[packageKey] = gotScriptContent;
                    }
                }, false);
            } else {
                if (scriptContent) {
                    eval(scriptContent);
                }
            }

            currentPackage = parentPackage["" + packages[i]];
        }
        if (currentPackage == null) {
            throw "Can not get " + packagesStr + " js.";
        }
    }
    return currentPackage;
}

yayoi.extend = function(newTypePath, baseType, importTypes, initFunction) {
    yayoi.require(baseType);

    baseType = yayoi.initPackages(baseType);

    if (!baseType || !(baseType instanceof Function)) {
        throw "BaseType:" + baseType + " is not a function, so it can not be extended.";
    }

    var newPrototype = new baseType();

    var usingTypes = [];
    for (var i = 0; i < importTypes.length; i++) {
        yayoi.require(importTypes[i]);
        var existType = yayoi.initPackages(importTypes[i]);
        usingTypes.push(existType);
    }

    initFunction.apply(newPrototype, usingTypes);
    newPrototype.typeName = newTypePath;
    if (newPrototype instanceof yayoi.core.Object) {
        if(newTypePath != "yayoi.util.Logger") {
            var Logger = yayoi.require("yayoi.util.Logger");
            newPrototype.logger = new Logger({
                typeName: newTypePath
            });
        }
    }

    var yayoiObject = function(params) {
        if (newPrototype instanceof yayoi.core.Object) {
            if (!params || params instanceof Object) {
                this["init"].call(this, params);
            } else {
                this["init_single"].call(this, params);
            }
        }
    }

    yayoiObject = yayoi.initPackages(newTypePath, yayoiObject);
    yayoiObject.prototype = newPrototype;

    return yayoiObject;
}
