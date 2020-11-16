/**
 * @name Cell.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Living Typo.
 * @updated November 14th, 2020.
 * @license Free
 */

'use strict';

class CellClass {

    constructor(index) {

        this._index = index;
        this._content = '';
        this._instance = '';
        this._type = '';
        this._structure = '';
        this._rule = null;
        this._behavior = new BehaviorClass();

        // Movements
        this._P = new Vector2();
        this._targetP = null;
        this._v = new Vector2();
        this._speed = 1;

    }

    generate(content = '', instance = Codex.instances.character) {

        // Generate the cell attributes
        // No specific content
        if (content === '') {
            // Get random character and type
            var character = Codex.randomCharacter();

            // 10% chance of uppercase
            if (Math.random() < 0.1) {
                character.content = character.content.toUpperCase();
            }

            // Set attributes
            this._content = character.content;
            this._instance = character.instance;
            this._type = character.type;
            this._structure = character.structure;
        }
        // Specific content
        else {
            this._content = content;
            this._instance = instance;
            this._type = Codex.getCharacterTypeFromString(content);
            this._structure = Codex.getCharacterStructureFromType(this._type);
        }

        // Position
        this._P = randomPositionInRange();

    }

    evaluate() {

        // Evaluate the cell and set instance, type and structure based on content
        if (this._instance === Codex.instances.character) {

        }

        // Establish a following rule if there aren't any aleady set
        if (this._rule === null) {

            // Target rules depends if wanting to create a word or a sentence
            if (this._instance === Codex.instances.character) {
                this._rule = Dictionnary.getWordRule();
            }
            else if (this._instance === Codex.instances.word) {
                this._rule = Dictionnary.getSentenceRule();
            }

        }

        // Evaluate behavior according to given structure and rule
        this._behavior.evaluate(this._structure, this._rule);

    }

    move() {

        // Move the cell according to its behavior
        // Idle
        if (this._behavior.getState() === Codex.states.idle) {
            this._targetP = this._P;
        }
        // Roaming
        else if (this._behavior.getState() === Codex.states.roaming) {
            // 20% chance of new position
            if (Math.random() < 0.01) {
                this._targetP = randomPositionInRange();
                var direction = directionToTarget(this._P, this._targetP);
                this._v.x = this._speed * direction.x;
                this._v.y = this._speed * direction.y;
            }
        }
        // Chasing
        else if (this._behavior.getState() === Codex.states.chasing) {
            this._targetP = Data.retrieveCells().find(cell => cell.index = this._behavior.getPotential());
            var direction = directionToTarget(this._P, this._targetP);
            this._v.x = this._speed * direction.x;
            this._v.y = this._speed * direction.y;
        }

        // Update position
        this._P.x += (this._v.x * Math.random());
        this._P.y += (this._v.y * Math.random());

        // Constraint inside window area
        if (this._P.x < 0) {
            this._P.x = 0;
        }
        else if (this._P.x > window.innerWidth) {
            this._P.x = window.innerWidth;
        }
        else if (this._P.y < 0) {
            this._P.y = 0;
        }
        else if (this._P.y > window.innerHeight) {
            this._P.y = window.innerHeight;
        }

    }

    getIndex() {
        // Return index
        return this._index;
    }

    getContent() {
        // Return content
        return this._content;
    }

    getInstance() {
        // Return instance
        return this._instance;
    }

    getType() {
        // Return type
        return this._type;
    }

    getStructure() {
        // Return structure
        return this._structure;
    }

    getPosition() {
        // Return position
        return this._P;
    }

    getBehavior() {
        // Return behavior
        return this._behavior;
    }

}