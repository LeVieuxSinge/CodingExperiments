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
        this.structure = {
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
            structure: ''
        };

        // Random probability
        var random = Math.random();

        // 40% chance of vowel
        if (random < 0.4) {
            character.content = this.randomVowel();
            character.type = this.types.vowel;
            character.structure = this.structure.vowel;
        }
        // 50% chance of consonant
        else if (random < 0.9) {
            character.content = this.randomConsonant();
            character.type = this.types.consonant;
            character.structure = this.structure.consonant;
        }
        // 9% chance of number
        else if (random < 0.99) {
            character.content = this.randomNumber();
            character.type = this.types.number;
            character.structure = this.structure.number;
        }
        // 1% chance of symbol
        else {
            character.content = this.randomSymbol();
            character.type = this.types.symbol;
            character.structure = this.structure.symbol;
        }
        return character;

    }

    randomLetter() {
        // Return random character from letters
        return this._letters[Math.floor(Math.random() * this._letters.length)];
    }

    randomVowel() {
        // Return random character from vowels
        return this._vowels[Math.floor(Math.random() * this._vowels.length)];
    }

    randomConsonant() {
        // Return random character from consonants
        return this._consonants[Math.floor(Math.random() * this._consonants.length)];
    }

    randomNumber() {
        // Return random character from numbers
        return this._numbers[Math.floor(Math.random() * this._numbers.length)];
    }

    randomSymbol() {
        // Return random character from symbols
        return this._symbols[Math.floor(Math.random() * this._symbols.length)];
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
            return Codex.structure.vowel;
        }
        // Consonant
        else if (string === Codex.types.consonant) {
            return Codex.structure.consonant;
        }
        // Number
        else if (string === Codex.types.number) {
            return Codex.structure.number;
        }
        // Symbol
        else if (string === Codex.types.symbol) {
            return Codex.structure.symbol;
        }
    }

}