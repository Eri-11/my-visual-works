const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: 60,
  y: 60,
};

// イベント
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

// 円のインスタンス
class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  update() {
    this.x = mouse.x;
    this.y = mouse.y;
  }

  draw() {
    c.save();

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.clip();

    // 円の中だけ、元の内容を再描画
    drawHiddenContent();

    c.restore();
  }
}

// 隠される土台部分
function drawHiddenContent() {
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.fillStyle = "orange";
  c.fillRect(300, canvas.height - 100, 50, 50);

  c.font = "20px sans-serif";
  c.fillStyle = "black";
  c.fillText("黄色い四角形を探して。", 10, 50);
}

// 実装
let clipCircle;
function init() {
  clipCircle = new Circle(mouse.x, mouse.y, 60);
}

// アニメーション
function animation() {
  requestAnimationFrame(animation);
  c.clearRect(0, 0, canvas.width, canvas.height);

  drawHiddenContent();

  // 全体を隠す
  c.fillStyle = "rgba(0, 0, 0, 1)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  clipCircle.update(); // マウス追尾
  clipCircle.draw();
}

/***************
  実行処理
***************/
init();
animation();
