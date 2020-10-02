/**
 * @name Generator.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Tile-based map generator.
 * @updated September 20th, 2020.
 * @license Free
 */

'use strict';

// end what needs to be done and redo as a node system

class Generator {

    constructor(params) {

        // Data
        this._input = params.input !== undefined ? params.input : [];
        this._endMinRadius = params.endMinRadius !== undefined ? params.endMinRadius : 0;
        this._pathMinTile = params.pathMinTile !== undefined ? params.pathMinTile : 0;
        this._path = [];
        this._pathDebug = [];
        this._pathOuter = [];
        this._startTile = null;
        this._endTile = null;

    }

    generate() {

        // Debugging.
        var _timerStart = performance.now();
        console.log('Generator Started...');

        // Clean arrays.
        this._path = [];
        this._pathDebug = [];
        this._pathOuter = [];

        // Clean input. Because tiles are referenced, their base values are changed. Thus misleading the generator.
        this._input.forEach(t => {
            t.reset();
        });

        // Create an array for the playable tiles.
        var _playableTiles = this._input.filter(t => t.canBePlayable());

        // Select random start tile, set it as used, playable, start category and add to path array.
        this._startTile = _playableTiles[Math.floor(_playableTiles.length * Math.random() | 0)];
        this._startTile.setUsed(true);
        this._startTile.setPlayable(true);
        this._startTile.setCategory('start');
        this._path.push(this._startTile);

        // Select random end tile in radius, set it as used, playable and end type.
        do {
            this._endTile = _playableTiles[Math.floor(_playableTiles.length * Math.random() | 0)];
            var _dist = this._startTile.getPosition().dist(this._endTile.getPosition());
        } while (_dist < this._endMinRadius);
        this._endTile.setUsed(true);
        this._endTile.setPlayable(true);
        this._endTile.setCategory('end');

        // Generate a path from starting point to end point.
        var _currentTile = this._startTile;
        var _endTileFound = false;
        do {
            // Get only adjacent playable tiles.
            var _currentPlayables = _currentTile.getAdjacentTiles().filter(t => t.canBePlayable());

            // Select random tile from playables.
            var _nextTile = _currentPlayables[Math.floor(_currentPlayables.length * Math.random() | 0)];

            // Is end tile found.
            _nextTile.getIndex() === this._endTile.getIndex() ? _endTileFound = true : null;

            // Tile is not already path.
            if (this._path.find(t => t.getPosition().compare(_nextTile.getPosition())) === undefined) {
                // If not end tile.
                if (_nextTile.getCategory() !== 'end') {
                    // Set it as used, playable and street type.
                    _nextTile.setUsed(true);
                    _nextTile.setPlayable(true);
                    _nextTile.setCategory('street');
                }
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
                // Change the random tile selection depending of wheter or not the end tile as been found.
                if (!_endTileFound) {
                    // Select closest tile from end.
                    this._path.forEach(t => {
                        if (t.getPosition().dist(this._endTile.getPosition()) < _currentTile.getPosition().dist(this._endTile.getPosition())) {
                            _currentTile = t;
                        }
                    });
                } else {
                    // Select random tile from path.
                    _currentTile = this._path[Math.floor(this._path.length * Math.random() | 0)];
                }
            }

        } while (!_endTileFound || this._path.length < this._pathMinTile);

        // Populate path edge array.
        this._path.forEach(t => {
            // For each path tile, search in surrounding tiles.
            t.getSurroundingTiles().asArray.forEach(s => {
                // If not playable and index is not already in array.
                if (!s.isPlayable() && this._pathOuter.find(e => e.getIndex() === s.getIndex()) === undefined) {
                    // Set it as used.
                    s.setUsed(true);
                    // Add to outer array.
                    this._pathOuter.push(s);
                }
            });
        });

        // Compute edge tile category (buildings, bounds) and add bounds to buildings without bounds.
        this._pathOuter.forEach(t => {

            // Get amount of adjacent / surrounding playable tiles.
            var _playableAdjacents = t.getAdjacentTiles().filter(s => s.isPlayable());
            var _playableSurroundings = t.getSurroundingTiles().asArray.filter(s => s.isPlayable());

            // Tile on edge of map OR Tile surrounded by play tiles OR Tile adjacent with no play tiles = bounds.
            if (t.getSurroundingTiles().asArray.length <= 5 || _playableAdjacents.length === 4 || _playableAdjacents.length === 0) {
                // Set category.
                t.setCategory('bounds');
            }
            // Tile with one non-playable tile.
            else if (_playableAdjacents.length === 3) {
                // Look if adjacent non-playable tile as only one adjacent non-playable tile.
                var _adjacentNonPlayable = t.getAdjacentTiles().find(s => !s.isPlayable());
                if (_adjacentNonPlayable.getAdjacentTiles().filter(s => !s.isPlayable()).length === 1) {
                    // Set category.
                    t.setCategory('bounds');
                } else {
                    // Set category.
                    t.setCategory('buildings');
                }
            }
            // Set random.
            else {
                var _random = Math.random()
                // Set category.
                // 5% bounds, 95% buildings
                _random < 0.05 ? t.setCategory('bounds') : t.setCategory('buildings');
            }

            // Make sure buildings have bounds.
            if (t.getCategory() === 'buildings') {
                t.getAdjacentTiles().forEach(a => {
                    if (!a.isUsed()) {
                        // Set it as used.
                        a.setUsed(true);
                        // Set category.
                        a.setCategory('bounds');
                        // Add to outer array.
                        this._pathOuter.push(a);
                    }
                });
            }

        });

        // computing edge tile rotation for buildings (easy)
        // compute bounds type and rotation

        // Compute path tile type.
        this._path.forEach(t => {

            // Get number of connections.
            var _connections = t.getAdjacentTiles().filter(a => a.isPlayable()).length;

            // Tile has one opening = triple.
            if (_connections === 1) {
                // Set type.
                t.setType('triple');
                // Check which position opening is at.
                if (t.getSurroundingTiles().top.isPlayable()) {
                    // Set rotation.
                    t.setRotation(180);
                } else if (t.getSurroundingTiles().right.isPlayable()) {
                    // Set rotation.
                    t.setRotation(270);
                } else if (t.getSurroundingTiles().bottom.isPlayable()) {
                    // Set rotation.
                    t.setRotation(0);
                } else if (t.getSurroundingTiles().left.isPlayable()) {
                    // Set rotation.
                    t.setRotation(90);
                }
            }
            // Tile has two openings = double, double corner, passage.
            else if (_connections === 2) {
                // Check which position opening is at.
                if (t.getSurroundingTiles().top.isPlayable() && t.getSurroundingTiles().bottom.isPlayable()) {
                    // Set type.
                    t.setType('passage');
                    // Set rotation.
                    t.setRotation(90);
                } else if (t.getSurroundingTiles().right.isPlayable() && t.getSurroundingTiles().left.isPlayable()) {
                    // Set type.
                    t.setType('passage');
                    // Set rotation.
                    t.setRotation(0);
                } else if (t.getSurroundingTiles().top.isPlayable() && t.getSurroundingTiles().right.isPlayable()) {
                    // Set type.
                    t.setType('double');
                    // Set rotation.
                    t.setRotation(270);
                    // Check for corners.
                    if (!t.getSurroundingTiles().topRight.isPlayable()) {
                        // Set type.
                        t.setType('double_corner');
                    }
                } else if (t.getSurroundingTiles().right.isPlayable() && t.getSurroundingTiles().bottom.isPlayable()) {
                    // Set type.
                    t.setType('double');
                    // Set rotation.
                    t.setRotation(0);
                    if (!t.getSurroundingTiles().bottomRight.isPlayable()) {
                        // Set type.
                        t.setType('double_corner');
                    }
                } else if (t.getSurroundingTiles().bottom.isPlayable() && t.getSurroundingTiles().left.isPlayable()) {
                    // Set type.
                    t.setType('double');
                    // Set rotation.
                    t.setRotation(90);
                    if (!t.getSurroundingTiles().bottomLeft.isPlayable()) {
                        // Set type.
                        t.setType('double_corner');
                    }
                } else if (t.getSurroundingTiles().left.isPlayable() && t.getSurroundingTiles().top.isPlayable()) {
                    // Set type.
                    t.setType('double');
                    // Set rotation.
                    t.setRotation(180);
                    if (!t.getSurroundingTiles().topLeft.isPlayable()) {
                        // Set type.
                        t.setType('double_corner');
                    }
                }
            }
            // Tile has three openings = single, single corner right, single corner left, single corner side.
            else if (_connections === 3) {
                // Check which position opening is at.
                if (t.getSurroundingTiles().top.isPlayable() && t.getSurroundingTiles().right.isPlayable() && t.getSurroundingTiles().bottom.isPlayable()) {
                    // Set type.
                    t.setType('single');
                    // Set rotation.
                    t.setRotation(270);
                    // Check for corners.
                    if (!t.getSurroundingTiles().topRight.isPlayable() && !t.getSurroundingTiles().bottomRight.isPlayable()) {
                        // Set type.
                        t.setType('single_corner_side');
                    } else if (!t.getSurroundingTiles().topRight.isPlayable()) {
                        // Set type.
                        t.setType('single_corner_right');
                    } else if (!t.getSurroundingTiles().bottomRight.isPlayable()) {
                        // Set type.
                        t.setType('single_corner_left');
                    }
                } else if (t.getSurroundingTiles().right.isPlayable() && t.getSurroundingTiles().bottom.isPlayable() && t.getSurroundingTiles().left.isPlayable()) {
                    // Set type.
                    t.setType('single');
                    // Set rotation.
                    t.setRotation(0);
                    // Check for corners.
                    if (!t.getSurroundingTiles().bottomRight.isPlayable() && !t.getSurroundingTiles().bottomLeft.isPlayable()) {
                        // Set type.
                        t.setType('single_corner_side');
                    } else if (!t.getSurroundingTiles().bottomRight.isPlayable()) {
                        // Set type.
                        t.setType('single_corner_right');
                    } else if (!t.getSurroundingTiles().bottomLeft.isPlayable()) {
                        // Set type.
                        t.setType('single_corner_left');
                    }
                } else if (t.getSurroundingTiles().bottom.isPlayable() && t.getSurroundingTiles().left.isPlayable() && t.getSurroundingTiles().top.isPlayable()) {
                    // Set type.
                    t.setType('single');
                    // Set rotation.
                    t.setRotation(90);
                    // Check for corners.
                    if (!t.getSurroundingTiles().bottomLeft.isPlayable() && !t.getSurroundingTiles().topLeft.isPlayable()) {
                        // Set type.
                        t.setType('single_corner_side');
                    } else if (!t.getSurroundingTiles().bottomLeft.isPlayable()) {
                        // Set type.
                        t.setType('single_corner_right');
                    } else if (!t.getSurroundingTiles().topLeft.isPlayable()) {
                        // Set type.
                        t.setType('single_corner_left');
                    }
                } else if (t.getSurroundingTiles().left.isPlayable() && t.getSurroundingTiles().top.isPlayable() && t.getSurroundingTiles().right.isPlayable()) {
                    // Set type.
                    t.setType('single');
                    // Set rotation.
                    t.setRotation(180);
                    // Check for corners.
                    if (!t.getSurroundingTiles().topLeft.isPlayable() && !t.getSurroundingTiles().topRight.isPlayable()) {
                        // Set type.
                        t.setType('single_corner_side');
                    } else if (!t.getSurroundingTiles().topLeft.isPlayable()) {
                        // Set type.
                        t.setType('single_corner_right');
                    } else if (!t.getSurroundingTiles().topRight.isPlayable()) {
                        // Set type.
                        t.setType('single_corner_left');
                    }
                }
            }
            // Tile has four openings = corner, corner side, corner opposite, corner triple.
            else if (_connections === 4) {
                // Check which position corner is at.
                // Skip if no non-playable tile around.
                if (t.getSurroundingTiles().asArray.find(s => !s.isPlayable()) === undefined) {
                    // Set type.
                    t.setType('empty');
                } else {
                    if (!t.getSurroundingTiles().topLeft.isPlayable() && !t.getSurroundingTiles().topRight.isPlayable()) {
                        // Set type.
                        t.setType('corner_side');
                        // Set rotation.
                        t.setRotation(0);
                    } else if (!t.getSurroundingTiles().topRight.isPlayable() && !t.getSurroundingTiles().bottomRight.isPlayable()) {
                        // Set type.
                        t.setType('corner_side');
                        // Set rotation.
                        t.setRotation(90);
                    } else if (!t.getSurroundingTiles().bottomRight.isPlayable() && !t.getSurroundingTiles().bottomLeft.isPlayable()) {
                        // Set type.
                        t.setType('corner_side');
                        // Set rotation.
                        t.setRotation(180);
                    } else if (!t.getSurroundingTiles().bottomLeft.isPlayable() && !t.getSurroundingTiles().topLeft.isPlayable()) {
                        // Set type.
                        t.setType('corner_side');
                        // Set rotation.
                        t.setRotation(270);
                    } else if (!t.getSurroundingTiles().topLeft.isPlayable() && !t.getSurroundingTiles().bottomRight.isPlayable()) {
                        // Set type.
                        t.setType('corner_opposite');
                        // Set rotation.
                        t.setRotation(0);
                    } else if (!t.getSurroundingTiles().topRight.isPlayable() && !t.getSurroundingTiles().bottomLeft.isPlayable()) {
                        // Set type.
                        t.setType('corner_opposite');
                        // Set rotation.
                        t.setRotation(90);
                    } else if (!t.getSurroundingTiles().topRight.isPlayable() && !t.getSurroundingTiles().bottomLeft.isPlayable()) {
                        // Set type.
                        t.setType('corner_opposite');
                        // Set rotation.
                        t.setRotation(90);
                    } else if (!t.getSurroundingTiles().topLeft.isPlayable()) {
                        // Set type.
                        t.setType('corner');
                        // Set rotation.
                        t.setRotation(0);
                    } else if (!t.getSurroundingTiles().topRight.isPlayable()) {
                        // Set type.
                        t.setType('corner');
                        // Set rotation.
                        t.setRotation(90);
                    } else if (!t.getSurroundingTiles().bottomRight.isPlayable()) {
                        // Set type.
                        t.setType('corner');
                        // Set rotation.
                        t.setRotation(180);
                    } else if (!t.getSurroundingTiles().bottomLeft.isPlayable()) {
                        // Set type.
                        t.setType('corner');
                        // Set rotation.
                        t.setRotation(270);
                    } else if (t.getSurroundingTiles().bottomRight.isPlayable()) {
                        // Set type.
                        t.setType('corner_triple');
                        // Set rotation.
                        t.setRotation(0);
                    } else if (t.getSurroundingTiles().bottomLeft.isPlayable()) {
                        // Set type.
                        t.setType('corner_triple');
                        // Set rotation.
                        t.setRotation(90);
                    } else if (t.getSurroundingTiles().topLeft.isPlayable()) {
                        // Set type.
                        t.setType('corner_triple');
                        // Set rotation.
                        t.setRotation(180);
                    } else if (t.getSurroundingTiles().topRight.isPlayable()) {
                        // Set type.
                        t.setType('corner_triple');
                        // Set rotation.
                        t.setRotation(270);
                    }
                }
            }

        });

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

    getPathOuter() {
        return this._pathOuter;
    }

}