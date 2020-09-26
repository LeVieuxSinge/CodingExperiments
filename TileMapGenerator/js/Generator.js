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
        this._path = [];
        this._pathDebug = [];
        this._startTile = null;
        this._endTile = null;

    }

    generate() {

        // Debugging.
        var _defined = 0;
        var _timerStart = performance.now();
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

        // Select random end tile in radius.
        do {
            this._endTile = _playableTiles[Math.floor(_playableTiles.length * Math.random() | 0)];
            var _dist = this._startTile.getDist(this._endTile.getPosition());
        } while (_dist < this._endMinRadius);

        // Add starting tile to path. CANNOT START IN THE MIDDLE ?
        this._path.push(this._startTile);

        // Generate a path from starting point to end point.
        var _currentTile = this._startTile;
        do {
            // Get only adjacent playable tiles.
            var _currentPlayables = _currentTile.getAdjacentTiles().filter(t => t.isPlayable());

            // Select random tile from playables.
            var _nextTile = _currentPlayables[Math.floor(_currentPlayables.length * Math.random() | 0)];

            // Tile is not already path.
            if (this._path.find(t => t.comparePosition(_nextTile.getPosition())) === undefined) {
                // Add to path array.
                this._path.push(_nextTile);
                // Add draw debug line position.
                this._pathDebug.push({
                    p1: _currentTile.getPosition(),
                    p2: _nextTile.getPosition(),
                });
                // Set next tile as current.
                _currentTile = _nextTile;
            } else {
                // Select random tile from path.
                // _currentTile = this._path[Math.floor(this._path.length * Math.random() | 0)];
                // Select closest tile from end.
                this._path.forEach(t => {
                    if (t.getDist(this._endTile.getPosition()) < _currentTile.getDist(this._endTile.getPosition())) {
                        _currentTile = t;
                    }
                });
            }
        } while (!_currentTile.comparePosition(this._endTile.getPosition()));

        // Debugging.
        var _timerEnd = performance.now();
        console.log('Map generated in ' + Math.round(((_timerEnd - _timerStart) + Number.EPSILON) * 100) / 100 + ' milliseconds! ');

    }

    getPath() {
        return this._path;
    }

    getPathDebug() {
        return this._pathDebug;
    }

}