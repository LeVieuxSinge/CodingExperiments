/**
 * @name TileSheet.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.xavierchampoux.com /
 * @description Tile Sheet object.
 * @updated September 20th, 2020.
 * @license Free
 */
/*jshint esversion: 8 */

class TileSheet {
    constructor({
        columns = 10,
        rows = 10,
        tile_size = 50,
        minimum_end_radius = 10,
        path_minimum_lenth = 20,
    }) {

        // Data
        this.columns = columns;
        this.rows = rows;
        this.tileSize = tile_size;



        this.P = new Vector2(0, 0);

        // Ouput
        this._output = [];

        // Execute
        this._init();

    }

    // TODO : add a function to calculate the path and ouput

    _init() {

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