"use strict";
yayoi.util.initPackages("yayoi.model");

yayoi.util.extend("yayoi.model.Model", "Object", [], function() {
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
    this.getListenders = function() {
        return this._listeners;
    };
    /*设置绑定的组件
     */
    this.addListener = function(component) {
        if (typeof(component) == "object" && component instanceof yayoi.ui.common.ModelComponent) {
            this._listeners.push(component);
            this.logger.info("Bind component with model");
        }
    };
    /*取消绑定的组件
     */
    this.removeListener = function(component) {
        for (var i = 0; i < this._listeners.length; i++) {
            if (this._listeners[i] == component) {
                this._listeners.splice(i, 1);
                break;
            }
        }
    };
    /*设置根节点值
     */
    this.setRootValue = function(value) {
        this._rootValue = value;
    };
    /*获取根节点值
     */
    this.getRootValue = function() {
        return this._rootValue;
    };
    this.init = function(params) {
        if (params && params instanceof Object) {
            for (var p in params) {
                this[p] = params[p];
            }
        }
        this._listeners = [];
        this._rootValue = {};
    };
});
