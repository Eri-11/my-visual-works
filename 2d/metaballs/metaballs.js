const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isResizing = false;
let resizeTimer;

// イベント
addEventListener('resize', () => {
  isResizing = true;

  clearTimeout(resizeTimer);

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  resizeTimer = setTimeout(() => {
    init();

    isResizing = false;
  }, 200);
});

// Utility
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//  円のインスタンスと描画
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = '#bccbd1';
    c.fill();
  };

  this.update = () => {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

// 実装
let circleArray;
function init() {
  circleArray = [];

  for (let i = 0; i < 20; i++) {
    let radius;
    if (canvas.width > 800) {
      radius = randomIntFromRange(50, 120);
    } else {
      radius = randomIntFromRange(20, 80);
    }
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2; // delta x（xの変化量）
    let dy = (Math.random() - 0.5) * 2; // delta y（yの変化量）

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

// 動き
function animation() {
  requestAnimationFrame(animation);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

/***************
  実行処理
***************/
/*
 * jsでは円を生成してバウンドアニメーションしているだけ
 * html側の
 */
init();
animation();
