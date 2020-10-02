/**
 * @name Tile.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Tile object.
 * @updated September 20th, 2020.
 * @license Free
 */

'use strict';

class Tile {

    constructor(params) {

        // Data
        this._index = params.index !== undefined ? params.index : null;
        this._P = params.P !== undefined ? params.P : new Vector2(0, 0);
        this._size = params.size !== undefined ? params.size : 1;

        // Generator Data
        this._canBePlayable = params.canBePlayable !== undefined ? params.canBePlayable : false;
        this._adjacentTiles = [];
        this._surroundingTiles = {
            top: null,
            topRight: null,
            right: null,
            bottomRight: null,
            bottom: null,
            bottomLeft: null,
            left: null,
            topLeft: null,
            asArray: [],
        };

        // Render Data
        this._used = params.used !== undefined ? params.used : false;
        this._playable = params.playable !== undefined ? params.playable : false;
        this._category = params.category !== undefined ? params.category : null;
        this._type = params.type !== undefined ? params.type : null;
        this._rotation = params.rotation !== undefined ? params.rotation : 0;

    }

    // Data
    getIndex() {
        return this._index;
    }
    getPosition() {
        return this._P;
    }
    setPosition(Vector2) {
        this._P = Vector2;
    }
    getSize() {
        return this._size;
    }

    // Generator Data
    canBePlayable() {
        return this._canBePlayable;
    }
    computeNeighbours(array) {
        // Look top.
        var _top = array.find(f => f.getPosition().compare(this.getTopPosition()));
        if (_top !== undefined) {
            this._adjacentTiles.push(_top);
            this._surroundingTiles.top = _top;
            this._surroundingTiles.asArray.push(_top);
        }
        // Look top right.
        var _topRight = array.find(f => f.getPosition().compare(this.getTopRightPosition()));
        if (_topRight !== undefined) {
            this._surroundingTiles.topRight = _topRight;
            this._surroundingTiles.asArray.push(_topRight);
        }
        // Look right.
        var _right = array.find(f => f.getPosition().compare(this.getRightPosition()));
        if (_right !== undefined) {
            this._adjacentTiles.push(_right);
            this._surroundingTiles.right = _right;
            this._surroundingTiles.asArray.push(_right);
        }
        // Look bottom right.
        var _bottomRight = array.find(f => f.getPosition().compare(this.getBottomRightPosition()));
        if (_bottomRight !== undefined) {
            this._surroundingTiles.bottomRight = _bottomRight;
            this._surroundingTiles.asArray.push(_bottomRight);
        }
        // Look bottom.
        var _bottom = array.find(f => f.getPosition().compare(this.getBottomPosition()));
        if (_bottom !== undefined) {
            this._adjacentTiles.push(_bottom);
            this._surroundingTiles.bottom = _bottom;
            this._surroundingTiles.asArray.push(_bottom);
        }
        // Look bottom left.
        var _bottomLeft = array.find(f => f.getPosition().compare(this.getBottomLeftPosition()));
        if (_bottomLeft !== undefined) {
            this._surroundingTiles.bottomLeft = _bottomLeft;
            this._surroundingTiles.asArray.push(_bottomLeft);
        }
        // Look left.
        var _left = array.find(f => f.getPosition().compare(this.getLeftPosition()));
        if (_left !== undefined) {
            this._adjacentTiles.push(_left);
            this._surroundingTiles.left = _left;
            this._surroundingTiles.asArray.push(_left);
        }
        // Look top right.
        var _topLeft = array.find(f => f.getPosition().compare(this.getTopLeftPosition()));
        if (_topLeft !== undefined) {
            this._surroundingTiles.topLeft = _topLeft;
            this._surroundingTiles.asArray.push(_topLeft);
        }
    }
    getAdjacentTiles() {
        return this._adjacentTiles;
    }
    getSurroundingTiles() {
        return this._surroundingTiles;
    }

    // Render Data
    isUsed() {
        return this._used;
    }
    setUsed(bool) {
        this._used = bool;
    }
    isPlayable() {
        return this._playable;
    }
    setPlayable(bool) {
        this._playable = bool;
    }
    getCategory() {
        return this._category;
    }
    setCategory(string) {
        this._category = string;  
    }
    getType() {
        return this._type;
    }
    setType(string) {
        this._type = string;
    }
    getRotation() {
        return this._rotation;
    }
    setRotation(degree) {
        this._rotation = degree;
    }

    // Positions
    getTopPosition() {
        return {
            x: this._P.x,
            y: this._P.y - this._size,
        };
    }
    getTopRightPosition() {
        return {
            x: this._P.x + this._size,
            y: this._P.y - this._size,
        };
    }
    getRightPosition() {
        return {
            x: this._P.x + this._size,
            y: this._P.y,
        };
    }
    getBottomRightPosition() {
        return {
            x: this._P.x + this._size,
            y: this._P.y + this._size,
        };
    }
    getBottomPosition() {
        return {
            x: this._P.x,
            y: this._P.y + this._size,
        };
    }
    getBottomLeftPosition() {
        return {
            x: this._P.x - this._size,
            y: this._P.y + this._size,
        };
    }
    getLeftPosition() {
        return {
            x: this._P.x - this._size,
            y: this._P.y,
        };
    }
    getTopLeftPosition() {
        return {
            x: this._P.x - this._size,
            y: this._P.y - this._size,
        };
    }

    // Reset
    reset() {
        this._used = false;
        this._playable = false;
        this._category = null;
        this._type = null;
        this._rotation = 0;
    }

}