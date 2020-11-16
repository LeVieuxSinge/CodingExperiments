/**
 * @name Behavior.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Living Typo.
 * @updated November 14th, 2020.
 * @license Free
 */

'use strict';

class BehaviorClass {

    constructor() {
        
        this._state = Codex.states.roaming;
        this._potential = null;
        this._required = null;
        this._failures = 0;
        this._confidence = 1.0;

    }

    evaluate(structure, rule) {

        // Establish requirements if none
        if (this._required === null) {
            // Split rule string into array elements
            this._required = rule.split('');
            // for every element of the structure, find in array and add * to the string to specify that it is filled
            var splitStructure = structure.split('');
            for (var i = 0; i < splitStructure.length; i++) {
                // Get the first element that matches
                var match = this._required.find(string => string === splitStructure[i]);
                // There is a match
                if (match !== undefined) {

                }
            }
        }

        // From cell, make sure the structure/content follows the rule

        // new function -> potentialFound() = put asterix on the first in required array without asterix
        // From cell, check if all required are done, update instance, type, etc..

        // Find new potential if none
        if (this._potential === null) {
            // Decide whether its going to search or not depending on confidence (Exponential function)
            // Proability scaled from 1% to 10% chance to not find instantly because this request is asked 1000 per second
            var probability = clampNumberInRange(1 - (0.02 ** this._confidence), 0, 1, 0.001, 0.1);
            // Is searching
            if (Math.random() < probability) {

            }

        }

        
        // less confident = more roaming
        // more roaming = less search
        // more failures = less confident
        // find potential = decrease failures
        // more failures = less strict on required
        // potential loss = decrease in confidence
        // randomly found = increase confidence a bit and merge

    }

    getState() {
        // Return state
        return this._state;
    }

    getPotential() {
        // Return potential
        return this._potential;
    }

}