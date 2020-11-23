/**
 * @name System.js
 * @version v1.0.6
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Living Typo.
 * @updated November 23th, 2020.
 * @license Free
 */

'use strict';

class SystemClass {

    constructor() {

        this._input = '';
        this._inputHashs = [];
        this._inputCharacters = [];
        this._maxCells = 1000;

    }

    update() {

        // Retrieve data
        var data = Data.retrieveCells();

        // If there is an input
        if (this._input !== '') {
            var input = this._input;
            input = input.split('');
            input.forEach(character => {
                // Generate hash
                this._inputHashs.push(Data.getHash());
                // Push in characters array
                this._inputCharacters.push(character);
                // Remove first character in string
                this._input = this._input.slice(1);
            });
        }
        // Give random meanings to words?

        // Create new cells if needed
        if (data.length < this._maxCells) {
            // If there are input characters
            if (this._inputCharacters.length !== 0) {
                // Constructs a new cell
                var cell = new CellClass(this._inputHashs[0]);
                cell.generate(this._inputCharacters[0]);
                data.push(cell);
                // Remove from arrays
                this._inputHashs.shift();
                this._inputCharacters.shift();
            }
            // 2% chance of spawning random cell
            else if (Math.random() < 0.02) {
                // Constructs a new cell
                var cell = new CellClass(Data.getHash());
                cell.generate();
                data.push(cell);
            }
        }
        // Remove sentences to liberate space
        else {
            var cell = data.find(cell => cell.getInstance() === Codex.instances.sentence);
            if (cell !== undefined) {
                var index = data.indexOf(cell);
                data.splice(index, 1);
            }
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

    setInput(string) {
        // Set input
        this._input = string.replace(/ /g, '');
    }

}