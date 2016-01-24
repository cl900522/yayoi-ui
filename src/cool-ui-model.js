cool.util.initPackages("cool.ui.model");

cool.util.extend("cool.ui.model.Model", "Object", [], function(Object){
    this.component;
    this.getValue = function() {
        throw "Can not call getValue in base Model";
    };
    this.setValue = function() {
        throw "Can not call setModel in base Model";
    };
    this.getComponent = function (){
        return this.component;
    };
    this.setComponent = function (component){
        this.component = component;
    };
    this._toextend = function (){
        this.init = function(params) {
            for(var p in params){
                this[p] = params[p];
            }
        };
        this.init(params);
    }
});

cool.util.extend("cool.ui.model.JsonModel", "cool.ui.model.Model", [], function(){
    this.rootValue = null;
    this.loaded = false;
    this.method = "post";
    this.params = [];
    this._parseData = function(result) {
        this.loaded = true;
        this.rootValue = this.parseData(result);
    };
    this.parseData = function(data) {
        return data;
    }
    this.load = function(){
        var that = this;
        $.ajax({
            url : that.url,
            method : that.method,
            params : that.params,
            success : that._parseData
        });
    }
    this.setRootValue = function (value) {
        this.rootValue = value;
        if(this.getComponent() != null){
            
        }
    }
    this.getValue = function(valuePath) {
        var paths = valuePath.split("/");
        var value = this.rootValue;
        for(var i=0; i<paths.length; i++) {
            if(value != null && value[paths[i]] != null){
                value = value["" + paths[i]];
            } else {
                return null;
            }
        }
        return value;
    };
    this.setValue = function(valuePath, value) {
        var paths = valuePath.split("/");
        var parentPath = this.rootValue;
        for(var i=0; i<paths.length - 1; i++) {
            if(parentPath != null && parentPath[paths[i]] != null){
                parentPath = parentPath["" + paths[i]];
            } else {
                parentPath = null;
            }
        }
        if(parentPath != null){
            parentPath[paths[paths.length-1]] = value;
        } else {
            throw "there is no";
        }
        
    };
});
