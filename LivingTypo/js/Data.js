/**
 * @name Data.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Living Typo.
 * @updated November 14th, 2020.
 * @license Free
 */

'use strict';

class DataClass {

    constructor() {
        
        this._cells = [];
        this._hash = -1;

    }

    retrieveCells() {
        // Return cells
        return this._cells;
    }

    storeCells(cells) {
        // Set cells
        this._cells = cells;
    }

    getHash() {
        // Return hash
        this._hash++;
        return this._hash;
    }

}