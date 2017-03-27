"use strict";
yayoi.initPackages("yayoi.ui.metro");

yayoi.extend("yayoi.ui.metro.Tile", "yayoi.ui.common.BasicComponent", [], function() {
    this.wall = null;
    this.rowSize = 1;
    this.colSize = 1;
    this.width = 0;
    this.height = 0;
    this.temp = false;
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
        if (this.temp) {
            container.addClass("temp");
        }
        container.html(this.id);
        if (this.dragging) {
            container.css("transition", "0s");
            container.css("z-index", 10);
        } else {
            container.css("transition", "0.3s");
        }
    };
    this.startDrag = function(positon) {
        var container = this.getContainer();
        var me = this;
        this.dragging = true;
        this.invalidate();

        var timer = null;
        var moveStart = positon;
        var prePosition = {top: me.position.top, left: me.position.left};
        var tempTile = me.wall.createTile(me.colSize, me.rowSize);
        tempTile.position.top = me.position.top;
        tempTile.position.left = me.position.left;
        tempTile.temp = true;
        me.wall.addTile(tempTile);
        tempTile.invalidate();

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
                var position = me.wall.getDropPosition(tempTile, {top: newTop, left: newLeft});
                tempTile.position = position;
                tempTile.invalidate();
            }, 20);

            me.position = {top: newTop, left: newLeft};
            me.invalidate();
        }
        var stopMove = function(event) {
            me.stopDrag();
            $(document).unbind("mousemove", movFun);
            $(document).unbind("mouseup", stopMove);
            me.position = tempTile.position;
            me.wall.removeTile(tempTile);
            me.invalidate();
            container.css("z-index", 5);
        }

        $(document).bind("mousemove", movFun);
        $(document).bind("mouseup", stopMove);
    };
    this.stopDrag = function() {
        this.dragging = false;
    }
});
