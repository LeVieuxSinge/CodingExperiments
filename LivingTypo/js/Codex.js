/**
 * @name Typography.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Living Typo.
 * @updated November 14th, 2020.
 * @license Free
 */

'use strict';

class CodexClass {

    constructor() {

        this._letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        this._vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
        this._consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
        this._numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        this._symbols = ['\'', '\.', '\"', '\-', '\!', '\?', '\(', '\)', '\:', '\;'];

        this.instances = {
            character: 'character',
            word: 'word',
            sentence: 'sentence',
        };
        this.types = {
            vowel: 'vowel',
            consonant: 'consonant',
            number: 'number',
            symbol: 'symbol',
            noun: 'noun',
            verb: 'verb',
            adjective: 'adjective',
        };
        this.structures = {
            vowel: 'v',
            consonant: 'c',
            number: 'n',
            symbol: 's',
            noun: 'N',
            verb: 'V',
            adjective: 'A',
        };
        this.states = {
            idle: 'idle',
            roaming: 'roaming',
            chasing: 'chasing',
        };

    }

    randomCharacter() {

        // Return random character and the type
        var character = {
            content: '',
            instance: Codex.instances.character,
            type: '',
            structure: '',
        };

        // Random probability
        var random = Math.random();

        // 50% chance of vowel
        if (random < 0.5) {
            character.content = this._vowels[Math.floor(Math.random() * this._vowels.length)];
            character.type = this.types.vowel;
            character.structure = this.structures.vowel;
        }
        // 50% chance of consonant
        else if (random < 1.0) {
            character.content = this._consonants[Math.floor(Math.random() * this._consonants.length)];
            character.type = this.types.consonant;
            character.structure = this.structures.consonant;
        }


        /**
         * REMOVED BECAUSE WASN'T FEELING RIGHT
         */

        // // 9% chance of number
        // else if (random < 0.99) {
        //     character.content = this._numbers[Math.floor(Math.random() * this._numbers.length)];
        //     character.type = this.types.number;
        //     character.structure = this.structures.number;
        // }
        // // 1% chance of symbol
        // else {
        //     character.content = this._symbols[Math.floor(Math.random() * this._symbols.length)];
        //     character.type = this.types.symbol;
        //     character.structure = this.structures.symbol;
        // }


        return character;

    }

    randomWordType() {

        // Return random word type and structure
        var word = {
            type: '',
            structure: '',
        }
        var random = Math.random();
        // 30% chance of noun
        if (random < 0.3) {
            word.type = this.types.noun;
            word.structure = this.structures.noun;
        }
        // 30% chance of verb
        else if (random < 0.6) {
            word.type = this.types.verb;
            word.structure = this.structures.verb;
        }
        // 40% chance of adjective
        else {
            word.type = this.types.adjective;
            word.structure = this.structures.adjective;
        }

        return word;

    }

    getCharacterTypeFromString(string = '') {
        // Return type from string input
        string = string.toLowerCase();
        // Look into vowels
        if (this._vowels.includes(string)) {
            return Codex.types.vowel;
        }
        // Look into consonants
        else if (this._consonants.includes(string)) {
            return Codex.types.consonant;
        }
        // Look into numbers
        else if (this._numbers.includes(string)) {
            return Codex.types.number;
        }
        // Look into symbols
        else if (this._symbols.includes(string)) {
            return Codex.types.symbol;
        }
    }

    getCharacterStructureFromType(string = '') {
        // Return structure letter from type
        // Vowel
        if (string === Codex.types.vowel) {
            return Codex.structures.vowel;
        }
        // Consonant
        else if (string === Codex.types.consonant) {
            return Codex.structures.consonant;
        }
        // Number
        else if (string === Codex.types.number) {
            return Codex.structures.number;
        }
        // Symbol
        else if (string === Codex.types.symbol) {
            return Codex.structures.symbol;
        }
    }

}