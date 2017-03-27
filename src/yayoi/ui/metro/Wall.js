"use strict";
yayoi.initPackages("yayoi.ui.metro");

yayoi.extend("yayoi.ui.metro.Wall", "yayoi.ui.common.BasicComponent", ["yayoi.ui.metro.Tile"], function() {
    this.lockHeight = true;
    this.lockWidth = false;
    this.rowSpan = 20;
    this.colSpan = 20;
    this.width = 800;
    this.height = 600;
    this.tileWidth = 100;
    this.tileHeight = 100;
    this.tiles = null;
    this.beforeRender = function() {
        var i = (this.height - this.rowSpan) / (this.rowSpan + this.tileHeight);
        var j = (this.width - this.colSpan) / (this.colSpan + this.tileWidth);
        i = Math.round(i);
        j = Math.round(j);

        this.height = i * this.tileHeight + (i + 1) * this.rowSpan;
        this.width = j * this.tileWidth + (j + 1) * this.colSpan;
        this.tiles = [];
        if (this.lockHeight && this.lockWidth) {
            throw "You can not loack width and height both";
        }
        if (!(this.lockHeight || this.lockWidth)) {
            throw "You should lock either height or width";
        }
    }
    this.onRendering = function() {
        var container = this.getContainer();
        container.addClass("yayoi-ui-metro-wall");
    };
    this.reRender = function() {
        var container = this.getContainer();
        container.width(this.width);
        container.height(this.height);
    };
    this.findAutoPosition = function(tileWidth, tileHeight) {
        var top = 0, left = 0, right=0, bottom=0, found=false;
        /*当高度锁定*/
        if (this.lockHeight) {
            if (tileWidth + this.tileWidth * 2 > this.width) {
                throw "tile is too much width";
            }
            for(var j=0; j <100; j++) {
                for(var i=0; i<100; i++) {
                    top = i * (this.tileHeight) + (i+1) * this.rowSpan;
                    left = j * (this.tileWidth) + (j+1) *this.colSpan;
                    bottom = top + tileHeight;
                    right = left + tileWidth;
                    if (bottom > this.height) {
                        continue;
                    }
                    found = !this.hasTilesInArea({top: top, left: left}, {top: bottom, left: right});

                    if (found) {
                        return {top: top, left: left};
                    }
                }
            }
        }
    }
     this.createTile = function(colSize, rowSize) {
        var tileWidth = colSize * this.tileWidth + (colSize - 1) * this.colSpan;
        var tileHeight = rowSize * this.tileHeight + (rowSize - 1) * this.rowSpan;
        var position = this.findAutoPosition(tileWidth, tileHeight);

        var tile = new yayoi.ui.metro.Tile({
            colSize: colSize,
            rowSize: rowSize,
            width: tileWidth,
            height: tileHeight,
            position: position,
            wall: this
        });
        var container = this.getContainer();
        var tileContainer = $("<div></div>")
        container.append(tileContainer);
        tile.placeAt(tileContainer);
        this.tiles.push(tile);
        return tile;
    };
    this.hasTilesInArea = function(topLeft, rightBottom) {
        var tiles = this.getTilesInArea(topLeft, rightBottom);
        if (tiles.length == 0) {
            return false;
        } else {
            return true;
        }
    };
    this.getTilesInArea = function(topLeft, rightBottom) {
        var tiles = [];
        for(var i=0; i<this.tiles.length; i++) {
            var tile = this.tiles[i];
            if (tile.moving) {
                continue;
            }
            var tileTop = tile.position.top;
            var tileLeft = tile.position.left;
            var tileBottom = tileTop + tile.height;
            var tileRight = tileLeft + tile.width;

            if (!((tileBottom <= topLeft.top ) ||
                (tileTop >= rightBottom.top) ||
                (tileLeft >= rightBottom.left) ||
                (tileRight <= topLeft.left))) {
                tiles.push(tile);
                continue;
            }
        }
        return tiles;
    };
    this.getDropPosition = function(tile, newPostion) {
        var me = this;
        var newTop = newPostion.top;
        var newLeft = newPostion.left;

        var position = {top: newTop, left: newLeft}
        position = this.findFixedPosition(position);

        /*标记移动*/
        var tiles = this.getTilesInArea(position, {top: position.top + tile.height, left: position.left + tile.width});
        for(var i=0; i<tiles.length; i++) {
            if (!tiles[i].dragging) {
                tiles[i].moving = true;
            }
        }

        /*延时处理*/
        setTimeout(function() {
            for(var i=0; i<tiles.length; i++) {
                var tile = tiles[i];
                if (!tiles[i].dragging) {
                    var autoPos = me.findAutoPosition(tiles[i].width, tiles[i].height);
                    var affectTiles = me.getTilesInArea(autoPos, {top: autoPos.top + tile.height, left: autoPos.left + tile.width});
                    for (var j=0; j<affectTiles.length; j++) {
                        affectTiles[j].moving = true;
                        tiles.push(affectTiles[j]);
                    }

                    tiles[i].position = autoPos;
                    tiles[i].moving = false;
                    tiles[i].invalidate();
                }
            }
        }, 1);

        return position;
    };
    /*发现最邻近的吸附位置*/
    this.findFixedPosition = function(position) {
        var i = (position.top - this.rowSpan) / (this.rowSpan + this.tileHeight);
        var j = (position.left - this.colSpan) / (this.colSpan + this.tileWidth);
        i = Math.round(i);
        j = Math.round(j);

        var top = i * this.tileHeight + (i + 1) * this.rowSpan;
        var left = j * this.tileWidth + (j + 1) * this.colSpan;
        return {left: left, top: top};
    };
});
