const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// イベント
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// パーティクルのインスタンスと生成
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    c.save();

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.shadowColor = "rgba(0, 119, 255, 0.8)";
    c.shadowBlur = 20;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.draw();

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

// 実装
let particles;
function init() {
  particles = [];

  const particleCount = 1000; // パーティクルの数
  const angleIncrement = (Math.PI * 2) / particleCount; //円の縁に沿った点を取得する必要がある
  const power = 15;

  for (let i = 0; i < particleCount; i++) {
    particles.push(
      new Particle(
        canvas.width / 2,
        canvas.height / 2,
        1,
        "rgba(255, 255, 255,1)",
        {
          x: Math.cos(angleIncrement * i) * Math.random() * power,
          y: Math.sin(angleIncrement * i) * Math.random() * power,
        },
      ),
    );
  }
}

// アニメーション
function animation() {
  requestAnimationFrame(animation);
  c.fillStyle = "rgba(0, 0, 0, 0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i) => {
    particle.update();
  });
}

/***************
  実行処理
***************/
init();
animation();
