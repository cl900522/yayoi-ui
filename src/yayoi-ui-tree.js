"use strict";
yayoi.util.initPackages("yayoi.ui.tree");

yayoi.util.extend("yayoi.ui.tree.Tree", "yayoi.ui.common.ModelComponent", [], function() {
    this.parentExpandIcon = {icon: "folder-close", color: ""};
    this.parentCollapseIcon = {icon: "folder-open", color: ""};
    this.sonIcon = {icon: "file-alt", color: ""};
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
                var nodeContainer = $("<div class='yayoi-treeNode-box'></div>");
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
                    var nodeContainer = $("<div class='yayoi-treeNode-box'></div>");
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
     * collapse all the nodes
     * @return {null}
     */
    this.collapseAll = function() {
        var nodes = this.nodes;
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].setExpand(false);
        }
    };

    /**
     * expand all the nodes
     * @return {null}
     */
    this.expandAll = function() {
        var nodes = this.nodes;
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].setExpand(true);
        }
    };
});

yayoi.util.extend("yayoi.ui.tree.TreeNode", "yayoi.ui.common.ModelComponent", [], function() {
    this.tree = null;
    /**
     * sub treeNodes
     * @type {yayoi.ui.tree.TreeNode}
     */
    this.subNodes = [];
    this.subConainter = null;
    this.icon = "file";

    this.expand = false;
    this.expandIcon = null;
    this.checkIcon = null;
    this.checked = false;

    this.invalidate = function() {
        this.setIcon(this.icon, "#0b43ed");
        this.setChecked(this.getChecked());
        this.setExpand(this.expand);

        var container = this.getContainer();
        container.find(".yayoi-treeNode-text").first().html(this.getName());
    };

    this.beforeRender = function() {
        this.subNodes = [];
    };

    this.onRendering = function() {
        var container = this.getContainer();
        var html = "<div class='yayoi-treeNode'>";
        html += "<div class='yayoi-treeNode-self'>"
        html += "<div class='yayoi-treeNode-expand'></div>"
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
        container.find(".yayoi-treeNode-expand").hide();
    };

    this.initEvents = function() {
        var container = this.getContainer();
        var that = this;

        container.find(".yayoi-treeNode-self").click(function() {
            if (that.click) {
                that.click();
            }
        });
        container.find(".yayoi-treeNode-expand").click(function() {
            var expanded = that.getExpand();
            that.setExpand(!expanded);
        });
        container.find(".yayoi-treeNode-check").click(function() {
            var checked = that.getChecked();
            that.setChecked(!checked);
        });
    }

    /**
     * expand the tree node
     * @param {boolean} expand
     */
    this.setExpand = function(expand) {
        var subConainter = this.subConainter;
        if (expand) {
            this.setExpandIcon("collapse-alt");
            subConainter.show();
        } else {
            this.setExpandIcon("expand-alt");
            subConainter.hide();
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

    this.setExpandIcon = function(sIcon, sColor) {
        if (!this.expandIcon || !(this.expandIcon instanceof yayoi.ui.common.Icon)) {
            this.expandIcon = new yayoi.ui.common.Icon(sIcon);
            this.expandIcon.setSize("16px");

            var container = this.getContainer();
            var iconContaner = container.find(".yayoi-treeNode-expand");
            this.expandIcon.placeAt(iconContaner);
        }
        this.expandIcon.reset(sIcon);
        if (sColor) {
            this.expandIcon.setColor(sColor);
        };
    };

    this.setCheckIcon = function(icon, sColor) {
        if (!this.checkIcon || !(this.checkIcon instanceof yayoi.ui.common.Icon)) {
            this.checkIcon = new yayoi.ui.common.Icon(icon);
            this.checkIcon.setSize("16px");

            var container = this.getContainer();
            var iconContaner = container.find(".yayoi-treeNode-check");
            this.checkIcon.placeAt(iconContaner);
        }
        this.checkIcon.reset(icon);
        if (sColor) {
            this.checkIcon.setColor(sColor);
        };
    };

    this.setIcon = function(icon, sColor) {
        if (!this.icon || !(this.icon instanceof yayoi.ui.common.Icon)) {
            this.icon = new yayoi.ui.common.Icon(icon);
            this.icon.setSize("18px");

            var container = this.getContainer();
            var iconContaner = container.find(".yayoi-treeNode-icon");
            this.icon.placeAt(iconContaner);
        }
        this.icon.reset(icon);
        if (sColor) {
            this.icon.setColor(sColor);
        };
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
            var nodeContainer = $("<div class='yayoi-treeNode-box'></div>");
            this.subConainter.append(nodeContainer);
            treeNode.placeAt(nodeContainer);
        }
        this.subNodes.push(treeNode);

        this.setIcon("folder-close", "#eda00b");
        var container = this.getContainer();
        container.find(".yayoi-treeNode-expand").first().show();
    };
});
