"use strict";
yayoi.util.initPackages("yayoi.ui.tree");

yayoi.util.extend("yayoi.ui.tree.Tree", "yayoi.ui.common.Component", [], function() {
    /**
     * id key path of node value
     * @type {String}
     */
    this.idPath = "id";
    /**
     * name key path of node value
     * @type {String}
     */
    this.namePath = "name";
    /**
     * parentId key path of node value 
     * @type {String}
     */
    this.parentIdPath = "parent/id"

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
    };

    this.invalidate = function() {
        this.nodes = [];

        var model = this.getModel();
        var nodes = this.getModelValue("./");

        var rootModelPath = this.getModelPath();
        for (var i = 0; i < nodes.length; i++) {
            var modelPath = rootModelPath+"/"+i+"/";
            var node = new yayoi.ui.tree.TreeNode({modelPath: modelPath});

            node.setModel(model);
            this.addNode(node);
        }
    };

    this.initEvents = function() {};

    this.addNode = function(treeNode) {
        if (typeof(treeNode) == "object" && treeNode instanceof yayoi.ui.tree.TreeNode) {
            var container = this.getContainer().find(".yayoi-tree");

            treeNode.setTree(this);

            var parentId = treeNode.getParentId();
            if (!parentId) {
                var nodeContainer = $("<div class='yayoi-treeNodes-container'></div>");
                container.append(nodeContainer);
                treeNode.placeAt(nodeContainer);
            } else {
                var foundParent = false;
                for (var i = 0; i < this.nodes.length; i++) {
                    if (this.nodes[i].getId() == parentId) {
                        this.nodes[i].addSubNode(treeNode);
                        foundParent = true;
                        break;
                    }
                }
                if(!foundParent) {
                    var nodeContainer = $("<div class='yayoi-treeNodes-container'></div>");
                    container.append(nodeContainer);
                    treeNode.placeAt(nodeContainer);
                }
            }
            this.nodes.push(treeNode);
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

            while (typeof(target) == "object" && target instanceof yayoi.ui.menu.TreeNode) {
                topMenu = target.getMenu();
                target = topMenu.getTarget();
            }
            topMenu.hide(true);
        }
    };
});

yayoi.util.extend("yayoi.ui.tree.TreeNode", "yayoi.ui.common.Component", [], function() {
    this.tree = null;
    /**
     * sub treeNodes
     * @type {yayoi.ui.tree.TreeNode}
     */
    this.subNodes = null;
    this.icon = "file-alt";
    this.click = null;
    this.expanded = false;
    this.checked = false;

    this.invalidate = function() {
        this.setIcon(this.icon);

        var container = this.getContainer();
        container.find(".yayoi-treeNode-text").html(this.getName());
    };

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

        container.find(".yayoi-treeNode-self").click(function(event) {
            if (that.click) {
                that.click();
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

    this.setIcon = function(icon) {
        this.icon = new yayoi.ui.common.Icon(icon);
        this.icon.setSize("20px");

        var container = this.getContainer();
        if (this.icon) {
            var iconContaner = container.find(".yayoi-treeNode-icon");
            this.icon.placeAt(iconContaner);
            iconContaner.show();
        }
    };

    /*set the tree this node own to*/
    this.setTree = function(tree) {
        this.tree = tree;
    }

    this.getTree = function() {
        return this.tree;
    };

    this.setClick = function(click) {
        this.click = click;
    };

    this.getParentId = function() {
        return this.getModelValue(this.getTree().parentIdPath);
    };

    this.getName = function() {
        return this.getModelValue(this.getTree().namePath);
    };

    this.getId = function() {
        return this.getModelValue(this.getTree().idPath);
    };

    this.addSubNode = function(treeNode) {
        if (typeof(treeNode) == "object" && treeNode instanceof yayoi.ui.tree.TreeNode) {
            var container = this.getContainer();
            var x = container.find(".yayoi-treeNodes-container");

            var nodeContainer = $("<div class='yayoi-treeNodes-container'></div>");
            x.append(nodeContainer);
            treeNode.placeAt(nodeContainer);
        }
    };
});