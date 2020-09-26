/**
 * @name Color.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Color structure.
 * @updated September 22, 2020.
 * @license Free
 */

'use strict';

class Color {

    constructor(r, g, b, a) {

        // Public
        this.r = r !== undefined ? r : 255;
        this.g = g !== undefined ? g : 255;
        this.b = b !== undefined ? b : 255;
        this.a = a !== undefined ? a : 1;
    }

}