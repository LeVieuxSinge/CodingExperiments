/**
 * @name script.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Tile-Based Map Generator.
 * @updated September 20th, 2020.
 * @license Free
 */
/*jshint esversion: 8 */

const TILE_SHEET_ROWS = 24;
const TILE_SHEET_COLUMNS = 24;
const TILE_SIZE = 30;
const MIN_END_RADIUS = TILE_SIZE * 11;
const PATH_MIN_TILE = 90;

const DRAW = new P5_GRAPHIC();

var tileSheet;
var generator;
var render_image = false;
var show_path = false;

var color_white = new Color(242, 242, 242, 1);
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

  // Create generator object.
  generator = new Generator({
    origin: new Vector2(width / 2, height / 2),
    columns: TILE_SHEET_COLUMNS,
    rows: TILE_SHEET_ROWS,
    tile_size: TILE_SIZE,
    minimum_end_radius: MIN_END_RADIUS,
    path_minimum_lenth: PATH_MIN_TILE,
  });
  generator.beginPlay();

}

// Draw.
function draw() {

  // Black canvas.
  background(0);

  // Display tiles.
  generator.tiles.forEach(t => {
    DRAW.rectangle(_colorGrey, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5);
  });

  // Draw the path from start to end.
  generator.path.forEach(t => {
    if (render_image) {
      switch (t.type) {
        case 'empty':
          DRAW.rectangle(_colorRed, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, 0);
          break;
        case 'single':
          DRAW.image(img_TileStreet_Single, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
          break;
        case 'single_corner_side':
          DRAW.image(img_TileStreet_SingleCornerSide, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
          break;
        case 'single_corner_right':
          DRAW.image(img_TileStreet_SingleCornerRight, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
          break;
        case 'single_corner_left':
          DRAW.image(img_TileStreet_SingleCornerLeft, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
          break;
        case 'double':
          DRAW.image(img_TileStreet_Double, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
          break;
        case 'double_corner':
          DRAW.image(img_TileStreet_DoubleCorner, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
          break;
        case 'passage':
          DRAW.image(img_TileStreet_Passage, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
          break;
        case 'triple':
          DRAW.image(img_TileStreet_Triple, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
          break;
        case 'corner':
          DRAW.image(img_TileStreet_Corner, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
          break;
        case 'corner_side':
          DRAW.image(img_TileStreet_CornerSide, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
          break;
        case 'corner_opposite':
          DRAW.image(img_TileStreet_CornerOpposite, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
          break;
        case 'corner_triple':
          DRAW.image(img_TileStreet_CornerTriple, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
          break;
      }
    } else {
      DRAW.rectangle(_colorRed, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
    }
  });

  // Draw the path edges.
  generator.path_bounds.forEach(t => {
    if (t.category === 'bounds') {
      DRAW.rectangle(_colorDarkBlue, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5);
    } else if (t.category === 'buildings') {
      if (render_image) {
        DRAW.image(img_TileBuilding_House, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
      } else {
        DRAW.rectangle(_colorBlue, t.position.x, t.position.y, TILE_SIZE - 5, TILE_SIZE - 5, t.rotation);
      }
    }
  });

  // Draw the path debug from start to end.
  if (show_path) {
    generator.path_debug.forEach(t => {
      DRAW.line(color_white, t.p1, t.p2, 1);
    });
    // Draw starting tile.
    DRAW.rectangle(color_white, generator.tile_start.position.x, generator.tile_start.position.y, TILE_SIZE - 10, TILE_SIZE - 10);
    // Draw ending tile.
    DRAW.rectangle(_colorGreen, generator.tile_end.position.x, generator.tile_end.position.y, TILE_SIZE - 10, TILE_SIZE - 10);
  }

}

// Handle key inputs.
function keyReleased() {
  // Space to generate new map.
  keyCode === 32 ? generator.computeLevel() : null;
  // Toggle path debug.
  if (keyCode === 80) {
    show_path = !show_path;
  }
  // Toggle path debug.
  if (keyCode === 73) {
    render_image = !render_image;
  }
}

// Resize update.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  tileSheet.update(width / 2, height / 2);
}

// Debugging, get tile infos.
function mouseClicked() {
  generator.tiles.forEach(t => {
    if (mouseX < t.position.x + (t.size / 2) && mouseX > t.position.x - (t.size / 2) && mouseY < t.position.y + (t.size / 2) && mouseY > t.position.y - (t.size / 2)) {
      console.log(t);
    }
  });
}