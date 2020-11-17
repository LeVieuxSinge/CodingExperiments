/**
 * @name System.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Living Typo.
 * @updated November 14th, 2020.
 * @license Free
 */

'use strict';

class SystemClass {

    constructor() {
        
        this._input = '';
        this._maxCells = 100;

    }

    update() {

        // Retrieve data
        var data = Data.retrieveCells();

        // if input !== '' -> for each character, create cell and set required and potential to next character. Delete character from string each time.

        // Create new cells if needed (Probability: 2%)
        if (data.length < this._maxCells && Math.random() < 0.02) {
            // Constructs a new cell
            var cell = new CellClass(Data.getHash());
            cell.generate();
            data.push(cell);
            // console.log(data);
        }

        // Update the cells
        data.forEach(cell => {
            cell.evaluate();
        });

        // Store data
        Data.storeCells(data);

    }

    getCells() {
        // Return cells
        return Data.retrieveCells();
    }

}