"use strict";
yayoi.util.initPackages("yayoi.model");

yayoi.util.extend("yayoi.model.XMLModel", "yayoi.model.Model", [], function(){
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
