/**
 * @name Typography.js
 * @version v1.0.6
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Living Typo.
 * @updated November 23th, 2020.
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

        // Statements from https://www.philosophybasics.com/general_quotes.html
        this._statements = ['The unexamined life is not worth living', 'Whereof one cannot speak, thereof one must be silent', 'Entities should not be multiplied unnecessarily', 'The life of man is solitary, poor, nasty, brutish, and short','I think therefore I am', 'He who thinks great thoughts, often makes great errors', 'We live in the best of all possible worlds', 'What is rational is actual and what is actual is rational', 'God is dead! He remains dead! And we have killed him', 'There is but one truly serious philosophical problem, and that is suicide', 'One cannot step twice in the same river', 'The greatest happiness of the greatest number is the foundation of morals and legislation', 'To be is to be perceived', 'Happiness is not an ideal of reason but of imagination', 'No man\'s knowledge here can go beyond his experience', 'God is not willing to do everything, and thus take away our free will and that share of glory which belongs to us', 'Liberty consists in doing what one desires', 'It is undesirable to believe a proposition when there is no ground whatever for supposing it true', 'Even while they teach, men learn', 'There is only one good, knowledge, and one evil, ignorance', 'If God did not exist, it would be necessary to invent Him', 'This is patently absurd; but whoever wishes to become a philosopher must learn not to be frightened by absurdities'];

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

        // 40% chance of vowel
        if (random < 0.4) {
            character.content = this._vowels[Math.floor(Math.random() * this._vowels.length)];
            character.type = this.types.vowel;
            character.structure = this.structures.vowel;
        }
        // 60% chance of consonant
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

    randomStatement() {
        // Return random philosophical statement
        return this._statements[Math.floor(Math.random() * this._statements.length)];
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