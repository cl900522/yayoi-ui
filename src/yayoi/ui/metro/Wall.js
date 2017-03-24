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
    }
    this.onRendering = function() {
        var container = this.getContainer();
        container.addClass("yayoi-ui-metro-wall");
        this.tiles = [];
    };
    this.reRender = function() {
        var container = this.getContainer();
        container.width(this.width);
        container.height(this.height);
    };
    this.getPosition = function(tileWidth, tileHeight) {
        var top = 0, left = 0, right=0, bottom=0, found=false;
        for(var j=0; j <100; j++) {
            for(var i=0; i<100; i++) {
                top = i * (this.tileHeight) + (i+1) * this.rowSpan;
                left = j * (this.tileWidth) + (j+1) *this.colSpan;
                bottom = top + tileHeight;
                right = left + tileWidth;
                if (bottom > this.height && this.lockHeight) {
                    continue;
                }
                found = !this.hasTilesInArea({top: top, left: left}, {top: bottom, left: right});
                // console.log(top, left, right, bottom, found);
                if(found) {
                    break;
                }
            }
            if(found) {
                break;
            }
        }
        return {top: top, left: left};
    }
     this.createTile = function(colSize, rowSize) {
        var tileWidth = colSize * this.tileWidth + (colSize - 1) * this.colSpan;
        var tileHeight = rowSize * this.tileHeight + (rowSize - 1) * this.rowSpan;
        var position = this.getPosition(tileWidth, tileHeight);

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
    this.findPosition = function(tile, newPostion) {
        var newTop = newPostion.top;
        var newLeft = newPostion.left;

        if (newTop < 0) newTop = 0;
        if (newLeft < 0) newLeft = 0;
        if (this.lockHeight) {
            if (newTop + tile.height > tile.wall.height) newTop = tile.wall.height - tile.height;
        }

        var position = {top: newTop, left: newLeft}
        position = this.findRightPosition(position);

        var preColor = tile.getContainer().css("background-color");
        for(var i=0; i<this.tiles.length; i++) {
            this.tiles[i].getContainer().css("background-color", preColor);
        }

        var tiles = this.getTilesInArea(position, {top: newTop+tile.height, left: newLeft + tile.width});
        for(var i=0; i<tiles.length; i++) {
            if (!tiles[i].moving) {
                tiles[i].getContainer().css("background-color", "red");
            }
        }

        return position;
    };
    this.findRightPosition = function(position) {
        var i = (position.top - this.rowSpan) / (this.rowSpan + this.tileHeight);
        var j = (position.left - this.colSpan) / (this.colSpan + this.tileWidth);
        i = Math.round(i);
        j = Math.round(j);

        var top = i * this.tileHeight + (i + 1) * this.rowSpan;
        var left = j * this.tileWidth + (j + 1) * this.colSpan;
        return {left: left, top: top};
        //return position;
    }
});