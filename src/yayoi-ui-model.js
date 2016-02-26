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
    this.addListener = function (component){
        this._listeners.push(component);
    };
    /*取消绑定的组件
     */
    this.removeListener = function (component){
        for(var i=0; i<this._listeners.length; i++) {
            if(this._listeners[i] == component) {
                this._listeners.splice(i, 1);
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
    };
});

yayoi.util.extend("yayoi.ui.model.JsonModel", "yayoi.ui.model.Model", [], function(){
    this.loaded = false;
    this.url = "";
    this.method = "post";
    this.params = [];
    this.async = true;
    this._parseData = function(result) {
        this.setRootValue(this.parseData(result));
        if(!this.loaded){
            this.loadSuccess();
            this.loaded = true;
        }
    };
    this.parseData = function(data) {
        return data;
    };
    this.load = function() {
        var that = this;
        $.ajax({
            url : that.url,
            async : that.async,
            method : that.method,
            dataType: "json",
            params : that.params,
            success : function(result){
                result = eval(result);
                that._parseData(result);
            },
            error: function(e){
                that.logger.error(e);
            }
        });
    };
    this.getValue = function(pathsStr) {
        var value = this.getRootValue();

        var router = new yayoi.ui.path.Router(pathsStr);
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
        var router = new yayoi.ui.path.Router(pathsStr);

        var paths = router.parse();
        if(paths.length == 0){
            this.setRootValue(value);
            return;
        }
        for(var i=0; i<paths.length - 1; i++) {
            if(parentPath != null && parentPath[paths[i]] != null){
                parentPath = parentPath["" + paths[i]];
            } else {
                parentPath = {};
            }
        }
        parentPath[paths[paths.length-1]] = value;
    };
});
