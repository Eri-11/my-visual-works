const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isResizing = false;
let resizeTimer;

// イベント
addEventListener("resize", () => {
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

  // 描画内容
  this.draw = () => {
    c.beginPath(); // パスの開始
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // 円、円弧を描く
    c.fill(); // 描画（面）
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

  for (let i = 0; i < 30; i++) {
    let radius;
    if (canvas.width > 800) {
      radius = randomIntFromRange(50, 150);
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

// canvas内のテキストの改行
let text =
  "あのイーハトーヴォの\nすきとおった風、\n夏でも底に冷たさをもつ青いそら、\nうつくしい森で飾られたモリーオ市、\n郊外のぎらぎらひかる草の波。";
function fillTextLine(c, text, x, y) {
  var textList = text.split("\n");
  var lineHeight = c.measureText("あ").width;
  textList.forEach(function (text, i) {
    c.fillText(text, x, y + lineHeight * i);
  });
}

function canvasText() {
  c.font = "100px serif";
  fillTextLine(c, text, 150, 200);
}

// 動き
function animation() {
  requestAnimationFrame(animation); // animation関数のループ
  c.clearRect(0, 0, innerWidth, innerHeight); // 毎描画ごとに円を作り直すため一度削除

  canvasText();
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

/***************
  実行処理
***************/
init();
animation();
