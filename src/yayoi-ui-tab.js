yayoi.util.initPackages("yayoi.ui.tab");

yayoi.util.extend("yayoi.ui.tab.URLTabNode", "yayoi.ui.common.SubComponent", [], function(){
    this.code;
    this.title;
    this.src;

    this.tab;
    this.frame;
    this.isActive = false;
    this.closeable = true;
    this.parent;
    this.afterInit = function(){
        if(!this.title){
            throw new Error("No title to create tab node");
        }
        this.frame = $('<iframe src="'+this.src+'"scrolling="auto" frameborder="0"></iframe>');

        this.tab = $('<li>'+this.title+'<a class="closeTab"></a></li>');
        var closeButton = this.tab.find(".closeTab");
        if(this.closeable){
            closeButton.bind("click", function(event){
                that.close();
            });
            closeButton.show();
        } else {
            closeButton.hide();
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
        this.tab.addClass("active").removeClass("deactive");
        this.frame.addClass("active").removeClass("deactive");
        this.isActive = true;
    }
    this.deactive = function(){
        this.tab.removeClass("active").addClass("deactive");
        this.frame.removeClass("active").addClass("deactive");
        this.isActive = false;
    }
    this.close = function(){
        this.remove();
    }
    this.click = function(){
        this.active();
    }
});

yayoi.util.extend("yayoi.ui.tab.URLTab", "yayoi.ui.common.Component", [], function(){
    this.navBar;
    this.contentContainer;
    this.tabNodes = {};

    this.onRendering = function() {
        var container = this.getContainer();

        this.navBar = $('<ul></ul>');
        this.contentContainer = $('<div><div>');
        this.navBar.addClass("yayoi-ui-tabs-nav");
        this.contentContainer.addClass("yayoi-ui-tabs-main");

        container.addClass("yayoi-ui-tabs");
        container.append(this.navBar);
        container.append(this.contentContainer);

        var tabs = this.tabs;
        for(var i=0; i<tabs.length; i++) {
            this.addTab(tabs[i]);
        }
    };
    this.resize = function(){
        var container = this.getContainer();
        var frameHeight = container.height() - 40;
        this.contentContainer.height(frameHeight + "px");
    };
    this.getTab = function(code) {
        return this.tabNodes[code];
    };
    this.deactiveAll = function(){
        for(var p in this.tabNodes){
            this.tabNodes[p].deactive();
        }
    };
    this.addTab = function(tab) {
        if(!(tab instanceof yayoi.ui.tab.URLTabNode)){
            var tab = new yayoi.ui.tab.URLTabNode(tab);
            this.addTab(tab);
            return;
        }

        if(this.tabNodes[tab.code]){
            this.tabNodes[tab.code].active();
            return;
        }

        var tabNav = $('<li>'+tab.title+'<a class="closeTab"></a></li>');
        var closeButton = tabNav.find(".closeTab");
        if(tabNav.closeable){
            closeButton.bind("click", function(event){
                tab.close();
                tabNav.hide();
            });
            closeButton.show();
        } else {
            closeButton.hide();
        }
        var that = this;
        tabNav.bind("click", function(event){
            that.click();
        });

        this.navBar.append(tabNav);
        tab.setContainer();

        this.contentContainer.append(tab.frame);
        tab.active();
        this.tabNodes[tab.code] = tab;
    };
    this.refresh = function(){
        for(var p in this.tabNodes){
            if(this.tabNodes[p].isActive){
                this.tabNodes[p].refresh();
            }
        }
    }
});
