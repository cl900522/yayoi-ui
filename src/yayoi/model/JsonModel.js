"use strict";
yayoi.util.initPackages("yayoi.model");

yayoi.util.extend("yayoi.model.JsonModel", "yayoi.model.Model", [], function(){
    this.getValue = function(pathsStr) {
        var value = this.getRootValue();

        var router = new yayoi.util.Router(pathsStr);
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
        var router = new yayoi.util.Router(pathsStr);

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
