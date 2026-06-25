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
  constructor(x, y, radius, speed, amplitude, delayFrames) {
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.radius = radius;
    this.speed = speed;
    this.amplitude = amplitude;
    this.delayTimer = delayFrames;

    this.angle = 0;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
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
function initCircles() {
  circleArray = [];

  for (let i = 0; i < 60; i++) {
    const radius = 3;
    const x = radius + radius * 2 * i + i * 30;
    const y = canvas.height / 2;
    const speed = 0.03;
    const amplitude = 100; // 振幅

    const delayFrames = i * 36; // 何フレーム待つか（12*n）

    circleArray.push(new Circle(x, y, radius, speed, amplitude, delayFrames));
  }
}

// アニメーション
function animation() {
  requestAnimationFrame(animation);
  c.fillStyle = 'rgb(0, 0, 0)';
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
