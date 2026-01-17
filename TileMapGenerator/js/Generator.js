/**
 * @name Generator.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Tile-based map generator.
 * @updated September 20th, 2020.
 * @license Free
 */
/*jshint esversion: 8 */

// end what needs to be done and redo as a node system

/**
 * GLOBALS
 */

const TILE_GROUP_START = 0x0;
const TILE_GROUP_END = 0x1;
const TILE_GROUP_PATH = 0x2;
const TILE_GROUP_BOUND = 0x3;

const TILE_CATEGORY_STREET = 0x10;
const TILE_CATEGORY_BUILDING = 0x10;

/**
 * UTILS
 */

/**
 * CLASSES
 */

/**
 * Actor class
 */
class Generator {
    constructor({
        origin = new Vector2(),
        columns = 10,
        rows = 10,
        tile_size = 50,
        minimum_end_radius = 10,
        path_minimum_lenth = 20,
    }) {

        // TODO : add a function GenerateLevel()
        // TODO : add an event on_level_generated called after GenerateMap()
        // TODO : add a function LoadLevel()
        // TODO : add an event on_level_loaded called when LoadLevel() is done
        // TODO : simualte an objet that holds info about a set of streaming levels

        // tile sheet
        this.origin = origin;
        this.columns = columns;
        this.rows = rows;
        this.tile_size = tile_size;
        this.minimum_end_radius = minimum_end_radius;
        this.path_minimum_lenth = path_minimum_lenth;

        // array of tiles
        this.tiles = []; // USED ONLY IN JAVASCRIPT TO DISPLAY THE GRID
        this.path_tiles = [];
        this.path_bounds = [];
        this.path_debug = [];

        // path
        this.path = [];
        this.path_bounds = [];
        this.path_debug = [];

        // tiles
        this.tile_start = null;
        this.tile_end = null;

        // bind events
        // this.on_level_generate_delegate = this.onTileSheetGenerateComplete();

    }

    /**
     * Public
     */

    /**
     * @description Overrides actor begin play
     */
    beginPlay() {

        // call to parent begin play

        this.createTileSheet();

    }

    createTileSheet() {

        /**
         * Create the tile sheet
         */

        // Debugging.
        console.log('Creating Tile Sheet...');

        // get tile sheet center point
        // performs a different operation if input is even
        var center_x = 0;
        var center_y = 0;

        this.rows % 2 == 0 ? center_y = (this.tile_size * (this.rows / 2)) - this.tile_size / 2 : center_y = this.tile_size * (this.rows / 2);
        this.columns % 2 == 0 ? center_x = (this.tile_size * (this.columns / 2)) - this.tile_size / 2 : center_x = this.tile_size * (this.columns / 2);

        // assign index to tile for faster sorting
        var next_index = 0;

        // create tile sheet
        // for each Y (rows) and X (columns)
        for (var y = 0; y < this.rows; y++) {
            for (var x = 0; x < this.columns; x++) {

                // create new position for tile
                var position = {
                    x: this.tile_size * x,
                    y: this.tile_size * y,
                };

                // displace every tile using center point so that the tile sheet is centered on its origin (0,0)
                position.x -= center_x;
                position.y -= center_y;

                // check if playable.
                // if position on edge (first and last rows || first and last columns)
                var playable = false;
                if (y == 0 || y == (this.rows - 1) || x == 0 || x == (this.columns - 1)) {
                    playable = false;
                } else {
                    playable = true;
                }

                // add tile
                this.tiles.push(new Tile({
                    index: next_index,
                    position: new Vector2(position.x, position.y),
                    size: this.tile_size,
                    can_be_playable: playable,
                }));

                // update next index.
                next_index++;

            }
        }

        // Displace tile sheet to tile sheet origin
        this.tiles.forEach(t => {
            t.position.x += this.origin.x;
            t.position.y += this.origin.y;
        });

        // Compute adjacent and surrounding tiles.
        this.tiles.forEach(t => {

            // look top
            var top = this.tiles.find(f => f.position.equals(t.getTopPosition()));
            if (top !== undefined) {
                t.adjacent_tiles.push(top);
                t.surrounding_tiles.top = top;
                t.surrounding_tiles.as_array.push(top);
            }

            // look top right
            var top_right = this.tiles.find(f => f.position.equals(t.getTopRightPosition()));
            if (top_right !== undefined) {
                t.surrounding_tiles.top_right = top_right;
                t.surrounding_tiles.as_array.push(top_right);
            }

            // look right
            var right = this.tiles.find(f => f.position.equals(t.getRightPosition()));
            if (right !== undefined) {
                t.adjacent_tiles.push(right);
                t.surrounding_tiles.right = right;
                t.surrounding_tiles.as_array.push(right);
            }

            // look bottom right
            var bottom_right = this.tiles.find(f => f.position.equals(t.getBottomRightPosition()));
            if (bottom_right !== undefined) {
                t.surrounding_tiles.bottom_right = bottom_right;
                t.surrounding_tiles.as_array.push(bottom_right);
            }

            // look bottom
            var bottom = this.tiles.find(f => f.position.equals(t.getBottomPosition()));
            if (bottom !== undefined) {
                t.adjacent_tiles.push(bottom);
                t.surrounding_tiles.bottom = bottom;
                t.surrounding_tiles.as_array.push(bottom);
            }

            // look bottom left
            var bottom_left = this.tiles.find(f => f.position.equals(t.getBottomLeftPosition()));
            if (bottom_left !== undefined) {
                t.surrounding_tiles.bottom_left = bottom_left;
                t.surrounding_tiles.as_array.push(bottom_left);
            }

            // look left
            var left = this.tiles.find(f => f.position.equals(t.getLeftPosition()));
            if (left !== undefined) {
                t.adjacent_tiles.push(left);
                t.surrounding_tiles.left = left;
                t.surrounding_tiles.as_array.push(left);
            }

            // look top right
            var top_left = this.tiles.find(f => f.position.equals(t.getTopLeftPosition()));
            if (top_left !== undefined) {
                t.surrounding_tiles.top_left = top_left;
                t.surrounding_tiles.as_array.push(top_left);
            }

        });

        // Debugging
        console.log('Tile Sheet created!', this.tiles);

    }

    computeLevel() {

        /**
         * Compute the level setup
         */

        // debugging
        var timer_start = performance.now();
        console.log('Computing level ...');

        // clean arrays
        this.path = [];
        this.path_bounds = [];
        this.path_debug = [];

        // clean tiles rendering settings
        this.tiles.forEach(t => {
            t.reset();
        });

        // create an array for the playable tiles
        var playable_tiles = this.tiles.filter(t => t.can_be_playable);

        // select random start tile, set it as used, playable, start category and add to path array
        this.tile_start = playable_tiles[Math.floor(playable_tiles.length * Math.random() | 0)];
        this.tile_start.used = true;
        this.tile_start.playable = true;
        this.tile_start.type = TILE_GROUP_START;
        this.path.push(this.tile_start);

        // select random end tile in radius, set it as used, playable and end type
        var dist;
        do {
            this.tile_end = playable_tiles[Math.floor(playable_tiles.length * Math.random() | 0)];
            dist = this.tile_start.position.dist(this.tile_end.position);
        } while (dist < this.minimum_end_radius);
        this.tile_end.playable = true;
        this.tile_end.type = TILE_GROUP_END;

        // generate a path from starting point to end point
        var current_tile = this.tile_start;
        var tile_end_found = false;
        do {
            // get only adjacent playable tiles
            var current_playables = current_tile.adjacent_tiles.filter(t => t.can_be_playable);
            // select random tile from playables
            var next_tile = current_playables[Math.floor(current_playables.length * Math.random() | 0)];

            // is end tile found
            if (next_tile.index === this.tile_end.index) tile_end_found = true;

            // tile is not already in path
            if (this.path.find(t => t.position.equals(next_tile.position)) === undefined) {

                // not end tile
                if (next_tile.type !== TILE_GROUP_END) {
                    // set it as used, playable and path type
                    next_tile.used = true;
                    next_tile.playable = true;
                    next_tile.type = TILE_GROUP_PATH;
                }

                // add to path array
                this.path.push(next_tile);

                // add draw debug line position
                this.path_debug.push({
                    p1: current_tile.position,
                    p2: next_tile.position,
                });

                // set next tile as current                                   
                current_tile = next_tile;

            } else {

                // change the random tile selection depending of whether or not the end tile as been found
                if (!tile_end_found) {

                    // select closest tile from end
                    this.path.forEach(t => {
                        if (t.position.dist(this.tile_end.position) < current_tile.position.dist(this.tile_end.position)) {
                            current_tile = t;
                        }
                    });

                } else {

                    // select random tile from path
                    current_tile = this.path[Math.floor(this.path.length * Math.random() | 0)];

                }

            }

        } while (!tile_end_found || this.path.length < this.path_minimum_lenth);

        // populate path bound array
        this.path.forEach(t => {

            // for each path tile, search in surrounding tiles
            t.surrounding_tiles.as_array.forEach(s => {

                // not playable and index is not already in array
                if (!s.playable && !this.path_bounds.includes(s.index)) {

                    // set it as used and bound type
                    s.used = true;
                    s.type = TILE_GROUP_BOUND;

                    // add to bounds array.
                    this.path_bounds.push(s);

                }

            });

        });

        // compute bound tile group (buildings, bounds) and add bounds to buildings without bounds.
        this.path_bounds.forEach(t => {

            // get amount of adjacent / surrounding playable tiles
            var playable_adjacents = t.adjacent_tiles.filter(s => s.playable);
            var playable_surroundings = t.surrounding_tiles.as_array.filter(s => s.playable);

            // tile on edge of map OR tile surrounded by play tiles OR tile adjacent with no play tiles = bounds.
            if (playable_surroundings.length <= 5 || playable_adjacents.length === 4 || playable_adjacents.length === 0) {
                // Set category.
                t.category = 'bounds';
            }
            // Tile with one non-playable tile.
            else if (playable_adjacents.length === 3) {
                // Look if adjacent non-playable tile as only one adjacent non-playable tile.
                var _adjacentNonPlayable = t.adjacent_tiles.find(s => !s.playable);
                if (_adjacentNonPlayable.adjacent_tiles.filter(s => !s.playable).length === 1) {
                    // Set category.
                    t.category = 'bounds';
                } else {
                    // Set category.
                    t.category = 'buildings';
                }
            }
            // Set random.
            else {
                var _random = Math.random()
                // Set category.
                // 5% bounds, 95% buildings
                _random < 0.05 ? t.category = 'bounds' : t.category = 'buildings';
            }

            // Make sure buildings have bounds.
            if (t.category === 'buildings') {
                t.adjacent_tiles.forEach(a => {
                    if (!a.used) {
                        // Set it as used.
                        a.used = true;
                        // Set category.
                        a.category = 'bounds';
                        // Add to outer array.
                        this.path_bounds.push(a);
                    }
                });
            }

        });

        // computing edge tile rotation for buildings (easy)
        // compute bounds type and rotation

        // Compute path tile type.
        this.path.forEach(t => {

            // Get number of connections.
            var _connections = t.adjacent_tiles.filter(a => a.playable).length;

            // Tile has one opening = triple.
            if (_connections === 1) {
                // Set type.
                t.type = 'triple';
                // Check which position opening is at.
                if (t.surrounding_tiles.top.playable) {
                    // Set rotation.
                    t.rotation = 180;
                } else if (t.surrounding_tiles.right.playable) {
                    // Set rotation.
                    t.rotation = 270;
                } else if (t.surrounding_tiles.bottom.playable) {
                    // Set rotation.
                    t.rotation = 0;
                } else if (t.surrounding_tiles.left.playable) {
                    // Set rotation.
                    t.rotation = 90;
                }
            }
            // Tile has two openings = double, double corner, passage.
            else if (_connections === 2) {
                // Check which position opening is at.
                if (t.surrounding_tiles.top.playable && t.surrounding_tiles.bottom.playable) {
                    // Set type.
                    t.type = 'passage';
                    // Set rotation.
                    t.rotation = 90;
                } else if (t.surrounding_tiles.right.playable && t.surrounding_tiles.left.playable) {
                    // Set type.
                    t.type = 'passage';
                    // Set rotation.
                    t.rotation = 0;
                } else if (t.surrounding_tiles.top.playable && t.surrounding_tiles.right.playable) {
                    // Set type.
                    t.type = 'double';
                    // Set rotation.
                    t.rotation = 270;
                    // Check for corners.
                    if (!t.surrounding_tiles.top_right.playable) {
                        // Set type.
                        t.type = 'double_corner';
                    }
                } else if (t.surrounding_tiles.right.playable && t.surrounding_tiles.bottom.playable) {
                    // Set type.
                    t.type = 'double';
                    // Set rotation.
                    t.rotation = 0;
                    if (!t.surrounding_tiles.bottom_right.playable) {
                        // Set type.
                        t.type = 'double_corner';
                    }
                } else if (t.surrounding_tiles.bottom.playable && t.surrounding_tiles.left.playable) {
                    // Set type.
                    t.type = 'double';
                    // Set rotation.
                    t.rotation = 90;
                    if (!t.surrounding_tiles.bottom_left.playable) {
                        // Set type.
                        t.type = 'double_corner';
                    }
                } else if (t.surrounding_tiles.left.playable && t.surrounding_tiles.top.playable) {
                    // Set type.
                    t.type = 'double';
                    // Set rotation.
                    t.rotation = 180;
                    if (!t.surrounding_tiles.top_left.playable) {
                        // Set type.
                        t.type = 'double_corner';
                    }
                }
            }
            // Tile has three openings = single, single corner right, single corner left, single corner side.
            else if (_connections === 3) {
                // Check which position opening is at.
                if (t.surrounding_tiles.top.playable && t.surrounding_tiles.right.playable && t.surrounding_tiles.bottom.playable) {
                    // Set type.
                    t.type = 'single';
                    // Set rotation.
                    t.rotation = (270);
                    // Check for corners.
                    if (!t.surrounding_tiles.top_right.playable && !t.surrounding_tiles.bottom_right.playable) {
                        // Set type.
                        t.type = 'single_corner_side';
                    } else if (!t.surrounding_tiles.top_right.playable) {
                        // Set type.
                        t.type = 'single_corner_right';
                    } else if (!t.surrounding_tiles.bottom_right.playable) {
                        // Set type.
                        t.type = 'single_corner_left';
                    }
                } else if (t.surrounding_tiles.right.playable && t.surrounding_tiles.bottom.playable && t.surrounding_tiles.left.playable) {
                    // Set type.
                    t.type = 'single';
                    // Set rotation.
                    t.rotation = 0;
                    // Check for corners.
                    if (!t.surrounding_tiles.bottom_right.playable && !t.surrounding_tiles.bottom_left.playable) {
                        // Set type.
                        t.type = 'single_corner_side';
                    } else if (!t.surrounding_tiles.bottom_right.playable) {
                        // Set type.
                        t.type = 'single_corner_right';
                    } else if (!t.surrounding_tiles.bottom_left.playable) {
                        // Set type.
                        t.type = 'single_corner_left';
                    }
                } else if (t.surrounding_tiles.bottom.playable && t.surrounding_tiles.left.playable && t.surrounding_tiles.top.playable) {
                    // Set type.
                    t.type = 'single';
                    // Set rotation.
                    t.rotation = 90;
                    // Check for corners.
                    if (!t.surrounding_tiles.bottom_left.playable && !t.surrounding_tiles.top_left.playable) {
                        // Set type.
                        t.type = 'single_corner_side';
                    } else if (!t.surrounding_tiles.bottom_left.playable) {
                        // Set type.
                        t.type = 'single_corner_right';
                    } else if (!t.surrounding_tiles.top_left.playable) {
                        // Set type.
                        t.type = 'single_corner_left';
                    }
                } else if (t.surrounding_tiles.left.playable && t.surrounding_tiles.top.playable && t.surrounding_tiles.right.playable) {
                    // Set type.
                    t.type = 'single';
                    // Set rotation.
                    t.rotation = 180;
                    // Check for corners.
                    if (!t.surrounding_tiles.top_left.playable && !t.surrounding_tiles.top_right.playable) {
                        // Set type.
                        t.type = 'single_corner_side';
                    } else if (!t.surrounding_tiles.top_left.playable) {
                        // Set type.
                        t.type = 'single_corner_right';
                    } else if (!t.surrounding_tiles.top_right.playable) {
                        // Set type.
                        t.type = 'single_corner_left';
                    }
                }
            }
            // Tile has four openings = corner, corner side, corner opposite, corner triple.
            else if (_connections === 4) {
                // Check which position corner is at.
                // Skip if no non-playable tile around.
                if (t.surrounding_tiles.as_array.find(s => !s.playable) === undefined) {
                    // Set type.
                    t.type = 'empty';
                } else {
                    if (!t.surrounding_tiles.top_left.playable && !t.surrounding_tiles.top_right.playable) {
                        // Set type.
                        t.type = 'corner_side';
                        // Set rotation.
                        t.rotation = 0;
                    } else if (!t.surrounding_tiles.top_right.playable && !t.surrounding_tiles.bottom_right.playable) {
                        // Set type.
                        t.type = 'corner_side';
                        // Set rotation.
                        t.rotation = 90;
                    } else if (!t.surrounding_tiles.bottom_right.playable && !t.surrounding_tiles.bottom_left.playable) {
                        // Set type.
                        t.type = 'corner_side';
                        // Set rotation.
                        t.rotation = 180;
                    } else if (!t.surrounding_tiles.bottom_left.playable && !t.surrounding_tiles.top_left.playable) {
                        // Set type.
                        t.type = 'corner_side';
                        // Set rotation.
                        t.rotation = 270;
                    } else if (!t.surrounding_tiles.top_left.playable && !t.surrounding_tiles.bottom_right.playable) {
                        // Set type.
                        t.type = 'corner_opposite';
                        // Set rotation.
                        t.rotation = 0;
                    } else if (!t.surrounding_tiles.top_right.playable && !t.surrounding_tiles.bottom_left.playable) {
                        // Set type.
                        t.type = 'corner_opposite';
                        // Set rotation.
                        t.rotation = 90;
                    } else if (!t.surrounding_tiles.top_right.playable && !t.surrounding_tiles.bottom_left.playable) {
                        // Set type.
                        t.type = 'corner_opposite';
                        // Set rotation.
                        t.rotation = 90;
                    } else if (!t.surrounding_tiles.top_left.playable) {
                        // Set type.
                        t.type = 'corner';
                        // Set rotation.
                        t.rotation = 0;
                    } else if (!t.surrounding_tiles.top_right.playable) {
                        // Set type.
                        t.type = 'corner';
                        // Set rotation.
                        t.rotation = 90;
                    } else if (!t.surrounding_tiles.bottom_right.playable) {
                        // Set type.
                        t.type = 'corner';
                        // Set rotation.
                        t.rotation = 180;
                    } else if (!t.surrounding_tiles.bottom_left.playable) {
                        // Set type.
                        t.type = 'corner';
                        // Set rotation.
                        t.rotation = 270;
                    } else if (t.surrounding_tiles.bottom_right.playable) {
                        // Set type.
                        t.type = 'corner_triple';
                        // Set rotation.
                        t.rotation = 0;
                    } else if (t.surrounding_tiles.bottom_left.playable) {
                        // Set type.
                        t.type = 'corner_triple';
                        // Set rotation.
                        t.rotation = 90;
                    } else if (t.surrounding_tiles.top_left.playable) {
                        // Set type.
                        t.type = 'corner_triple';
                        // Set rotation.
                        t.rotation = 180;
                    } else if (t.surrounding_tiles.top_right.playable) {
                        // Set type.
                        t.type = 'corner_triple';
                        // Set rotation.
                        t.rotation = 270;
                    }
                }
            }

        });

        // Debugging.
        var _timerEnd = performance.now();
        console.log('Map generated in ' + Math.round(((_timerEnd - timer_start) + Number.EPSILON) * 100) / 100 + ' milliseconds! ');

    }

}