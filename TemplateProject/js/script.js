var ballArray = new Array();
function setup() {
  createCanvas(640,480);
}
function draw() {
  background(0);
//   ballArray.push(new Ball(width/2, height/2, map(random(), 0, 1, 1, 8)));
//   for (var i = 0; i < ballArray.length; i++) {
//     ballArray[i].update();
//     ballArray[i].display();
//     ballArray[i].reset();
//   }
}

function Ball(x, y, speed) {
    this.size = 10;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.color = 255;
  }
  Ball.prototype.update = function () {
    if (keyIsDown(39)) {
      this.vx = this.speed;
    }
    else if (keyIsDown(37)) {
      this.vx = -this.speed;
    }
    else {
      this.vx = 0;
    }
  
    if (keyIsDown(38)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(40)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }
  
    this.x += this.vx;
    this.y += this.vy;
  }
  Ball.prototype.display = function () {
    push();
    fill(this.color);
    ellipse(this.x, this.y, this.size / 2);
    pop();
  }
  Ball.prototype.reset = function () {
    if (keyIsDown(32)) {
      this.x = width/2;
      this.y = height/2;
    }
    else if (this.x-(this.size/2) < 0 || this.x+(this.size/2) > width || this.y-(this.size/2) < 0 || this.y+(this.size/2) > height) {
      this.x = width/2;
      this.y = height/2;
    }
  }