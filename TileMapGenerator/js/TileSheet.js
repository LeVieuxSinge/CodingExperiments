/**
 * @name TileSheet.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Tile Sheet object.
 * @updated September 20th, 2020.
 * @license Free
 */

'use strict';

class TileSheet {

    constructor(params) {

        // Data
        this._rows = params.rows !== undefined ? params.rows : 10;
        this._columns = params.columns !== undefined ? params.columns : 10;
        this._tileSize = params.tileSize !== undefined ? params.tileSize : 50;
        this._P = params.P !== undefined ? params.P : new Vector2(0, 0);

        // Ouput
        this._output = [];

        // Execute
        this._init();

    }

    _init() {

        // Debugging.
        console.log('Creating Tile Sheet...');

        // Assign index to tile for faster sorting.
        var _nextIndex = 0;

        // Get tile sheet center point.
        // Performs a different operation if input is even.
        var _centerX = 0;
        var _centerY = 0;

        if (this._rows % 2 == 0) {
            _centerY = (this._tileSize * (this._rows / 2)) - this._tileSize / 2;
        } else {
            _centerY = this._tileSize * (this._rows / 2);
        }

        if (this._columns % 2 == 0) {
            _centerX = (this._tileSize * (this._columns / 2)) - this._tileSize / 2;
        } else {
            _centerX = this._tileSize * (this._columns / 2);
        }

        // Create tile sheet.
        // For each Y (rows) and X (columns).
        for (var y = 0; y < this._rows; y++) {
            for (var x = 0; x < this._columns; x++) {

                // Create new position for tile.
                var _position = {
                    x: this._tileSize * x,
                    y: this._tileSize * y,
                };

                // Displace every tile using center point so that the tile sheet is centered on its origin (0,0).
                _position.x -= _centerX;
                _position.y -= _centerY;

                // Check if playable.
                // If position on edge (first and last rows || first and last columns).
                var _playable = false;
                if (y == 0 || y == (this._rows - 1) || x == 0 || x == (this._columns - 1)) {
                    _playable = false;
                } else {
                    _playable = true;
                }

                // Add tile to output.
                this._output.push(new Tile({
                    index: _nextIndex,
                    canBePlayable: _playable,
                    P: new Vector2(_position.x, _position.y),
                    size: this._tileSize,
                }));

                // Update next index.
                _nextIndex++;

            }
        }

        // Compute adjacent and surrounding tiles.
        this._output.forEach(t => {
            t.computeNeighbours(this._output);
        });

        // Displace tile sheet to tile sheet position inputs.
        this._output.forEach(t => {
            t.getPosition().x += this._P.x;
            t.getPosition().y += this._P.y;
        });

        // Debugging.
        console.log('Tile Sheet ready!');

    }

    getTiles() {
        return this._output;
    }

    update(new_Px, new_Py) {

        // Reset array and tile sheet position.
        this._output = [];
        this._P.x = new_Px;
        this._P.y = new_Py;

        // Call init function.
        this._init();

    }

}