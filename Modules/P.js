/**
 * @name P.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Position structure.
 * @updated September 22, 2020.
 * @license Free
 */

'use strict';

class P {

    constructor(x, y) {

        // Public
        this.x = x !== undefined ? x : 0;
        this.y = y !== undefined ? y : 0;
    }

    getDist(P) {
        return Math.sqrt(Math.pow(Math.abs(P.y - this.y), 2) + Math.pow(Math.abs(P.x - this.x), 2));
    }

}