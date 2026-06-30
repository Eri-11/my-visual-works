import gsap from 'gsap';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

// イベント
addEventListener('mousemove', (event) => {
  gsap.to(mouse, {
    x: event.clientX,
    y: event.clientY,
    duration: 1,
  });
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

// パーティクルのインスタンスと生成
class Particle {
  constructor(x, y, radius, color, index) {
    this.x = x;
    this.y = y;
    this.baseX = x; // 線の根元
    this.baseY = y; // 線の根元
    this.radius = radius;
    this.color = color;
    this.index = index; // 1本の線自体のパーティクルのindex（位置）
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();

    // 線の根元からのマウスへの距離
    const dx = mouse.x - this.baseX;
    const dy = mouse.y - this.baseY;

    // 個別の角度
    const individualAngle = Math.atan2(dy, dx);

    // 各々の角度でマウスに向けて線を伸ばす
    this.x = this.baseX + this.index * Math.cos(individualAngle);
    this.y = this.baseY + this.index * Math.sin(individualAngle);
  }
}

// 実装
let particles;
function init() {
  particles = [];

  const allLines = 120;
  const linesPerRow = 12;
  const particleCount = 20; // 線のパーティクル数

  const color = '#fff';

  for (let i = 0; i < allLines; i++) {
    // 整列
    const col = i % linesPerRow;
    const row = Math.floor(i / linesPerRow);

    // 配置の間隔
    const lineGapX = 80;
    const lineGapY = 80;

    for (let j = 0; j < particleCount; j++) {
      // 線の根元の生成座標
      let x = 80 + col * lineGapX;
      let y = 80 + row * lineGapY;

      // 1本の線自体のパーティクル
      const distanceFromCenter = j * 2;
      particles.push(new Particle(x, y, 2, color, distanceFromCenter));
    }
  }
}

// アニメーション
function animation() {
  requestAnimationFrame(animation);
  c.fillStyle = 'rgba(100, 100, 99, 0.35)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });
}

/****************
  実行処理
****************/
init();
animation();
