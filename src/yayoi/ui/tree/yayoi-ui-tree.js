"use strict";
yayoi.initPackages("yayoi.ui.tree");

yayoi.extend("yayoi.ui.tree.Tree", "yayoi.ui.common.ModelComponent", ["yayoi.ui.tree.TreeNode"], function() {
    this.parentExpandIcon = {
        icon: "folder-close",
        color: ""
    };
    this.parentCollapseIcon = {
        icon: "folder-open",
        color: ""
    };
    this.sonIcon = {
        icon: "file-alt",
        color: ""
    };
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

    this.reRender = function() {
        this.nodes = [];

        var model = this.getModel();
        var nodes = this.getModelValue("./");

        for (var i = 0; i < nodes.length; i++) {
            var id = this.getModelValue(i + "/" + this.idPath);
            var parentId = this.getModelValue(i + "/" + this.parentIdPath);
            var name = this.getModelValue(i + "/" + this.namePath);

            var node = new yayoi.ui.tree.TreeNode({
                id: id,
                parentId: parentId,
                name: name
            });
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
