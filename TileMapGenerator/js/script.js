/**
 * @name script.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Tile-Based Map Generator.
 * @updated September 20th, 2020.
 * @license Free
 */

'use strict';

const TILE_SHEET_ROWS = 12;
const TILE_SHEET_COLUMNS = 12;
const TILE_SIZE = 50;

const DRAW = new P5_GRAPHIC();

var tileSheet;
var generator;

var _colorWhite = {
  r: 255,
  g: 255,
  b: 255,
  a: 1,
};

var _colorWhat = {
  r: 255,
  g: 0,
  b: 255,
  a: 1,
}

var _colorRed = {
  r: 255,
  g: 0,
  b: 0,
  a: 1,
}

var _colorBlue = {
  r: 0,
  g: 0,
  b: 255,
  a: 1,
}

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
    endMinRadius: TILE_SIZE * 4,
    pathMaxTiles: 100,
  });
  generator.generate();

}

function draw() {
  background(0);

  // Display tiles.
  tileSheet.getTiles().forEach(t => {
    if (t.isPlayable()) {
      DRAW.rectangle(_colorWhite, t.getPosition().x, t.getPosition().y, TILE_SIZE, TILE_SIZE);
    } else {
      DRAW.rectangle(_colorWhat, t.getPosition().x, t.getPosition().y, TILE_SIZE, TILE_SIZE);
    }
  });

  // Draw point on starting tile.
  DRAW.circle(_colorRed, generator._startTile.getPosition().x, generator._startTile.getPosition().y, 20);

  // Draw point on ending tile.
  DRAW.circle(_colorBlue, generator._endTile.getPosition().x, generator._endTile.getPosition().y, 20);

  // Draw the path from start to end.
  for (let i = 0; i < generator.getPath().length; i++) {
    if (generator.getPath()[i + 1] !== undefined) {
      DRAW.line(_colorRed, generator.getPath()[i], generator.getPath()[i + 1], 1);
    }
  }

}

// Space to generate new map.
function keyReleased() {
  keyCode === 32 ? generator.generate() : null;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tileSheet.update(width / 2, height / 2);
}