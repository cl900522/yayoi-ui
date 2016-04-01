"use strict";
yayoi.util.initPackages("yayoi.ui.menu");

yayoi.util.extend("yayoi.ui.menu.Menu", "yayoi.ui.common.Component", [], function() {
    /**
     * the target that menu should be anchor to
     * @type {yayoi.ui.common.Component || jQuery}
     */
    this.target = null;
    /**
     * the place of target that menu will show
     * @type {String}
     */
    this.place = "bottom";
    /**
     * 包含的menu点
     * @type {yayoi.ui.menu.MenuNode}
     */
    this.nodes = null;

    this.beforeRender = function() {
        var nodes = [];
        if(this.nodes) {
            for(var i=0; i<this.nodes.length; i++) {
                nodes.push(new yayoi.ui.menu.MenuNode(this.nodes[i]));
            }
        }
        this.nodes = nodes;
    };

    this.onRendering = function() {
        var html = "<ul class='yayoi-menu'></ul>";
        this.container = $(html);
        $(document).append(this.container);
    };

    this.addNode = function(menuNode, index) {
        if(typeof(menuNode) == "object" ){
            if(menuNode instanceof yayoi.ui.menu.MenuNode) {
                var container = this.getContainer();
                var nodeContainer = $("<li></li>");
                if(this.nodes.length == 0) {
                    index = 0;
                    container.append(nodeContainer);
                } else {
                    index = index? index: this.nodes.length;
                    var nextNode = container.find(".yayoi-menu").eq(index);
                    nextNode.before(nodeContainer);
                }
                menuNode.placeAt(nodeContainer);
                this.nodes.splice(index, 0, node);
            } else {
                var node = new yayoi.ui.menu.MenuNode(menuNode);
                addNode(node);
            }
         } else {
            throw "param should be Object";
        }
    };

    this.removeNode = function(menuNode) {
        if(typeof(menuNode) == "object" ){
            if(menuNode instanceof yayoi.ui.menu.MenuNode) {
                var container = menuNode.getContainer();
                container.remove();
            }
         } else {
            throw "param should be Object";
        }
    };

    this.setTarget = function(target) {
        this.target = target;
    };

    this.getTarget = function() {
        return this.target;
    };
});

yayoi.util.extend("yayoi.ui.menu.MenuNode", "yayoi.ui.common.Component", [], function() {
    /**
     * sub menu
     * @type {yayoi.ui.menu.Menu}
     */
    this.subMenu = null;
    this.icon = null;
    this.text = null;
    this.click = null;
    this.disabled = false;

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-menunode'>";
        html += "<div class='yayoi-menunode-icon'></div>"
        html += "<span class='yayoi-menunode-text'></span>";
        html += "<span class='yayoi-menunode-sub'></span>";
        html += "</div >";
        container.html(html);
    };

    this.afterRender = function() {
        var container = this.getContainer();
        var that = this;
        this.seIcon(this.icon);
        this.setText(this.text);
        this.setClick(this.click);
        this.setSubMenu(this.subMenu);
        container.find(".yayoi-menunode").click(function(event) {
            if(!that.disabled) {
                that.click();
            }
        });
        container.find(".yayoi-menunode").hover(
            function() {
                if (!that.disabled && that.subMenu) {
                    that.subMenu.setVisible(true);
                }
            },
            function() {
                if(that.subMenu) {
                    that.subMenu.setVisible(false);
                }
            }
        );
    };

    this._initIcon = function(icon) {
        var iconObject = null;
        var iconSize = "20px";
        if (icon) {
            if (typeof(icon) == "string") {
                iconObject = new yayoi.ui.common.Icon({
                    icon: icon
                });
            }
            if (typeof(icon) == "object") {
                if (icon instanceof yayoi.ui.commono.Icon) {
                    iconObject = icon;
                } else {
                    iconObject = new yayoi.ui.common.Icon(icon);
                }
            }
            iconObject.size = iconSize;
        }
        return iconObject;
    };

    this.setIcon = function(icon) {
        this.icon = this._initIcon(icon);
        var container = this.getContainer();
        var iconContaner = container.find(".yayoi-menunode-icon");
        iconContaner.hide();
        if (this.icon) {
            iconContaner = container.find(".yayoi-menunode-icon");
            this.icon.placeAt(iconContaner);
            iconContaner.show();
        }
    };

    this.setText = function(text) {
        this.text = text;
        var container = this.getContainer();
        container.find(".yayoi-menunode-text").html(this.text);
    };

    this.getText = function() {
        return this.text;
    };

    this.setClick = function(click) {
        this.click = click;
    };

    this.setSubMenu = function(menu) {
        if(typeof(menu) == "object") {
            if(menu instanceof yayoi.ui.menu.Menu) {
                this.subMenu = menu;
            } else {
                this.subMenu = new yayoi.ui.menu.Menu(menu);
                this.subMenu.setTarget(this);
            }
        } else {
            throw "param is not legal";
        }
    };

});