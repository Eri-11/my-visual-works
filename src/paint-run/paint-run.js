const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// 円のインスタンスと生成
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
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
  }
}

let circleArray;
function init() {
  circleArray = [];
  for (let i = 0; i < 3; i++) {
    const radius = 100;
    const x = radius + i * radius * 2 + 20;
    const y = -50 + -50 * i * 2;
    circleArray.push(new Circle(x, y, radius, "blue"));
  }
}

// アニメーション
function animation() {
  requestAnimationFrame(animation);
  // clearRectをしないことで画面に円が残り続ける

  circleArray.forEach((circle) => {
    // canvas範囲外で伸び続けるのを防ぐ
    if (circle.y < canvas.height) {
      circle.draw();
      circle.y += 1;
    }
  });
}

/***************
  実行処理
***************/
init();
animation();
