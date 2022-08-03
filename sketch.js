const moveIntensity = 100;

let wavePoints = [];

function setup() {
  frameRate(30);
  createCanvas(800, 800);
  noStroke();
  background(0);
  wavePoints = new WavePoint(4, 30);
}

function draw() {
  wavePoints.draw();
}

function mousePressed() {
  wavePoints.pressed();
}

function mouseReleased() {
  wavePoints.notPressed();
}

class WavePoint {
  constructor(speed, collisionSize) {
    this.x = random(width);
    this.y = random(height);
    this.speed = speed;
    this.collisionSize = collisionSize / 2;
    this.dragging = false;
    this.waves = [];
  }

  updateMove() {
    if (this.dragging) {
      let moveX = this.x - mouseX;
      let moveY = this.y - mouseY;
      const normalizedMove = this.vectorLength(moveX, moveY);

      moveX = (moveX / normalizedMove) * this.speed;
      moveY = (moveY / normalizedMove) * this.speed;

      this.x -= moveX;
      this.y -= moveY;
    }
  }

  update() {
    this.make();
    this.waves.forEach((wave) => {
      wave.draw();
    });
    this.deleteOutWave();
  }

  make() {
    const col = this.defineColor(220, 4);
    const wave = new WaveGenerator(this.x, this.y, 16, col);
    this.waves.push(wave);
  }

  defineColor(colRange, colCycle) {
    let ellipseColor = cos(frameCount / colCycle) + 1;
    ellipseColor = map(ellipseColor, -1, 1, colRange, 64);
    return ellipseColor;
  }

  deleteOutWave() {
    const threshold = width * 3;
    this.waves.forEach((wave) => {
      if (wave.rad > threshold) {
        this.delete(wave);
      }
    });
  }

  delete(del) {
    this.waves = this.waves.filter((wave) => {
      return wave !== del;
    });
  }

  draw() {
    this.updateMove();
    this.update();
  }

  vectorLength(vx, vy) {
    const vectorLen = Math.sqrt(vx ** 2 + vy ** 2);
    return vectorLen;
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

class WaveGenerator {
  constructor(x, y, speed, col) {
    this.x = x;
    this.y = y;
    this.rad = 0;
    this.speed = speed;
    this.col = col;
  }

  update() {
    this.rad += this.speed;
  }

  draw() {
    this.update();
    push();
    fill(this.col);
    ellipse(this.x, this.y, this.rad);
    pop();
  }
}
