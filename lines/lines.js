// canvasを扱う際のベース
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const svgPath = document.getElementById('svgpath');
const totalPathLength = svgPath.getTotalLength();

// イベント
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// パーティクルのインスタンスと生成
class Particle {
  constructor(speed, radius, delayFlames) {
    this.speed = speed;
    this.radius = radius;
    this.delayTimer = delayFlames;

    this.distance = 0;
    this.x = 0;
    this.y = 0;
    this.isFinished = false;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = 'blue';
    c.fill();
    c.closePath();
  }

  update() {
    if (this.isFinished) return;

    this.distance += this.speed;

    if (this.distance >= totalPathLength) {
      this.distance = totalPathLength;
      this.isFinished = true;
    }

    const point = svgPath.getPointAtLength(this.distance);
    this.x = point.x;
    this.y = point.y;

    this.draw();
  }
}

// 実装
let particleArray;
function init() {
  particleArray = [];

  c.fillStyle = '#fff';
  c.fillRect(0, 0, canvas.width, canvas.height);

  const quantity = 1;

  for (let i = 0; i < quantity; i++) {
    const speed = 3;
    const radius = 3;
    const delayFlames = i;

    particleArray.push(new Particle(speed, radius, delayFlames));
  }
}

// アニメーション
function animation() {
  requestAnimationFrame(animation);

  particleArray.forEach((particle) => {
    particle.update();
  });
}

/***************
  実行処理
***************/
init();
animation();
