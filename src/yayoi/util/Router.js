"use strict";
yayoi.initPackages("yayoi.util");

yayoi.extend("yayoi.util.Router", "yayoi.core.Object", [], function(){
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
