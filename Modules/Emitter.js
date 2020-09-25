/**
 * @name Emitter.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description 2D Emitter object inspired from Houdini.
 * @updated September 22, 2020.
 * @license Free
 */

'use strict';

class Emitter {

    constructor(params) {
        
        // Data
        this._pts = [];
        this._nextID = 0;
        this.pos = params.pos !== undefined ? params.pos : {
            x: 0,
            y: 0,
        };

    }

    add(amount, point_object) {
        for (let i = 0; i < amount; i++) {

            // Set point ID
            point_object._id = this._nextID;

            // Set point position to emitter origin
            point_object.pos.x = this.pos.x;
            point_object.pos.y = this.pos.y;

            this._pts.push(point_object);
            this._nextID++;
        }
    }

}