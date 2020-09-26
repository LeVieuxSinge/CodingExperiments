/**
 * @name Generator.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Tile-based map generator.
 * @updated September 20th, 2020.
 * @license Free
 */

'use strict';

class Generator {

    constructor(params) {

        // Data
        this._input = params.input !== undefined ? params.input : [];
        this._endMinRadius = params.endMinRadius !== undefined ? params.endMinRadius : 0;
        this._pathMaxTiles = params.pathMaxTiles !== undefined ? params.pathMaxTiles : 0;
        this._path = [];
        this._pathDebug = [];
        this._startTile = null;
        this._endTile = null;

    }

    generate() {

        // Debugging.
        var _defined = 0;
        console.log('Generator Started...');

        // Clear arrays
        this._path = [];
        this._pathDebug = [];

        // Calculate adjacent tiles for each tile.
        this._input.forEach(t => {

            // Look right.
            var _right = this._input.find(f => f.comparePosition(t.getRightPosition()));
            if (_right !== undefined) {
                t.addAdjacentTile(_right);
            }

            // Look left.
            var _left = this._input.find(f => f.comparePosition(t.getLeftPosition()));
            if (_left !== undefined) {
                t.addAdjacentTile(_left);
            }

            // Look top.
            var _top = this._input.find(f => f.comparePosition(t.getTopPosition()));
            if (_top !== undefined) {
                t.addAdjacentTile(_top);
            }

            // Look bottom.
            var _bottom = this._input.find(f => f.comparePosition(t.getBottomPosition()));
            if (_bottom !== undefined) {
                t.addAdjacentTile(_bottom);
            }
            
        });

        // Create an array for the playable tiles.
        var _playableTiles = this._input.filter(tile => tile.isPlayable());

        // Select random start tile.
        this._startTile = _playableTiles[Math.floor(_playableTiles.length * Math.random() | 0)];
        // Add starting position in path.
        this._path.push({x: this._startTile.getPosition().x, y: this._startTile.getPosition().y});

        // Select random end tile in radius.
        do {
            this._endTile = _playableTiles[Math.floor(_playableTiles.length * Math.random() | 0)];
            var _dist = int(dist(this._startTile.getPosition().x, this._startTile.getPosition().y, this._endTile.getPosition().x, this._startTile.getPosition().y));
        } while (_dist < this._endMinRadius);

        // Generate a path from starting point to end point.
        var _pathCounter = 0;
        var _currentTile = this._startTile;
        do {
            var _currentPlayables = _currentTile.getAdjacentTiles().filter(t => t.isPlayable());
            var _nextTile = _currentPlayables[Math.floor(_currentPlayables.length * Math.random() | 0)];
            if (this._path.find(p => _nextTile.comparePosition(p)) === undefined) {
                this._path.push(_nextTile.getPosition());
            }
            _currentTile = _nextTile;
        } while (!_nextTile.comparePosition(this._endTile.getPosition()));

        // start at start
            // select random adjacent tile
            // if the next tile is not path defined
                // adds tile to path
                // set it to path defined
                // adds two positions as object in path debug

    }

    getPath() {
        return this._path;
    }

}