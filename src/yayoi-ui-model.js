"use strict";
yayoi.util.initPackages("yayoi.ui.model");

yayoi.util.extend("yayoi.ui.model.Model", "Object", [], function() {
    /*根元素的值
     * */
    this._rootValue;
    /*绑定的UI组件
     */
    this._listeners;
    /*获取路径下的值
     * */
    this.getValue = function(path) {
        throw "Can not call getValue in base Model";
    };
    /*设置路径的值
     */
    this.setValue = function(path, value) {
        throw "Can not call setModel in base Model";
    };
    /*获取绑定的组件
     */
    this.getListenders = function (){
        return this._listeners;
    };
    /*设置绑定的组件
     */
    this.addListener = function (component) {
        if(typeof(component) == "object" && component instanceof yayoi.ui.common.ModelComponent) {
            this._listeners.push(component);
            this.logger.info("Bind component with model");
        }
    };
    /*取消绑定的组件
     */
    this.removeListener = function (component){
        for(var i=0; i<this._listeners.length; i++) {
            if(this._listeners[i] == component) {
                this._listeners.splice(i, 1);
                break;
            }
        }
    };
    /*设置根节点值
     */
    this.setRootValue = function (value) {
        this._rootValue = value;
    };
    /*获取根节点值
     */
    this.getRootValue = function () {
        return this._rootValue;
    };
    this.init = function(params) {
        if(params && params instanceof Object){
            for(var p in params) {
                this[p] = params[p];
            }
        }
        this._listeners = [];
        this._rootValue = {};
    };
});

yayoi.util.extend("yayoi.ui.model.JsonModel", "yayoi.ui.model.Model", [], function(){
    this.getValue = function(pathsStr) {
        var value = this.getRootValue();

        var router = new yayoi.ui.util.Router(pathsStr);
        var paths = router.parse();

        if(paths.length == 0){
            return value;
        }

        for(var i=0; i<paths.length; i++) {
            if(value != null && value[paths[i]] != null){
                value = value["" + paths[i]];
            } else {
                return null;
            }
        }
        return value;
    };
    this.setValue = function(pathsStr, value) {
        var parentPath = this.getRootValue();
        var router = new yayoi.ui.util.Router(pathsStr);

        var paths = router.parse();
        if(paths.length == 0){
            this.setRootValue(value);
            return;
        }
        for(var i=0; i<paths.length - 1; i++) {
            if(parentPath[paths[i]] == null){
                parentPath["" + paths[i]] = {};
            }
            parentPath = parentPath["" + paths[i]];
        }
        parentPath[paths[paths.length-1]] = value;
    };
});

yayoi.util.extend("yayoi.ui.model.XMLModel", "yayoi.ui.model.Model", [], function(){
    this.getValue = function(pathsStr) {
        var parentPath = this.getRootValue();

        var router = new yayoi.ui.util.Router(pathsStr);
        var paths = router.parse();

        if(paths.length == 0){
            return parentPath;
        }

        for(var i=0; i<paths.length; i++) {
            if(! isNaN(parseInt(paths[i]))) {
                parentPath = parentPath.eq(parseInt(paths[i]));
                continue;
            }

            var temp = parentPath.find("" + paths[i]);
            if(temp.length > 0) {
                parentPath = temp;
            } else {
                return null;
            }
        }
        return parentPath.text();
    };
    this.setValue = function(pathsStr, value) {
        var parentPath = this.getRootValue();
        var router = new yayoi.ui.util.Router(pathsStr);

        var paths = router.parse();
        if(paths.length == 0){
            this.setRootValue(value);
            return;
        }
        for(var i=0; i<paths.length; i++) {
            if(! isNaN(parseInt(paths[i]))) {
                parentPath = parentPath.eq(parseInt(paths[i]));
                continue;
            }

            var temp = parentPath.find("" + paths[i]);
            if(temp.length == 0) {
                parentPath.append("<" +paths[i] + "></" +paths[i] + ">");
                temp = parentPath.find("" + paths[i]);
            }
            parentPath = temp;
        }

        parentPath.text("" + value);
    };
});
