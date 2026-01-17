/**
 * @name Tile.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.xavierchampoux.com /
 * @description Tile object.
 * @updated September 20th, 2020.
 * @license Free
 */
/*jshint esversion: 8 */

class Tile {
    constructor({
        index,
        position = new Vector2(),
        size = 1,
        can_be_playable = false,
    }) {

        // info
        this.index = index;
        this.position = position;
        this.can_be_playable = can_be_playable;
        this.size = size;

        // neighbours
        this.adjacent_tiles = []; // integer array
        this.surrounding_tiles = {
            top: null,
            top_right: null,
            right: null,
            bottom_right: null,
            bottom: null,
            bottom_left: null,
            left: null,
            top_left: null,
            as_array: [],
        };

        // rendering
        this.used = false;
        this.playable = false;
        this.category = null;
        this.type = null;
        this.group = null;
        this.rotation = 0;

        // streaming
        this.level = null;
        this.loaded = false;

    }

    /**
     * 
     * POSITIONS
     * 
     */

    getTopPosition() {
        return {
            x: this.position.x,
            y: this.position.y - this.size,
        };
    }
    getTopRightPosition() {
        return {
            x: this.position.x + this.size,
            y: this.position.y - this.size,
        };
    }
    getRightPosition() {
        return {
            x: this.position.x + this.size,
            y: this.position.y,
        };
    }
    getBottomRightPosition() {
        return {
            x: this.position.x + this.size,
            y: this.position.y + this.size,
        };
    }
    getBottomPosition() {
        return {
            x: this.position.x,
            y: this.position.y + this.size,
        };
    }
    getBottomLeftPosition() {
        return {
            x: this.position.x - this.size,
            y: this.position.y + this.size,
        };
    }
    getLeftPosition() {
        return {
            x: this.position.x - this.size,
            y: this.position.y,
        };
    }
    getTopLeftPosition() {
        return {
            x: this.position.x - this.size,
            y: this.position.y - this.size,
        };
    }

    /**
     * 
     * OTHER
     * 
     */

    reset() {
        this.used = false;
        this.playable = false;
        this.category = null;
        this.type = null;
        this.rotation = 0;
    }

}