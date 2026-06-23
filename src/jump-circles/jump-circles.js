const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ブラウザのリサイズイベント
addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initCircles();
});

// 円のインスタンスと生成
class Circle {
  constructor(x, y, dy, radius, delay) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;

    this.delay = delay || 0;
    this.started = false;
  }

  draw() {
    c.beginPath(); // パスの開始
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // 円、円弧を描く
    c.fillStyle = "blue";
    c.fill();
    c.closePath();
  }

  update(elapsed) {
    // アニメーションの遅延制御
    if (!this.started) {
      if (elapsed < this.delay) {
        this.draw();
        return;
      }
      this.started = true;
    }

    // 上下の動き制御
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.y += this.dy;

    this.draw();
  }
}

// 円の用意
let circleArray = [];
let startTime = null;
function initCircles() {
  circleArray = [];
  startTime = null;

  for (let i = 0; i < 5; i++) {
    let radius = 50;
    let x = radius + radius * 2 * i;
    let y = radius;
    let dy = 8;
    let delay = i * 200;

    circleArray.push(new Circle(x, y, dy, radius, delay));
  }
}

// アニメーション
function animation(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;

  requestAnimationFrame(animation);
  c.fillStyle = "rgba(219, 215, 215, 0.2)"; // 残像はfillStyleとfillRectで表現
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update(elapsed);
  }
}

/***************
  実行処理
***************/
initCircles(); // 円を用意する処理
requestAnimationFrame(animation); // 円を動かし続ける処理

/**
 * 円1の生成
 * 複数円を表示する
 * 円を上下に動かすアニメーション（同時）
 * 時差アニメーション
 */
