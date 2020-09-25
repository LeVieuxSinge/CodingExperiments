/**
 * @name Point.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description 2D Point object inspired from Houdini.
 * @updated September 22, 2020.
 * @license Free
 */

'use strict';

class Point {

    constructor(params) {

        // Data
        this._id = params.id !== undefined ? params.id : null;
        this.color = params.color !== undefined ? params.color : {
            r: 255,
            g: 255,
            b: 255,
            a: 1,
        };
        this.scale = params.scale !== undefined ? params.scale : 1;
        this._age = params.age !== undefined ? params.age : 0;
        this._life = params.life !== undefined ? params.life : 5;
        this.pos = params.pos !== undefined ? params.pos : {
            x: 0,
            y: 0,
        };

        // State
        this._dead = params.dead !== undefined ? params.dead : 0;

        // Physics
        this._mass = params.mass !== undefined ? params.mass : 1;
        this.speed = params.speed !== undefined ? params.speed : {
            base: 0,
            min: null,
            max: null,
        };
        this._vel = params.vel !== undefined ? params.vel : {
            x: 0,
            y: 0,
        };

    }

}