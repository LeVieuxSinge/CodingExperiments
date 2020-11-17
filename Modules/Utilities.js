/**
 * @name Utilities.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Living Typo.
 * @updated November 14th, 2020.
 * @license Free
 */

'use strict';

class Color {

    constructor(r, g, b, a) {

        // Public
        this.r = r !== undefined ? r : 255;
        this.g = g !== undefined ? g : 255;
        this.b = b !== undefined ? b : 255;
        this.a = a !== undefined ? a : 1;
    }

}

class Vector2 {

    constructor(x, y) {

        // Public
        this.x = x !== undefined ? x : 0;
        this.y = y !== undefined ? y : 0;

    }

    dist(Vector2) {
        return Math.sqrt(Math.pow(Math.abs(this.y - Vector2.y), 2) + Math.pow(Math.abs(this.x - Vector2.x), 2));
    }

    compare(Vector2) {
        if (this.x === Vector2.x && this.y === Vector2.y) {
            return true;
        } else {
            return false;
        }
    }

}

class Vector3 {

    constructor(x, y, z) {

        // Public
        this.x = x !== undefined ? x : 0;
        this.y = y !== undefined ? y : 0;
        this.z = z !== undefined ? z : 0;

    }

}

/**
 * Returns a random Vector2 in range
 * @param {*} x 
 * @param {*} y 
 * @param {*} width 
 * @param {*} height 
 */
function randomPositionInRange(x = 0, y = 0, width = window.innerWidth, height = window.innerHeight) {
    var rangeX = width - x;
    var rangeY = height - x;
    return new Vector2((Math.random() * rangeX), (Math.random() * rangeY));
}

/**
 * Returns a Vector2 direction to a target position
 * @param {*} position 
 * @param {*} target 
 */
function directionToTarget(position = new Vector2(), target = new Vector2()) {

    // Calculate distance between position and target
	var distanceX = target.x - position.x;
	var distanceY = target.y - position.y;
    var distance = Math.sqrt( ( distanceX ** 2 ) + ( distanceY ** 2 ) );
	// Get normalized direction
	var direction = new Vector2();
	if (distance > 0.0) {
        direction = new Vector2((distanceX / distance), (distanceY / distance));
    }
    return direction;

}

/**
 * Return a number between a range. (Modified from p5)
 * @param {*} number 
 * @param {*} numberMin 
 * @param {*} numberMax 
 * @param {*} targetMin 
 * @param {*} targetMax 
 */
function clampNumberInRange(number, numberMin, numberMax, targetMin, targetMax) {
    return ((number-numberMin)/(numberMax-numberMin))*(targetMax-targetMin)+targetMin;
}