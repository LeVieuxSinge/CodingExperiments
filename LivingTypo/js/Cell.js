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
        this._meaning = '';

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

            /**
            * REMOVED BECAUSE WASN'T FEELING RIGHT
            */

            // 10% chance of uppercase
            // if (Math.random() < 0.1) {
            //     character.content = character.content.toUpperCase();
            // }

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

        // Establish a following rule if there aren't any aleady set
        if (this._rule === null) {
            // Target rules depends if wanting to create a word or a sentence
            if (this._instance === Codex.instances.character) {
                this._rule = Dictionnary.getWordRule();
            } else if (this._instance === Codex.instances.word) {
                this._rule = Dictionnary.getSentenceRule();
            }
        }

        // Evaluate behavior according to given index, structure and rule
        this._behavior.evaluate(this._index, this._structure, this._rule);

        // Move
        this.move();

    }

    move() {

        // Move the cell according to its behavior
        // Idle
        if (this._behavior.getState() === Codex.states.idle) {
            this._v.x = clampNumberInRange(Math.random(), 0, 1, -0.01, 0.01);
            this._v.y = clampNumberInRange(Math.random(), 0, 1, -0.01, 0.01);
        }
        // Roaming
        else if (this._behavior.getState() === Codex.states.roaming) {
            // Set speed
            this._speed = 1;
            // 1% chance of new position
            if (Math.random() < 0.01) {
                this._targetP = randomPositionInRange();
                var direction = directionToTarget(this._P, this._targetP);
                this._v.x = this._speed * direction.x;
                this._v.y = this._speed * direction.y;
            }
        }
        // Chasing
        else if (this._behavior.getState() === Codex.states.chasing) {
            var targetCell = Data.retrieveCells().find(cell => cell.getIndex() === this._behavior.getPotential());
            if (targetCell !== undefined) {
                // Set speed
                this._speed = 1.3;
                // Chase potential
                this._targetP = targetCell.getPosition();
                var direction = directionToTarget(this._P, this._targetP);
                this._v.x = this._speed * direction.x;
                this._v.y = this._speed * direction.y;
                // Within range of potential
                if (this._P.dist(this._targetP) < 5) {
                    this.merge(targetCell);
                }
            }
        }

        // Update position
        this._P.x += (this._v.x * Math.random());
        this._P.y += (this._v.y * Math.random());

        // Constraint inside window area
        if (this._P.x < 0) {
            this._P.x = 0;
        } else if (this._P.x > window.innerWidth) {
            this._P.x = window.innerWidth;
        } else if (this._P.y < 0) {
            this._P.y = 0;
        } else if (this._P.y > window.innerHeight) {
            this._P.y = window.innerHeight;
        }

    }

    merge(target) {

        // Merge content
        // If character, simply merge it
        if (this._instance === Codex.instances.character) {
            this._content += target.getContent();
        }
        // If word, add space before merging
        else if (this._instance === Codex.instances.word) {
            this._content += ' ' + target.getContent();
        }
        // Merge structure
        this._structure += target.getStructure()
        // Update behavior required
        this._behavior.capturedPotential(target.getStructure());
        // Check if required is fullfill
        if (this._behavior.requiredComplete()) {
            // If is a character becoming a word
            if (this._instance === Codex.instances.character) {
                // Cell is now a word
                this._instance = Codex.instances.word;
                // Make sure word isn't already defined
                var definedWord = Dictionnary.getWords().find(word => word.content === this._content);
                if (definedWord !== undefined) {
                    this._type = definedWord.type;
                    this._structure = definedWord.structure;
                }
                // Get random word type and structure
                else {
                    var word = Codex.randomWordType();
                    this._type = word.type;
                    this._structure = word.structure;
                    // Add word to dictionnary
                    Dictionnary.addWord(this._type, this._structure, this._content);
                }
                // Reset rule
                this._rule = null;
                // Reset behavior required
                this._behavior.resetRequired();
                // Print word
                console.log('word: ' + this._content + ' | type: ' + this._type);
            }
            // If is a word becoming a sentence
            else if (this._instance === Codex.instances.word) {
                // Cell is now a sentence
                this._instance = Codex.instances.sentence;
                // Reset type
                this._type = '';
                // Reset rule
                this._rule = null;
                // Reset behavior required
                this._behavior.resetRequired();
                // Get meaning
                this._meaning = Codex.randomStatement();
                // Print sentence
                console.log('sentence: ' + this._content + ' | meaning: ' + this._meaning);
            }
        }
        // Remove potential from all other cells
        Data.retrieveCells().forEach(cell => {
            if (cell.getBehavior().getPotential() === target.getIndex()) {
                cell.getBehavior().lostPotential();
            }
        });
        // Delete target cell
        var data = Data.retrieveCells();
        var index = data.indexOf(target);
        data.splice(index, 1);
        Data.storeCells(data);
        // Update index
        this._index = Data.getHash();
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