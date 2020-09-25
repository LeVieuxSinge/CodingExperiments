/**
 * @name script.js
 * @version v1.0a
 * @author Xavier Champoux / https://www.artstation.com/doldmnk /
 * @description Points in space.
 * @updated September 20th, 2020.
 * @license Free
 */

'use strict';

const PT_LIFE = 5;
const PT_SIZE = 5;
const PT_SPEEDMIN = 1;
const PT_SPEEDMAX = 8;

var emitter;

function setup() {
  createCanvas(windowWidth, windowHeight);

  emitter = new Emitter({
    pos: {
      x: width / 2,
      y: height / 2,
    },
  });

  emitter.add(1, new Point({
    scale: PT_SIZE,
    life: PT_LIFE,
    speed: {
      base: map(random(), 0, 1, PT_SPEEDMIN, PT_SPEEDMAX),
      min: PT_SPEEDMIN,
      max: PT_SPEEDMAX,
    },
  }));

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  emitter.pos.x = width / 2;
  emitter.pos.y = height / 2;
}

function draw() {
  background(0);

  if (keyIsDown(82)) {
    emitter._pts.shift();
  }

  var _directionX = 0;
  var _directionY = 0;

  if (keyIsDown(39)) {
    _directionX = -1;
  } else if (keyIsDown(37)) {
    _directionX = 1;
  }

  if (keyIsDown(38)) {
    _directionY = 1;
  } else if (keyIsDown(40)) {
    _directionY = -1;
  }

  if (_directionX !== 0 || _directionY !== 0) {
    // Add point
    emitter.add(1, new Point({
      scale: PT_SIZE,
      life: PT_LIFE,
      speed: {
        base: map(random(), 0, 1, PT_SPEEDMIN, PT_SPEEDMAX),
      },
    }));

    // Move points
    emitter._pts.forEach(e => {
      e._vel.x = e.speed.base * _directionX;
      e._vel.y = e.speed.base * _directionY;
      e.pos.x += e._vel.x;
      e.pos.y += e._vel.y;
    });
  }

  // Draw points
  emitter._pts.forEach(e => {
    e.color.a = map(e.speed.base, PT_SPEEDMIN, PT_SPEEDMAX, 0, 1);
    Draw.circle(e.color, e.pos.x, e.pos.y, e.scale);
  });
}