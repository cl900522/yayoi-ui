"use strict";
yayoi.initPackages("yayoi.ui.metro");

yayoi.extend("yayoi.ui.metro.Wall", "yayoi.ui.common.BasicComponent", ["yayoi.ui.metro.Tile"], function() {
    this.lockHeight = true;
    this.lockWidth = false;
    this.rowSpan = 20;
    this.colSpan = 20;
    this.width = 800;
    this.height = 800;
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
        var bottomMostTile = null, rightMostTile = null;
        for(var i=0; i<this.tiles.length; i++) {
            var tile = this.tiles[i];
            if (maxTop < tile.position.top + tile.height) {
                maxTop = tile.position.top + tile.height;
                bottomMostTile = tile;
            }
            if (maxLeft < tile.position.left + tile.width) {
                maxLeft = tile.position.left + tile.width;
                rightMostTile = tile;
            }
        }

        var newTop=0, newLeft=0;
        if (bottomMostTile != null) {
            maxTop += this.rowSpan;
            maxLeft += this.colSpan;

            if (maxTop + tileHeight > this.height && this.lockHeight) {
                newLeft = rightMostTile.position.left + rightMostTile.width + this.colSpan;
                newTop = this.rowSpan;
            } else if (maxLeft + tileWidth > this.width && this.lockWidth){
                newLeft = this.colSpan;
                newTop = bottomMostTile.position.top + bottomMostTile.height + this.rowSpan;
            } else {
                newTop = bottomMostTile.position.top + bottomMostTile.height + this.rowSpan;
                newLeft = rightMostTile.position.left;
            }
        } else {
            newTop = this.colSpan;
            newLeft = this.rowSpan;
        }

        var tile = new yayoi.ui.metro.Tile({
            colSize: colSize,
            rowSize: rowSize,
            width: tileWidth,
            height: tileHeight,
            position: {top: newTop, left: newLeft},
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
