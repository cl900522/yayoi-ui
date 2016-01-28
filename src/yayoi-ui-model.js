yayoi.util.initPackages("yayoi.ui.model");

yayoi.util.extend("yayoi.ui.model.Model", "Object", [], function(Object){
    /*根元素的值
     * */
    this._rootValue;
    /*绑定的UI组件
     */
    this._component;
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
    this.getComponent = function (){
        return this._component;
    };
    /*设置绑定的组件
     */
    this.setComponent = function (component){
        this._component = component;
    };
    /* 被继承的函数原型
     */
    this._genExtend = function (){
        return function(params) {
            this.init = function(params) {
                for(var p in params){
                    this[p] = params[p];
                }
            };
            this.init(params);
        };
    };
    /*解析路径为数组
     */
    this._parsePath = function(pathsStr){
        var paths = pathsStr.split("/");
        for(var i=0; i<paths.length; i++){
            if(!paths[i]){
                paths.splice(i, 1);
                i--;
            }
        }
        return paths;
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
                yayoi.log.info(e);
            }
        });
    };
    this.getValue = function(pathsStr) {
        var value = this.getRootValue();

        var paths = this._parsePath(pathsStr);
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
        var paths = this._parsePath(pathsStr);
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
