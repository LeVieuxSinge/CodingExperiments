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
const TILE_SIZE = 30;
const END_MIN_RADIUS = TILE_SIZE * 11;
const PATH_MIN_TILE = 90;

const DRAW = new P5_GRAPHIC();

var tileSheet;
var generator;
var imgRender = false;
var pathDebug = false;

var _colorWhite = new Color(242, 242, 242, 1);
var _colorGrey = new Color(121, 206, 237, 0.1);
var _colorRed = new Color(214, 85, 71, 1);
var _colorGreen = new Color(67, 224, 148, 1);
var _colorBlue = new Color(64, 125, 199, 1);
var _colorDarkBlue = new Color(23, 56, 82, 1);

var img_TileBuilding_House;
var img_TileBuilding_Pillars;
var img_TileStreet_Single;
var img_TileStreet_SingleCornerRight;
var img_TileStreet_SingleCornerLeft;
var img_TileStreet_SingleCornerSide;
var img_TileStreet_Double;
var img_TileStreet_DoubleCorner;
var img_TileStreet_Triple;
var img_TileStreet_Passage;
var img_TileStreet_Corner;
var img_TileStreet_CornerSide;
var img_TileStreet_CornerOpposite;
var img_TileStreet_CornerTriple;

// Preload
function preload() {

  img_TileBuilding_House = loadImage('./assets/images/TileBuilding_House.png');
  img_TileBuilding_Pillars = loadImage('./assets/images/TileBuilding_Pillars.png');
  img_TileStreet_Single = loadImage('./assets/images/TileStreet_Single.png');
  img_TileStreet_SingleCornerRight = loadImage('./assets/images/TileStreet_SingleCornerRight.png');
  img_TileStreet_SingleCornerLeft = loadImage('./assets/images/TileStreet_SingleCornerLeft.png');
  img_TileStreet_SingleCornerSide = loadImage('./assets/images/TileStreet_SingleCornerSide.png');
  img_TileStreet_Double = loadImage('./assets/images/TileStreet_Double.png');
  img_TileStreet_DoubleCorner = loadImage('./assets/images/TileStreet_DoubleCorner.png');
  img_TileStreet_Triple = loadImage('./assets/images/TileStreet_Triple.png');
  img_TileStreet_Passage = loadImage('./assets/images/TileStreet_Passage.png');
  img_TileStreet_Corner = loadImage('./assets/images/TileStreet_Corner.png');
  img_TileStreet_CornerSide = loadImage('./assets/images/TileStreet_CornerSide.png');
  img_TileStreet_CornerOpposite = loadImage('./assets/images/TileStreet_CornerOpposite.png');
  img_TileStreet_CornerTriple = loadImage('./assets/images/TileStreet_CornerTriple.png');

}

// Setup.
function setup() {

  // Canvas
  createCanvas(windowWidth, windowHeight);

  // Create tile sheet.
  tileSheet = new TileSheet({
    rows: TILE_SHEET_ROWS,
    columns: TILE_SHEET_COLUMNS,
    tileSize: TILE_SIZE,
    P: new Vector2(width / 2, height / 2),
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

  // Black canvas.
  background(0);

  // Display tiles.
  tileSheet.getTiles().forEach(t => {
    DRAW.rectangle(_colorGrey, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5);
  });

  // Draw the path from start to end.
  generator.getPath().forEach(t => {
    if (imgRender) {
      switch (t.getType()) {
        case 'empty':
          DRAW.rectangle(_colorRed, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, 0);
          break;
        case 'single':
          DRAW.image(img_TileStreet_Single, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
          break;
        case 'single_corner_side':
          DRAW.image(img_TileStreet_SingleCornerSide, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
          break;
        case 'single_corner_right':
          DRAW.image(img_TileStreet_SingleCornerRight, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
          break;
        case 'single_corner_left':
          DRAW.image(img_TileStreet_SingleCornerLeft, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
          break;
        case 'double':
          DRAW.image(img_TileStreet_Double, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
          break;
        case 'double_corner':
          DRAW.image(img_TileStreet_DoubleCorner, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
          break;
        case 'passage':
          DRAW.image(img_TileStreet_Passage, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
          break;
        case 'triple':
          DRAW.image(img_TileStreet_Triple, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
          break;
        case 'corner':
          DRAW.image(img_TileStreet_Corner, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
          break;
        case 'corner_side':
          DRAW.image(img_TileStreet_CornerSide, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
          break;
        case 'corner_opposite':
          DRAW.image(img_TileStreet_CornerOpposite, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
          break;
        case 'corner_triple':
          DRAW.image(img_TileStreet_CornerTriple, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
          break;
      }
    } else {
      DRAW.rectangle(_colorRed, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
    }
  });

  // Draw the path edges.
  generator.getPathOuter().forEach(t => {
    if (t.getCategory() === 'bounds') {
      DRAW.rectangle(_colorDarkBlue, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5);
    } else if (t.getCategory() === 'buildings') {
      if (imgRender) {
        DRAW.image(img_TileBuilding_House, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
      } else {
        DRAW.rectangle(_colorBlue, t.getPosition().x, t.getPosition().y, TILE_SIZE - 5, TILE_SIZE - 5, t.getRotation());
      }
    }
  });

  // Draw the path debug from start to end.
  if (pathDebug) {
    generator.getPathDebug().forEach(t => {
      DRAW.line(_colorWhite, t.p1, t.p2, 1);
    });
    // Draw starting tile.
    DRAW.rectangle(_colorWhite, generator._startTile.getPosition().x, generator._startTile.getPosition().y, TILE_SIZE - 10, TILE_SIZE - 10);
    // Draw ending tile.
    DRAW.rectangle(_colorGreen, generator._endTile.getPosition().x, generator._endTile.getPosition().y, TILE_SIZE - 10, TILE_SIZE - 10);
  }

}

// Handle key inputs.
function keyReleased() {
  // Space to generate new map.
  keyCode === 32 ? generator.generate() : null;
  // Toggle path debug.
  if (keyCode === 80) {
    pathDebug ? pathDebug = false : pathDebug = true;
  }
  // Toggle path debug.
  if (keyCode === 73) {
    imgRender ? imgRender = false : imgRender = true;
  }
}

// Resize update.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tileSheet.update(width / 2, height / 2);
}

// Debugging, get tile infos.
function mouseClicked() {
  tileSheet.getTiles().forEach(t => {
    if (mouseX < t.getPosition().x + (t.getSize() / 2) && mouseX > t.getPosition().x - (t.getSize() / 2) && mouseY < t.getPosition().y + (t.getSize() / 2) && mouseY > t.getPosition().y - (t.getSize() / 2)) {
      console.log(t);
    }
  });
}