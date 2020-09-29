/**
 * @name script.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Tile-Based Map Generator.
 * @updated September 20th, 2020.
 * @license Free
 */

'use strict';

const TILE_SHEET_ROWS = 24;
const TILE_SHEET_COLUMNS = 24;
const TILE_SIZE = 20;
const END_MIN_RADIUS = TILE_SIZE * 11;
const PATH_MIN_TILE = 80;

const DRAW = new P5_GRAPHIC();

var tileSheet;
var generator;

var _colorWhite = new Color(255, 255, 255, 1);
var _colorWhat = new Color(255, 0, 255, 1);
var _colorRed = new Color(255, 0, 0, 1);
var _colorBlue = new Color(0, 0, 255, 1);
var _colorBlack = new Color(0, 0, 0, 1);

// Setup.
function setup() {

  createCanvas(windowWidth, windowHeight);

  // Create tile sheet.
  tileSheet = new TileSheet({
    rows: TILE_SHEET_ROWS,
    columns: TILE_SHEET_COLUMNS,
    tileSize: TILE_SIZE,
    P: {
      x: width / 2,
      y: height / 2,
    },
  });

  console.log(tileSheet);

  // Create generator.
  generator = new Generator({
    input: tileSheet.getTiles(),
    endMinRadius: END_MIN_RADIUS,
    pathMinTile: PATH_MIN_TILE,
  });
  generator.generate();

}

// Draw.
function draw() {

  background(0);

  // Display tiles.
  tileSheet.getTiles().forEach(t => {
    if (t.isPlayable()) {
      DRAW.rectangle(_colorBlack, t.getPosition().x, t.getPosition().y, TILE_SIZE, TILE_SIZE);
      DRAW.rectangle(_colorWhite, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5);
    } else {
      DRAW.rectangle(_colorWhat, t.getPosition().x, t.getPosition().y, TILE_SIZE, TILE_SIZE);
    }
  });

  // Draw the path from start to end.
  for (let i = 0; i < generator.getPath().length; i++) {
    DRAW.rectangle(_colorBlack, generator.getPath()[i].getPosition().x, generator.getPath()[i].getPosition().y, TILE_SIZE, TILE_SIZE);
  }
  for (let i = 0; i < generator.getPathDebug().length; i++) {
    DRAW.line(_colorRed, generator.getPathDebug()[i].p1, generator.getPathDebug()[i].p2, 1);
  }

  // Draw point on starting tile.
  DRAW.circle(_colorRed, generator._startTile.getPosition().x, generator._startTile.getPosition().y, 20);

  // Draw point on ending tile.
  DRAW.circle(_colorBlue, generator._endTile.getPosition().x, generator._endTile.getPosition().y, 20);

}

// Space to generate new map.
function keyReleased() {
  keyCode === 32 ? generator.generate() : null;
}

// Resize update.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tileSheet.update(width / 2, height / 2);
}