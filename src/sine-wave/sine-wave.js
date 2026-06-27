const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

class Square {
  constructor(x, y, speed, amplitude, delayFrames, side) {
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.speed = speed;
    this.amplitude = amplitude;
    this.delayTimer = delayFrames;
    this.side = side;

    this.angle = 0;
  }

  draw() {
    c.beginPath();
    c.fillRect(this.x, this.y, this.side, this.side);

    c.fillStyle = '#fff';
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
function init() {
  circleArray = [];
  c.fillStyle = 'rgb(0, 89, 181)'; // 初回の跡対策
  c.fillRect(0, 0, canvas.width, canvas.height);

  const side = 10;
  const gapSize = 4;
  const quantity = 72;
  const gaps = quantity - 1;

  const totalWidth = side * quantity + gapSize * gaps;
  const startX = (canvas.width - totalWidth) / 2;

  for (let i = 0; i < quantity; i++) {
    const x = startX + i * (side + gapSize);
    const y = canvas.height / 2;
    const speed = 0.03;
    const amplitude = 100; // 振幅

    const delayFrames = i * 2; // 何フレーム待つか（12*n）

    circleArray.push(new Square(x, y, speed, amplitude, delayFrames, side));
  }
}

// アニメーション
function animation() {
  requestAnimationFrame(animation);
  c.fillStyle = 'rgba(0, 89, 181, 0.01)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  circleArray.forEach((circle) => {
    circle.update();
  });
}

/***************
  実行処理
***************/
init();
animation();
