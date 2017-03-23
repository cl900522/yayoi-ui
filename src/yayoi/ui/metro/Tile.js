"use strict";
yayoi.initPackages("yayoi.ui.metro");

yayoi.extend("yayoi.ui.metro.Tile", "yayoi.ui.common.BasicComponent", [], function() {
    this.wall = null;
    this.rowSize = 1;
    this.colSize = 1;
    this.width = 0;
    this.height = 0;
    this.moving = false;
    this.moveStart = null;
    this.position = {top: 0, left: 0};
    this.prePosition = null;

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
            me.startMove({x:event.clientX, y:event.clientY});
        });
    }
    this.reRender = function() {
        var container = this.getContainer();
        container.width(this.width);
        container.height(this.height);
        container.css("top", this.position.top);
        container.css("left", this.position.left);
    };
    this.startMove = function(positon) {
        var container = this.getContainer();
        this.moving = true;
        this.moveStart = positon;
        var top = parseInt(container.css("top").replace("px",""));
        var left = parseInt(container.css("left").replace("px",""));
        container.css("z-index", 10);
        this.prePosition = {top: top, left: left};

        var me = this;
        var movFun = function(event) {
            if (me.moving) {
                var x = me.moveStart.x - event.clientX;
                var y = me.moveStart.y - event.clientY;
                var newTop = me.prePosition.top - y;
                var newLeft = me.prePosition.left - x;

                var position = me.wall.findPosition(me, {top: newTop, left: newLeft});

                me.position = position;
                me.invalidate();
            }
        }
        $(document).bind("mousemove", movFun);
        $(document).bind("mouseup", function(event) {
            me.stopMove();
            $(document).unbind("mousemove", movFun);
            container.css("z-index", 5);
        });
    };
    this.stopMove = function() {
        this.moving = false;
    }
});
