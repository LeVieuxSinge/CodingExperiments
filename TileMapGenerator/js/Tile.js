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
        this._defined = params.state !== undefined ? params.state : false;
        this._type = params.type !== undefined ? params.type : "undefined"; // start, end, street, pit, housing
        this._playable = params.playable !== undefined ? params.playable : false;
        this._P = params.P !== undefined ? params.P : {
            x: 0,
            y: 0,
        };
        this._size = params.size !== undefined ? params.size : 1;

        // Generator Data
        this._adjacentTiles = [];
        this._surroundingTiles = [];

    }

    getIndex() {
        return this._index;
    }

    isDefined() {
        return this._status;
    }

    setDefined() {
        this._defined = true;
    }

    isPlayable() {
        return this._playable;
    }

    // Positions
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
    getTopRightPosition() {
        return {
            x: this._P.x + this._size,
            y: this._P.y + this._size,
        };
    }
    getTopLeftPosition() {
        return {
            x: this._P.x - this._size,
            y: this._P.y + this._size,
        };
    }
    getBottomRightPosition() {
        return {
            x: this._P.x + this._size,
            y: this._P.y - this._size,
        };
    }
    getBottomLeftPosition() {
        return {
            x: this._P.x - this._size,
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

    getDist(P) {
        return Math.sqrt(Math.pow(Math.abs(P.y - this._P.y), 2) + Math.pow(Math.abs(P.x - this._P.x), 2));
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

    getSurroundingTiles() {
        return this._surroundingTiles;
    }

    addSurroundingTile(tile) {
        this._surroundingTiles.push(tile);
    }

}