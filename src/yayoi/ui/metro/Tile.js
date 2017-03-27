"use strict";
yayoi.initPackages("yayoi.ui.metro");

yayoi.extend("yayoi.ui.metro.Tile", "yayoi.ui.common.BasicComponent", [], function() {
    this.wall = null;
    this.rowSize = 1;
    this.colSize = 1;
    this.width = 0;
    this.height = 0;
    /*是否被拖动中*/
    this.dragging = false;
    /*是否被移动中，通常自动触发*/
    this.moving = false;
    this.position = {top: 0, left: 0};
    this.movingPos = {top: 0, left: 0};

    this.onRendering = function() {
        var container = this.getContainer();
        container.addClass("yayoi-ui-metro-tile");
    };
    this.getWall = function() {
        return this.wall;
    };
    this.initEvents = function() {
        var container = this.getContainer();
        var me = this;
        container.bind("mousedown", function(event) {
            me.startDrag({x:event.clientX, y:event.clientY});
        });
    }
    this.reRender = function() {
        var container = this.getContainer();
        container.width(this.width);
        container.height(this.height);
        container.css("top", this.position.top);
        container.css("left", this.position.left);
        container.css("transition", "0.3s");
    };
    this.startDrag = function(positon) {
        var container = this.getContainer();
        container.css("z-index", 10);
        this.dragging = true;
        var me = this;
        var timer = null;
        var moveStart = positon;
        var prePosition = {top: me.position.top, left: me.position.left};

        var movFun = function(event) {
            if (timer != null) {
                clearTimeout(timer);
            }
            var x = moveStart.x - event.clientX;
            var y = moveStart.y - event.clientY;
            var newTop = prePosition.top - y;
            var newLeft = prePosition.left - x;

            if (newTop < 0) newTop = 0;
            if (newLeft < 0) newLeft = 0;
            if (me.wall.lockHeight) {
                if (newTop + me.height > me.wall.height) newTop = me.wall.height - me.height;
            }
            if (me.wall.lockWidth) {
                if (newLeft + me.width > me.wall.width) newLeft = me.wall.width - me.width;
            }

            timer = setTimeout(function() {
                var position = me.wall.getDropPosition(me, {top: newTop, left: newLeft});

                me.position = position;
                me.invalidate();
            }, 10);
        }
        $(document).bind("mousemove", movFun);
        $(document).bind("mouseup", function(event) {
            me.stopDrag();
            $(document).unbind("mousemove", movFun);
            container.css("z-index", 5);
        });
    };
    this.stopDrag = function() {
        this.dragging = false;
    }
});
