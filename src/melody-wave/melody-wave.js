const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initCircles();
});

class Circle {
  constructor(x, y, speed, amplitude, delayFrames, noteSide) {
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.speed = speed;
    this.amplitude = amplitude;
    this.delayTimer = delayFrames;
    this.noteSide = noteSide;

    this.angle = 0;
  }

  draw() {
    c.beginPath();
    c.fillRect(this.x, this.y, this.noteSide, this.noteSide); // 符頭
    c.fillRect(this.x + 10, this.y - 40, 2, 50);
    c.fillRect(this.x + 10, this.y - 40, 15, 5);

    c.fillStyle = '#000';
    c.fill();
    c.closePath();
  }

  update() {
    if (this.delayTimer > 0) {
      this.delayTimer--;
      this.y = this.baseY; // 待機座標
      this.draw();
      return;
    }

    this.angle += this.speed;
    this.y = this.baseY + Math.sin(this.angle) * this.amplitude;

    this.draw();
  }
}

let circleArray;
function initCircles() {
  circleArray = [];

  const noteSide = 10;
  const gapSize = 50;
  const quantity = 24;
  const gaps = quantity - 1;

  const totalWidth = noteSide * quantity + gapSize * gaps;
  const startX = (canvas.width - totalWidth) / 2;

  for (let i = 0; i < quantity; i++) {
    const x = startX + i * (noteSide + gapSize) - 15;
    const y = canvas.height / 2;
    const speed = 0.03;
    const amplitude = 20; // 振幅

    const delayFrames = i * 36; // 何フレーム待つか（12*n）

    circleArray.push(new Circle(x, y, speed, amplitude, delayFrames, noteSide));
  }
}

// アニメーション
function animation() {
  requestAnimationFrame(animation);
  c.fillStyle = 'rgb(255, 255, 255)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  circleArray.forEach((circle) => {
    circle.update();
  });
}

/***************
  実行処理
***************/
initCircles();
animation();
