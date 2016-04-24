"use strict";
yayoi.util.initPackages("yayoi.ui.tree");

yayoi.util.extend("yayoi.ui.tree.Tree", "yayoi.ui.common.Component", [], function() {
    /**
     * id key path of node value
     * @type {String}
     */
    this.idPath = "./id";
    /**
     * parentId key path of node value 
     * @type {String}
     */
    this.parentIdPath = "./parent/id"

    /**
     * 包含的全部treeNode节点
     * @type {yayoi.ui.tree.TreeNode}
     */
    this.nodes = null;

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-tree'></div>";
        container.html(html);
    };

    this.afterRender = function() {
        this.nodes = [];
        var nodes = this.getModel().getValue("/");
        for (var i = 0; i < nodes.length; i++) {
            this.addNode(nodes[i]);
        }
    };

    this.initEvents = function() {};

    this.addNode = function(treeNode) {
        if (typeof(treeNode) == "object") {
            if (treeNode instanceof yayoi.ui.tree.TreeNode) {
                var container = this.getContainer();
                var nodeContainer = $("<div class='yayoi-treeNodes-container'></div>");

                if (!treeNode.getParentId()) {
                    container.append(nodeContainer);
                    treeNode.setContainer(nodeContainer);
                } else {
                    for (var i = 0; i < this.nodes.length; i++) {
                        if (this.nodes[i].getId() == treeNode.getParentId()) {
                            this.nodes[i].addSubNode(treeNode);
                        }
                    }
                }
            } else {
                var node = new yayoi.ui.tree.treeNode(treeNode);
                this.addNode(node);
            }
        } else {
            this.logger.info(treeNode);
            throw "param should be Object";
        }
    };

    this.removeNode = function(treeNode) {
        if (typeof(treeNode) == "object") {
            if (treeNode instanceof yayoi.ui.tree.treeNode) {
                var container = treeNode.getContainer();
                container.remove();
            } else {
                throw "This is not a treeNode";
            }
        }
    };

    /**
     * hide the menu
     * @param  {boolean} toSubMenus if this param is true, only the sub menus will be hide;
     * if this is false, all the menu tree will be hide
     * @return {null}
     */
    this.collapseAll = function(toSubMenus) {
        if (toSubMenus) {
            if (!this._rendered) {
                this.render();
            }
            for (var i = 0; i < this.nodes.length; i++) {
                var node = this.nodes[i];
                if (node.getSubMenu()) {
                    node.getSubMenu().hide(true);
                }
            }
            this.setVisible(false);
            if (this.whenHide) {
                this.whenHide();
            }
        } else {
            var topMenu = this;
            var target = topMenu.getTarget();

            while (typeof(target) == "object" && target instanceof yayoi.ui.menu.treeNode) {
                topMenu = target.getMenu();
                target = topMenu.getTarget();
            }
            topMenu.hide(true);
        }
    };
});

yayoi.util.extend("yayoi.ui.tree.TreeNode", "yayoi.ui.common.Component", [], function() {
    this.menu = null;
    /**
     * sub treeNodes
     * @type {yayoi.ui.tree.TreeNode}
     */
    this.subNodes = null;
    this.icon = null;
    this.text = null;
    this.click = null;
    this.expanded = false;

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-treeNode'>";
        html += "<div class='yayoi-treeNode-self'>"
        html += "<div class='yayoi-treeNode-icon'></div>"
        html += "<span class='yayoi-treeNode-text'></span>";
        html += "</div>"
        html += "<div class='yayoi-treeNodes-container'></div>";
        html += "</div>";
        container.html(html);
    };

    this.afterRender = function() {
        var container = this.getContainer();
        var that = this;

        this.setIcon(this.icon);
        this.setText(this.text);
        this.setClick(this.clic);

        container.find(".yayoi-treeNode-self").click(function(event) {
            if (!that.expanded) {
                if (that.click) {
                    that.click();
                }
                if (!that.subMenu) {
                    that.getMenu().hide();
                }
            }
        });
    };

    /**
     * expand the tree node
     * @param {boolean} expand
     */
    this.setExpand = function(expand) {
        var container = this.getContainer();
        if (expand) {
            container.find(".yayoi-treeNodes-container").show();
        } else {
            container.find(".yayoi-treeNodes-container").hide();
        }
        this.expanded = expand;
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
        var iconContaner = container.find(".yayoi-treeNode-icon");
        iconContaner.hide();
        if (this.icon) {
            iconContaner = container.find(".yayoi-treeNode-icon");
            this.icon.placeAt(iconContaner);
            iconContaner.show();
        }
    };

    this.setText = function(text) {
        this.text = text;
        var container = this.getContainer();
        container.find(".yayoi-treeNode-text").html(this.text);
    };

    this.getText = function() {
        return this.text;
    };

    this.setClick = function(click) {
        this.click = click;
    };

    this.addSubNode = function(treeNode) {
        if (!menu) {
            this.subMenu = null;
            var container = this.getContainer();
            container.find(".yayoi-treeNode-sub").hide();
            return;
        }
        if (typeof(menu) == "object") {
            if (menu instanceof yayoi.ui.menu.Menu) {
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
        if (disabled) {
            container.find(".yayoi-treeNode").addClass("disabled");
        } else {
            container.find(".yayoi-treeNode").removeClass("disabled");
        }
    }
});