yayoi.util.initPackages("yayoi.ui.common");

yayoi.util.extend("yayoi.ui.common.Component", "Object", [], function(){
    /**
     * jquery selector to get container, 
     * please reference to placeAt() function.
     * */
    this.selector;
    this.container;
    this.model;

    this.placeAt = function(selector) {
        this.container = $(selector);
        this.render();
    };
    /**
     * render function of component, 
     * it will call beforeRender(); onRendering(); afterRender() functions in order
     */
    this.render = function() {
        this.beforeRender();
        this.onRendering();
        this.afterRender();
    }
    this.beforeRender = function() {
    };
    this.onRendering = function() {
    };
    this.afterRender = function() {
    };
    this.setModel = function(model) {
        this.model = model;
        this.render();
    };
    this.getModel = function() {
        return this.model;
    };
    this._toextend = function (){
        this.init = function(params) {
            for(var p in params){
                this[p] = params[p];
            }
            if(this["selector"] != null){
                this.placeAt(this["selector"]);
            }
        };
        this.init(params);
    }
});

yayoi.util.extend("yayoi.ui.form.Field", "yayoi.ui.common.Component", [], function(){
    this.setValue = function() {
        
    };
    this.getValue = function() {
        
    }
});

yayoi.util.extend("yayoi.ui.form.ImageViewer", "yayoi.ui.form.Field", [], function() {
    this.imgTagId = "";
    this.fileTagId = "";
    this.hint = "";
    this.fileReader = null;
    this.imageFile = null;
    this.imageSrc = "";
    this.callBack = null;
    this.fileSize = 1024*1024;

    this.init = function(params){
        if(!params){
            return;
        }
        for(var p in params){
            this[p] = params[p];
        }
    }
    this.placeAt = function(targetId) {
        this.targetId = targetId;
        var imgTagId = targetId + "_preview" + Math.round();
        var fileTagId = targetId + "_file" + Math.round();
        this.imgTagId = imgTagId;
        this.fileTagId = fileTagId;

        this.render();
        this.onAfterRender();
    }
    this.render = function(){
        if(!this.imgTagId || !this.fileTagId){
            console.log("Error to init ImageVier, because tag does not exist!");
        }
        var html = '<img id="' + this.imgTagId + '"  class="myImage" alt="" src=""></img>';
        html += '<input type="file" id="' + this.fileTagId + '"/>';
        html += '<br><span>' + this.hint + '</span>';
        $("#" + this.targetId).html(html);
    }
    this.onAfterRender = function(){
        this.fileReader = new FileReader();

        var self = this;
        $("#"+this.fileTagId).change(function(e) {
            var file = e.target.files[0];
            self.previewFile(file)
        });
    }
    this.setHint = function(hint){
        this.hint = hint;
    }
    this.previewFile = function(file) {
        console.log("To preview file");
        var self = this;
        this.fileReader.onload = (function() {
            return function(e) {
                $('#'+self.imgTagId).attr('src', e.target.result);
            };
        })(file);
        this.fileReader.readAsDataURL(file);
        this.imageFile = file;
    }

    this.uploadImageFile = function(){
        var self = this;
        var imageCode = $('#'+this.imgTagId).attr('src').split(',')[1];
        if(this.imageFile){
            if(this.checkFileSize()) {
                var fileName = this.imageFile.name;
                $.post('/web/uploadFile',
                        [
                            { name: 'fileCode', value: imageCode },
                            { name: 'fileName', value: fileName }
                        ],
                        function(result) {
                    if(result.code == 0){
                        self.setImageSrc(result.body);
                        self.callBack();
                    }else{
                        Ext.Msg.alert("提示", '保存失败:'+result.message);
                    }
                });
            }
        } else {
            this.callBack();
        }
    }
    this.setImageSrc = function(src){
        this.imageSrc = src;
        $('#'+this.imgTagId).attr('src', this.imageSrc);
    }
    this.getImageSrc = function(){
        this.imageSrc = $('#'+this.imgTagId).attr('src');
        return this.imageSrc;
    }
    this.setCallBack = function(callBack){
        this.callBack = callBack;
    }
    this.checkFileSize = function (){
        var file = document.getElementById(this.fileTagId).files[0];
        if (file) {
            return file.size <= this.fileSize;
        }
        return true;
    };
    this.getFileSizeString = function(){
        var fileSize = "";
        if (this.fileSize >= 1024 * 1024){
            fileSize = Math.round(this.fileSize * 100 / (1024 * 1024)) / 100 + 'MB';
        }
        else {
            fileSize = Math.round(this.fileSize * 100 / 1024) / 100 + 'KB';
        }
        return fileSize;
    }
    this.init(params);
});

var TextEditor = function(tagId){
    this.tagId = "";
    this.textContent = "";

    this.init = function(tagId){
        var that = this;
        CKEDITOR.replace(tagId);
        this.tagId = tagId;

        if(that.textContent){
            setTimeout(function(){
                here.setTextContent(that.textContent);
            }, 4000)
        }
    }

    this.setTextContent = function(textContent){
        var here = this;
        this.textContent = textContent;
        var tagid = this.tagId;
        console.log(CKEDITOR.instances[this.tagId]);
        if(CKEDITOR.instances[this.tagId]){
            console.log("####### finished")
            CKEDITOR.instances[this.tagId].setData(this.textContent);
        }else{
            console.log("#######not finished")
            setTimeout(function(){
                here.setTextContent(textContent);
            }, 1000)
        }
    }
    this.getTextContent = function(){
        this.textContent = CKEDITOR.instances[this.tagId].getData();
        return this.textContent;
    }
    this.init(tagId);
}
var SelectDialog = function(params){
    this.title;
    this.url;
    this.isMultiSelect = false;
    this.window;
    this.frameId = "selectIframe_"+Math.random();

    this.success = function(datas){
        console.log("This is the default success call back");
        console.log(datas);
    };
    this.showDialog = function(){
        var that = this;
        function hideWindow(){
            that.window.hide();
        }
        function transData(){
            var dataGrid = document.getElementById(that.frameId).contentWindow.grid;
            var selection = dataGrid.getView().getSelectionModel().getSelection();
            var datas = [];
            for(var i=0; i<selection.length; i++){
                datas.push(selection[i].data);
            }
            if (datas.length != 0) {
                that.success(datas);
                that.window.hide();
            } else {
                Ext.Msg.alert(siping.tools.i18n.getMessage("message.hint"), siping.tools.i18n.getMessage("message.pleaseSelectData"));
            }
        }
        if(this.isMultiSelect){
            that.url += "?isMultiSelect=true";
        }else{
            that.url += "?isMultiSelect=false";
        }
        if(this.window == null){
            this.window = new Ext.Window({
                tittle: that.title,
                width: 1000,
                height: 500,
                closable: true,
                closeAction:'hide',
                modal: true,
                html: '<iframe id="'+that.frameId+'" style="overflow:hidden;width:100%; height:100%;" src="'+that.url+'" frameborder="0"></iframe>',
                buttons:[{
                    text: siping.tools.i18n.getMessage("message.cancel"),
                    handler: hideWindow
                },{
                    text: siping.tools.i18n.getMessage("message.sure"),
                    handler: transData
                }]
            });
        }
        this.window.show();
    }
    this.init = function(params){
        if(!params){
            return;
        }
        for(var p in params){
            this[p] = params[p];
        }
    }
    this.init(params)
}
var SipingTabNode = function(params){
    this.code;
    this.title;
    this.tab;
    this.frame;
    this.isActive = false;
    this.closeable = true;
    this.parent;
    this.init = function(params){
        if(!params.code || !params.title){
            throw new Error("No code or title to create tab node");
        }
        this.code = params.code;
        this.title = params.title;
        this.tab = $('<li>'+this.title+'</li>');
        this.frame = $('<iframe src="'+params.src+'"scrolling="auto" frameborder="0"></iframe>');
        if(params['closeable'] != undefined){
            this.closeable = params['closeable'];
        }
        if(this.closeable){
            var quitButton = $('<a class="closeTab"></a>')
            this.tab.append(quitButton);
            quitButton.bind("click", function(event){
                that.close();
            });
        }
        var that = this;
        this.tab.bind("click", function(event){
            that.click();
        });
    }
    this.refresh = function(){
        var f = this.frame[0];
        f.src = f.src;
    }
    this.remove = function(){
        this.tab.remove();
        this.frame.remove();
        delete this.parent.tabNodes[this.code];
        delete this;
    }
    this.active = function(){
        this.parent.deactiveAll();
        this.tab.removeClass("visited");
        this.tab.addClass("hover");
        this.frame.removeClass("visited");
        this.isActive = true;
    }
    this.deactive = function(){
        this.tab.addClass("visited");
        this.tab.removeClass("hover");
        this.frame.addClass("visited");
        this.isActive = false;
    }
    this.close = function(){
        this.remove();
    }
    this.click = function(){
        this.active();
    }
    this.init(params);
}
var SipingTab = function(tabControlId) {
    this.divContainer;
    this.tabContainer;
    this.frameContainer;
    this.tabNodes = {};

    this.init = function(params){
        this.tabContainer = $('<ul></ul>');
        this.frameContainer = $('<div class="main">');
        if(params){
            if(params["placeAt"]){
                this.placeAt(params["placeAt"]);
            }
        }
    }
    this.placeAt = function(divId) {
        this.divContainer = $("#"+divId);
        this.divContainer.addClass("siping-tabs");
        this.divContainer.append(this.tabContainer);
        this.divContainer.append(this.frameContainer);

        this.resize();
    };
    this.resize = function(){
        var frameHeight = this.divContainer.height() - 40;
        this.frameContainer.height(frameHeight + "px");
    };
    this.getTabNode = function(code) {
        return this.tabNodes[code];
    }
    this.createTabNode = function(params) {
        var tabNode = new SipingTabNode(params);
        return tabNode;
    }
    this.deactiveAll = function(){
        for(var p in this.tabNodes){
            this .tabNodes[p].deactive();
        }
    }
    this.addTabNode = function(tabNode) {
        if(this.tabNodes[tabNode.code]){
            this.tabNodes[tabNode.code].active();
            return;
        }
        this.tabNodes[tabNode.code] = tabNode;
        tabNode.parent = this;

        this.tabContainer.append(tabNode.tab);
        this.frameContainer.append(tabNode.frame);
        tabNode.active();
    };
    this.refresh = function(){
        for(var p in this.tabNodes){
            if(this.tabNodes[p].isActive){
                this.tabNodes[p].refresh();
            }
        }
    }
    this.init();
}