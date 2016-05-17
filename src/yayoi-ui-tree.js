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
    this.parentIdPath = "parent/id";
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

    this.afterRender = function() {};

    this.invalidate = function() {
        this.nodes = [];

        var model = this.getModel();
        var nodes = this.getModelValue("./");

        var rootModelPath = this.getModelPath();
        for (var i = 0; i < nodes.length; i++) {
            var modelPath = rootModelPath + "/" + i + "/";
            var node = new yayoi.ui.tree.TreeNode({
                modelPath: modelPath
            });

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
                if (!foundParent) {
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
    this.subNodes = [];
    this.subConainter = null;
    this.icon = "file-alt";

    this.expand = false;
    this.checkIcon = null;
    this.checked = false;

    this.invalidate = function() {
        this.setIcon(this.icon);
        this.setChecked(this.getChecked());
        this.setExpand(this.expand);

        var container = this.getContainer();
        container.find(".yayoi-treeNode-text").html(this.getName());
    };

    this.beforeRender = function() {
        this.subNodes = [];
    };

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-treeNode'>";
        html += "<div class='yayoi-treeNode-self'>"
        html += "<div class='yayoi-treeNode-check'></div>"
        html += "<div class='yayoi-treeNode-icon'></div>"
        html += "<span class='yayoi-treeNode-text'></span>";
        html += "</div>"
        html += "<div class='yayoi-treeNodes-container'></div>";
        html += "</div>";
        container.html(html);
        this.subConainter = container.find(".yayoi-treeNodes-container")
    };

    this.afterRender = function() {
        var container = this.getContainer();
        var that = this;

        container.find(".yayoi-treeNode-self").click(function() {
            if (that.click) {
                that.click();
            }
        });
        container.find(".yayoi-treeNode-self").click(function() {
            var expanded = that.getExpand();
            that.setExpand(!expanded);
        });
        container.find(".yayoi-treeNode-check").click(function() {
            var checked = that.getChecked();
            that.setChecked(!checked);
        });
    };

    /**
     * expand the tree node
     * @param {boolean} expand
     */
    this.setExpand = function(expand) {
        var container = this.getContainer();
        if (expand) {
            this.setIcon("folder-open-alt");
            container.find(".yayoi-treeNodes-container").show();
        } else {
            this.setIcon("folder-close-alt");
            container.find(".yayoi-treeNodes-container").hide();
        }
        this.expand = expand;
    };

    this.getExpand = function() {
        return this.expand;
    };

    /**
     * check the tree node and also the sub nodes
     * @param {boolean} checked
     */
    this.setChecked = function(checked) {
        var subNodes = this.subNodes;
        for (var i = 0; i < subNodes.length; i++) {
            var subNode = subNodes[i];
            subNode.setChecked(checked);
        }
        if (checked) {
            this.setCheckIcon("check")
        } else {
            this.setCheckIcon("unchecked")
        }
        this.checked = checked;
    };

    this.getChecked = function() {
        return this.checked;
    };

    this.setCheckIcon = function(icon) {
        if (!this.checkIcon || !(this.checkIcon instanceof yayoi.ui.common.Icon)) {
            this.checkIcon = new yayoi.ui.common.Icon(icon);
            this.checkIcon.setSize("16px");

            var container = this.getContainer();
            var iconContaner = container.find(".yayoi-treeNode-check");
            this.checkIcon.placeAt(iconContaner);
        }
        this.checkIcon.reset(icon);
    };

    this.setIcon = function(icon) {
        if (!this.icon || !(this.icon instanceof yayoi.ui.common.Icon)) {
            this.icon = new yayoi.ui.common.Icon(icon);
            this.icon.setSize("20px");

            var container = this.getContainer();
            var iconContaner = container.find(".yayoi-treeNode-icon");
            this.icon.placeAt(iconContaner);
        }
        this.icon.reset(icon);
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
            var nodeContainer = $("<div class='yayoi-treeNodes-container'></div>");
            this.subConainter.append(nodeContainer);
            treeNode.placeAt(nodeContainer);
        }
        this.subNodes.push(treeNode);
        console.log(this.subNodes);
    };
});
