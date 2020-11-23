/**
 * @name Dictionnary.js
 * @version v1.0.6
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Living Typo.
 * @updated November 23th, 2020.
 * @license Free
 */

'use strict';

class DictionnaryClass {

    constructor() {

        this._words = [];
        this._wordRules = [];
        this._sentenceRules = [];

    }

    addWord(type, structure, content) {
        // Push word in dictionnary
        this._words.push({type: type, structure: structure, content: content});
    }

    getWords() {
        // Return words
        return this._words;
    }

    getWordRule() {
        // Return a new or old rule
        var rule = null;
        // Decide whether to return an old or new one based on the amount if rules existing for this instance (Exponential function)
        var probability = 0.95 ** this._wordRules.length;
        // Generate one
        if (Math.random() < probability) {
            // Random amount of character
            var amountCharacters = Math.ceil(Math.random() * 10);
            var constructedRule = '';
            for (var i = 0; i < amountCharacters; i++) {
                var random = Math.random();
                // 40% chance of vowel
                if (random < 0.4) {
                    constructedRule += Codex.structures.vowel;
                }
                // 60% chance of consonant
                else if (random < 1.0) {
                    constructedRule += Codex.structures.consonant;
                }

                /**
                * REMOVED BECAUSE WASN'T FEELING RIGHT
                */

                // // 9% chance of number
                // else if (random < 0.99) {
                //     constructedRule += Codex.structures.number;
                // }
                // // 1% chance of symbol
                // else {
                //     constructedRule += Codex.structures.symbol;
                // }
            }
            // Add to word rule dictionnary
            this._wordRules.push(constructedRule);
            // Set return value
            rule = constructedRule;
        }
        // Pick old one
        else {
            rule = this._wordRules[Math.floor(Math.random() * this._wordRules.length)];
        }

        return rule;

    }

    getSentenceRule() {
        // Return a new or old rule
        var rule = null;
        // Decide whether to return an old or new one based on the amount if rules existing for this instance (Exponential function)
        var probability = 0.95 ** this._sentenceRules.length;
        // Generate one
        if (Math.random() < probability) {
            // Random amount of words
            var amountWords = Math.ceil(Math.random() * 25);
            var constructedRule = '';
            for (var i = 0; i < amountWords; i++) {
                var random = Math.random();
                // 30% chance of noun
                if (random < 0.3) {
                    constructedRule += Codex.structures.noun;
                }
                // 30% chance of verb
                else if (random < 0.6) {
                    constructedRule += Codex.structures.verb;
                }
                // 40% chance of adjective
                else {
                    constructedRule += Codex.structures.adjective;
                }
            }
            // Add to sentence rule dictionnary
            this._sentenceRules.push(constructedRule);
            // Set return value
            rule = constructedRule;
        }
        // Pick old one
        else {
            rule = this._sentenceRules[Math.floor(Math.random() * this._sentenceRules.length)];
        }

        return rule;

    }

}