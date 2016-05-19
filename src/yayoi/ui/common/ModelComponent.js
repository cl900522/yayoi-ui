"use strict";
yayoi.util.initPackages("yayoi.ui.common");

yayoi.util.extend("yayoi.ui.common.ModelComponent", "yayoi.ui.common.BasicComponent", [], function() {
    this._model; // model object to storing value
    this._router; //value path in model

    /*call this if model changed*/
    this.invalidate = function() {
        if (this.getContainer()) {
            if (!this.getRendered()) {
                this.render();
            } else {
                if (this.getModel()) {
                    this.reRender();
                }
            }
        }
    };
    this.setModel = function(oModel, sRouter) {
        if (oModel) {
            if (this._model) {
                this._model.removeListener(this);
            }
            this._model = oModel;
            this._router = sRouter || "/";
            if (this._model) {
                this._model.addListener(this);
            }
            this.invalidate();
            return true;
        } else {
            return false;
        }
    };
    this.getModel = function() {
        return this._model;
    };
    this.getRouter = function() {
        return this._router;
    };
    this.getModelValue = function(path) {
        if (this.getModel()) {
            var router = this.getRouter();
            return this.getModel().getValue(router + "/" + path);
        } else {
            return null;
        }
    };
});
