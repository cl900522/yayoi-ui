"use strict";
yayoi.util.initPackages("yayoi.ui.tree");

yayoi.util.extend("yayoi.ui.tree.TreeNode", "yayoi.ui.common.BasicComponent", ["yayoi.ui.common.Icon"], function() {
    this.id = null;
    this.parentId = null;
    this.name = null;

    this.tree = null;
    /**
     * sub treeNodes
     * @type {yayoi.ui.tree.TreeNode}
     */
    this.subNodes = [];
    this.subContainer = null;

    this.expand = false;
    this.expandIcon = null;
    this.checkIcon = null;
    this.checked = false;
    this.icon = {
        icon: "file",
        color: "#0b43ed"
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
        this.subContainer = container.find(".yayoi-treeNodes-container")
    };

    this.afterRender = function() {
        var container = this.getContainer();

        this.expandIcon = new yayoi.ui.common.Icon("close-alt");
        this.expandIcon.setSize("16px");
        var iconContaner = container.find(".yayoi-treeNode-expand");
        this.expandIcon.placeAt(iconContaner);

        this.checkIcon = new yayoi.ui.common.Icon(this.checkIcon);
        this.checkIcon.setSize("16px");
        iconContaner = container.find(".yayoi-treeNode-check");
        this.checkIcon.placeAt(iconContaner);

        this.icon = new yayoi.ui.common.Icon(this.icon);
        this.icon.setSize("18px");
        iconContaner = container.find(".yayoi-treeNode-icon");
        this.icon.placeAt(iconContaner);

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

    this.reRender = function() {
        var container = this.getContainer();
        container.find(".yayoi-treeNode-text").first().html(this.getName());

        if (this.checked) {
            this.setCheckIcon("check")
        } else {
            this.setCheckIcon("unchecked")
        }

        var subContainer = this.subContainer;
        if (this.expand) {
            this.setExpandIcon("collapse-alt");
            subContainer.show();
        } else {
            this.setExpandIcon("expand-alt");
            subContainer.hide();
        }
    };

    /**
     * expand the tree node
     * @param {boolean} expand
     */
    this.setExpand = function(expand) {
        this.expand = expand;
        this.invalidate();
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
        this.checked = checked;
        this.invalidate();
    };

    this.getChecked = function() {
        return this.checked;
    };

    this.setExpandIcon = function(sIcon, sColor = "black") {
        if (this.expandIcon || this.expandIcon instanceof yayoi.ui.common.Icon) {
            this.expandIcon.reset(sIcon);
            this.expandIcon.setColor(sColor);
        } else {
            this.expandIcon = {
                icon: sIcon,
                color: sColor
            };
        }
    };

    this.setCheckIcon = function(sIcon, sColor = "black") {
        if (this.checkIcon || this.checkIcon instanceof yayoi.ui.common.Icon) {
            this.checkIcon.reset(sIcon);
            this.checkIcon.setColor(sColor);
        } else {
            this.checkIcon = {
                icon: sIcon,
                color: sColor
            };
        }
    };

    this.setIcon = function(sIcon, sColor = "black") {
        if (this.icon || this.icon instanceof yayoi.ui.common.Icon) {
            this.icon.reset(sIcon);
            this.icon.setColor(sColor);
        } else {
            this.icon = {
                icon: sIcon,
                color: sColor
            };
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
        return this.parentId;
    };
    this.setParentId = function(parentId) {
        this.parentId = parentId;
    }
    this.getName = function() {
        return this.name;
    };
    this.setName = function(name) {
        this.name = name;
        this.invalidate();
    };
    this.getId = function() {
        return this.id;
    };
    this.setId = function(id) {
        this.id = id;
    };
    this.addSubNode = function(treeNode) {
        if (typeof(treeNode) == "object" && treeNode instanceof yayoi.ui.tree.TreeNode) {
            var nodeContainer = $("<div class='yayoi-treeNode-box'></div>");
            this.subContainer.append(nodeContainer);
            treeNode.placeAt(nodeContainer);
        }
        this.subNodes.push(treeNode);

        this.setIcon("folder-close", "#eda00b");
        var container = this.getContainer();
        container.find(".yayoi-treeNode-expand").first().show();
    };
});
