/**
 * @name Behavior.js
 * @version v1.0.6
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Living Typo.
 * @updated November 23th, 2020.
 * @license Free
 */

'use strict';

class BehaviorClass {

    constructor() {

        this._state = Codex.states.idle;
        this._potential = null;
        this._required = null;
        this._failures = 0;
        this._confidence = 1.0;

    }

    evaluate(index, structure, rule) {

        // Establish requirements if none
        if (this._required === null) {
            //Make sure there is a rule
            if (rule !== null) {
                // Split rule string into array elements
                this._required = rule.split('');
                // for every element of the structure, find in array and add * to the string to specify that it is filled
                var splitStructure = structure.split('');
                for (var i = 0; i < splitStructure.length; i++) {
                    // Get the first element that matches
                    var match = this._required.find(string => string === splitStructure[i]);
                    // There is a match
                    if (match !== undefined) {
                        this._required[this._required.indexOf(match)] = '*' + match;
                    }
                }
            }
        }

        // Establish probability based on confidence (Exponential function)
        var probability = Math.abs(1 - (1.3 * (0.02 ** this._confidence)));
        // Proability scaled from 1% to 10% chance to not find instantly because this request is asked 1000 per second
        var scaledProbability = clampNumberInRange(probability, 0, 1, 0.001, 0.1);

        // Make sure there is a required
        if (this._required !== null) {
            // Find new potential if none
            if (this._potential === null) {
                // Cell needs to be roaming to actively search
                if (this._state === Codex.states.roaming) {
                    // Decide whether it's going to search or not depending on confidence
                    if (Math.random() < scaledProbability) {
                        // Is searching
                        // Get first required without asterix
                        var type = '';
                        for (var i = 0; i < this._required.length; i++) {
                            if (!this._required[i].startsWith('*')) {
                                type = this._required[i];
                                break;
                            }
                        }
                        // Get random cell of this type in data
                        var storage = Data.retrieveCells().filter(cell => cell.getStructure() === type);
                        if (storage.length !== 0) {
                            var potential = storage[Math.floor(Math.random() * storage.length)];
                            if (potential.getIndex() !== index) {
                                this._potential = potential.getIndex();
                            }
                        }
                    }
                }
            }
            // Chase potential if there is one
            else {
                // Make sure potential still exists
                if (Data.retrieveCells().find(cell => cell.getIndex() === this._potential) !== undefined) {
                    // Decided whether it's going to chasing or not depending on confidence
                    if (Math.random() < probability) {
                        this._state = Codex.states.chasing;
                    }
                } else {
                    // Remove potential
                    this._potential = null;
                    // Change state
                    this._state = Codex.states.idle;
                }
            }
        }

        // Roaming or idle if cell is not chasing
        if (this._state !== Codex.states.chasing) {
            // More confidence = more roaming
            if (Math.random() < probability) {
                this._state = Codex.states.roaming;
            }
            // Less confidence = more idle
            else {
                this._state = Codex.states.idle;
            }
        }

        // less confident = more roaming
        // more roaming = less search
        // more failures = less confident
        // find potential = decrease failures
        // more failures = less strict on required
        // randomly found = increase confidence a bit and merge

    }

    capturedPotential(structure) {
        // Remove potential
        this._potential = null;
        // Reset failures
        this._failures = 0;
        // Increase confidence
        this._confidence = Math.min(this._confidence + 0.05, 1);
        // Change state
        this._state = Codex.states.idle;
        // Update required by adding asterix to missing slots
        var slot = this._required.find(slot => slot === structure);
        var index = this._required.indexOf(slot);
        this._required[index] = '*' + this._required[index];
    }

    requiredComplete() {
        // Return true of false
        var condition = true;
        this._required.forEach(string => {
            if (!string.startsWith('*')) {
                condition = false;
            }
        });
        return condition;
    }

    lostPotential() {
        // Remove potential
        this._potential = null;
        // Add failures
        this._failures += 1;
        // Decrease confidence
        this._confidence = Math.max(this._confidence - 0.05, 0);
        // Change state
        this._state = Codex.states.idle;
    }

    resetRequired() {
        // Reset required
        this._required = null;
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