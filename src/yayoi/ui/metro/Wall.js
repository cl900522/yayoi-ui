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
    this.createTile = function(colSize, rowSize) {
        var tileWidth = colSize * this.tileWidth + (colSize - 1) * this.colSpan;
        var tileHeight = rowSize * this.tileHeight + (rowSize - 1) * this.rowSpan;

        var maxTop = 0, maxLeft = 0;
        var bottomRightTile = null;
        for(var i=0; i<this.tiles.length; i++) {
            var tile = this.tiles[i];
            if (maxTop < tile.position.top+ tile.height) {
                maxTop = tile.position.top+ tile.height;
                bottomRightTile = tile;
            }
            if (maxLeft < tile.position.left+ tile.width) {
                maxLeft = tile.position.left+ tile.width;
                bottomRightTile = tile;
            }
        }

        if (bottomRightTile != null) {
            maxLeft = bottomRightTile.position.left + bottomRightTile.width;
            maxTop = bottomRightTile.position.top + bottomRightTile.height + this.colSpan;
            if (maxTop + tileHeight > this.height) {
                if (this.lockHeight) {
                    maxLeft = bottomRightTile.position.left + bottomRightTile.width + this.colSpan;
                    maxTop = this.rowSpan;
                }
            }
        } else {
            maxLeft = this.colSpan;
            maxTop = this.rowSpan;
        }

        var tile = new yayoi.ui.metro.Tile({
            colSize: colSize,
            rowSize: rowSize,
            width: tileWidth,
            height: tileHeight,
            position: {top: maxTop, left: maxLeft},
            wall: this
        });
        var container = this.getContainer();
        var tileContainer = $("<div></div>")
        container.append(tileContainer);
        tile.placeAt(tileContainer);
        this.tiles.push(tile);
        console.log(this.tiles);
        return tile;
    };
});
