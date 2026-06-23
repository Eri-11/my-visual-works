const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// リサイズイベント
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Utility
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

// 円のインスタンスと生成
class Particle {
  constructor(x, y, radius, radians) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.radians = radians; // ラジアン
    this.velocity = 0.03; //速度

    this.update = () => {
      this.radians += this.velocity;
      this.x = x + Math.cos(this.radians) * 100;
      this.y = y + Math.sin(this.radians) * 100;
      this.draw();
    };
    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = "#81c2f7";
      c.fill();
      c.closePath();
    };
  }
}

// 実装
/*
 * ・円を6個生成するのでfor文で6指定
 * ・6個の円を円形に均等配置は、1/3πラジアンごとに配置なのでradiansを都度更新
 *  90度 = 1/2πラジアン
 */
let particleArray;
let radians = 0;
function init() {
  particleArray = [];
  for (let i = 0; i < 6; i++) {
    radians = radians;
    console.log(radians);
    particleArray.push(
      new Particle(canvas.width / 2, canvas.height / 2, 16, radians),
    );
    radians = radians + (1 / 3) * Math.PI;
  }
}

// 配置の補助用
function guide() {
  c.beginPath();
  c.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2, false);
  c.strokeStyle = "black";
  c.stroke();
}

// アニメーション
function animation() {
  requestAnimationFrame(animation);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // guide();

  particleArray.forEach((e) => {
    e.update();
  });
}

/***************
  実行処理
***************/
init();
animation();
