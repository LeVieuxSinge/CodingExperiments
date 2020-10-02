/**
 * @name P.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Position structure.
 * @updated September 22, 2020.
 * @license Free
 */

'use strict';

class Vector2 {

    constructor(x, y) {

        // Public
        this.x = x !== undefined ? x : 0;
        this.y = y !== undefined ? y : 0;

    }

    dist(Vector2) {
        return Math.sqrt(Math.pow(Math.abs(this.y - Vector2.y), 2) + Math.pow(Math.abs(this.x - Vector2.x), 2));
    }

    compare(Vector2) {
        if (this.x === Vector2.x && this.y === Vector2.y) {
            return true;
        } else {
            return false;
        }
    }

}

class Vector3 {

    constructor(x, y, z) {

        // Public
        this.x = x !== undefined ? x : 0;
        this.y = y !== undefined ? y : 0;
        this.z = z !== undefined ? z : 0;

    }

}