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
     * °üº¬µÄmenuµã
     * @type {yayoi.ui.menu.MenuNode}
     */
    this.nodes = null;
    this.autoHide = false;
    /**
     * add function execute when menu hide
     * @type {Function}
     */
    this.whenHide = null;

    this.onRendering = function() {
        var html = "<ul class='yayoi-menu'></ul>";
        this.setContainer($(html));
        $(document.body).append(this.getContainer());
    };

    this.afterRender = function() {
        var nodes = this.nodes;
        this.nodes = [];
        for(var i=0; i<nodes.length; i++) {
            this.addNode(nodes[i]);
        }
    };

    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;

        container.hover(function() {
            that.show();
        }, function() {
            if(that.autoHide) {
                that.hide(true);
            }
        });
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
                    if(index && index<this.nodes.length) {
                        var nextNode = container.find("li").eq(index);
                        nextNode.before(nodeContainer);
                    } else {
                        container.append(nodeContainer);
                    }

                }
                menuNode.placeAt(nodeContainer);
                menuNode.setMenu(this);
                this.nodes.splice(index, 0, menuNode);
            } else {
                var node = new yayoi.ui.menu.MenuNode(menuNode);
                this.addNode(node);
            }
        } else {
            this.logger.info(menuNode);
            throw "param should be Object";
        }
    };

    this.removeNode = function(menuNode) {
        if (typeof(menuNode) == "object") {
            if (menuNode instanceof yayoi.ui.menu.MenuNode) {
                menuNode.setMenu(null);
                var container = menuNode.getContainer();
                container.remove();
            } else {
                throw "This is not a menuNode";
            }
        }
    };

    this.setWhenHide = function(whenHide) {
        this.whenHide = whenHide;
    };

    this.getWhenHide = function() {
        return this.whenHide;
    };

    this.setAutoHide = function(autoHide) {
        this.autoHide = autoHide;
    };

    this.getAutoHide = function() {
        return this.autoHide;
    };

    this.setTarget = function(target) {
        this.target = target;
    };

    this.getTarget = function() {
        return this.target;
    };

    this.show = function() {
        if (!this._rendered) {
            this.render();
        }
        var target = this.getTarget();

        if(target && typeof(target) == "object") {
            if(target instanceof yayoi.ui.common.Component) {
                target = target.getContainer();
            }
        }

        var position = {top:0, left:500}
        if(target) {
            position = target.offset();
            position.left = position.left + target.width();
            position.left = position.left - 3;
            position.top = position.top - 3;
        }

        var container = this.getContainer();
        container.css("top", position.top+"px");
        container.css("left", position.left+"px");

        this.setVisible(true);
    };

/**
 * hide the menu
 * @param  {boolean} toSubMenus if this param is true, only the sub menus will be hide;
 * if this is false, all the menu tree will be hide
 * @return {null}
 */
    this.hide = function(toSubMenus) {
        if(toSubMenus) {
            if (!this._rendered) {
                this.render();
            }
            for(var i=0; i<this.nodes.length; i++) {
                var node = this.nodes[i];
                if(node.getSubMenu()) {
                    node.getSubMenu().hide(true);
                }
            }
            this.setVisible(false);
            if(this.whenHide) {
                this.whenHide();
            }
        } else {
            var topMenu = this;
            var target = topMenu.getTarget();

            while(typeof(target) == "object" && target instanceof yayoi.ui.menu.MenuNode) {
                topMenu = target.getMenu();
                target = topMenu.getTarget();
            }
            topMenu.hide(true);
        }
    };
});

yayoi.util.extend("yayoi.ui.menu.MenuNode", "yayoi.ui.common.Component", [], function() {
    this.menu = null;
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

        var subMenuIcon = new yayoi.ui.common.Icon({icon: "play", size: "10px"});
        subMenuIcon.placeAt(container.find(".yayoi-menunode-sub"));

        this.setIcon(this.icon);
        this.setText(this.text);
        this.setClick(this.click);
        this.setSubMenu(this.subMenu);
        this.setDisabled(this.disabled);

        container.find(".yayoi-menunode").click(function(event) {
            if(!that.disabled) {
                if(that.click) {
                    that.click();
                }
                if(!that.subMenu) {
                    that.getMenu().hide();
                }
            }
        });
        container.find(".yayoi-menunode").hover(
            function() {
                if (!that.disabled && that.subMenu) {
                    that.subMenu.show();
                }
            },
            function() {
                if(that.subMenu) {
                    that.subMenu.hide(true);
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
        if(!menu) {
            this.subMenu = null;
            var container = this.getContainer();
            container.find(".yayoi-menunode-sub").hide();
            return;
        }
        if(typeof(menu) == "object") {
            if(menu instanceof yayoi.ui.menu.Menu) {
                this.subMenu = menu;
                menu.setAutoHide(true);
                this.subMenu.setTarget(this);
            } else {
                var newMenu = new yayoi.ui.menu.Menu(menu);
                this.setSubMenu(newMenu);
            }
        }
    };

    this.getSubMenu = function() {
        return this.subMenu;
    };

    this.setMenu = function(menu) {
        this.menu = menu;
    };

    this.getMenu = function() {
        return this.menu
    };

    this.setDisabled = function(disabled) {
        var container = this.getContainer();
        if(disabled) {
            container.find(".yayoi-menunode").addClass("disabled");
        } else {
            container.find(".yayoi-menunode").removeClass("disabled");
        }
    }
});