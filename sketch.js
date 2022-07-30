const moveIntensity = 100;

let wavePoint;

function setup() {
  frameRate(60);
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

  update() {
    if (this.dragging) {
      let moveX = this.x - mouseX;
      let moveY = this.y - mouseY;
      moveX = map(
        moveX,
        -moveIntensity,
        moveIntensity,
        -this.speed,
        this.speed
      );
      moveY = map(
        moveY,
        -moveIntensity,
        moveIntensity,
        -this.speed,
        this.speed
      );
      this.x -= moveX;
      this.y -= moveY;
    }
  }

  draw() {
    this.update();
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
}

const map = (target_num, in_min, in_max, out_min, out_max) => {
  if (target_num > in_max) {
    target_num = in_max;
  } else if (target_num < in_min) {
    target_num = in_min;
  }

  const input_diff = in_max - target_num;
  const input_range = in_max - in_min;
  const output_range = out_max - out_min;
  const percentage = input_diff / input_range;
  const out_diff = percentage * output_range;
  const rs = out_max - out_diff;

  return rs;
};
