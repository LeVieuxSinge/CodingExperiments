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
        this._status = params.state !== undefined ? params.state : "undefined";
        this._type = params.type !== undefined ? params.type : "undefined"; // start, end, terrain, pit, housing
        this._playable = params.playable !== undefined ? params.playable : false;
        this._P = params.P !== undefined ? params.P : {
            x: 0,
            y: 0,
        };
        this._size = params.size !== undefined ? params.size : 1;

        // Generator Data
        this._adjacentTiles = [];
        this._surroundingTiles = [];
        this._pathDefined = false;

    }

    getIndex() {
        return this._index;
    }

    getStatus() {
        return this._status;
    }

    setStatus(status) {
        this._status = status;
    }

    isPlayable() {
        return this._playable;
    }

    getPosition() {
        return this._P;
    }

    getRightPosition() {
        return {
            x: this._P.x + this._size,
            y: this._P.y,
        };
    }

    getLeftPosition() {
        return {
            x: this._P.x - this._size,
            y: this._P.y,
        };
    }

    getTopPosition() {
        return {
            x: this._P.x,
            y: this._P.y + this._size,
        };
    }

    getBottomPosition() {
        return {
            x: this._P.x,
            y: this._P.y - this._size,
        };
    }

    comparePosition(P) {
        if (this._P.x === P.x && this._P.y === P.y) {
            return true;
        } else {
            return false;
        }
    }

    getSize() {
        return this._size;
    }

    getAdjacentTiles() {
        return this._adjacentTiles;  
    }

    addAdjacentTile(tile) {
        this._adjacentTiles.push(tile);
    }

    isPathDefined() {
        return this._pathDefined;
    }

}