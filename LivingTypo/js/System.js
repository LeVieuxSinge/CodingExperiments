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
        
        // Data
        this._cellID = 0;
        this._input = '';

    }

    update() {

        // Parses the system and updates it if necessary
        // Retrieve data
        var data = Data.retrieveCells();

        // if input !== '' -> for each character, create cell and set required and potential to next character. Delete character from string each time.

        // Create new cells if needed (Probability: 2%)
        if (data.length < 10 && Math.random() < 0.02) {
            var cell = this.newCell();
            cell.generate();
            data.push(cell);
            console.log(data);
        }

        // Move the cells
        data.forEach(cell => {
            cell.evaluate();
            cell.move();
        });

        // Store data
        Data.storeCells(data);

    }

    newCell() {

        // Constructs a new cell
        var cell = new CellClass(this._cellID);
        // Increment cell IDs
        this._cellID++;
        return cell;

    }

    getCells() {
        // Return cells
        return Data.retrieveCells();
    }

}