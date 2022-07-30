let wavePoint;

function setup() {
  createCanvas(800, 800);
  background(0);
  wavePoint = new WavePoint(50, 50, 2, 30);
}

function draw() {
  background(0);
  wavePoint.draw();
}

function mousePressed() {
  wavePoint.pressed();
}

function mouseReleased() {
  wavePoint.notPressed();
}

class WavePoint {
  constructor(x, y, speed, collisionSize) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.collisionSize = collisionSize / 2;
    this.dragging = false;
  }

  draw() {
    if (this.dragging) {
      const mouseAreaX = width / 2;
      const mouseAreaY = height / 2;
      let moveX = this.x - mouseX;
      let moveY = this.y - mouseY;

      moveX = map(moveX, -mouseAreaX, mouseAreaX, -this.speed, this.speed);
      moveY = map(moveY, -mouseAreaY, mouseAreaY, -this.speed, this.speed);
      this.x -= moveX;
      this.y -= moveY;
    }
    ellipse(this.x, this.y, 10);
  }

  pressed() {
    if (
      mouseX > this.x - this.collisionSize &&
      mouseX < this.x + this.collisionSize &&
      mouseY > this.y - this.collisionSize &&
      mouseY < this.y + this.collisionSize
    ) {
      this.dragging = true;
    }
  }

  notPressed() {
    this.dragging = false;
  }

  movePositionKey() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
  }
}
