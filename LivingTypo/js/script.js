/**
 * @name script.js
 * @version v1.0.6
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Living Typo.
 * @updated November 23th, 2020.
 * @license Free
 */

'use strict';

// Version
const Version = '1.0.6';
console.log('LivingTypo Version ' + Version);

// Constants
const Draw = new P5_GRAPHIC();
const Data = new DataClass();
const Dictionnary = new DictionnaryClass();
const Codex = new CodexClass();
const System = new SystemClass();

// Colors
const White = new Color(255, 255, 255, 1);

// Setup.
function setup() {

    // Canvas
    createCanvas(windowWidth, windowHeight);

}

// Draw.
function draw() {

    // Black canvas.
    background(0);

    // System
    System.update();

    // Draw cells
    System.getCells().forEach(cell => {
        Draw.text(cell.getContent(), White, cell.getPosition().x, cell.getPosition().y, 20);
    });

}

// Resize update.
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// On input
function input(value) {
    if (value !== '') {
        System.setInput(value);
        // Reset input
        document.getElementById('input').value = '';
    }
}