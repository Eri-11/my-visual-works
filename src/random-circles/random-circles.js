const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const circleTypes = [
  'circle',
  'half-top',
  'half-right',
  'half-bottom',
  'half-left',
  'quarter-top-right',
  'quarter-bottom-right',
  'quarter-bottom-left',
  'quarter-top-left',
];

// イベント
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
addEventListener('click', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

function randomType(types) {
  return types[Math.floor(Math.random() * types.length)];
}

// 円のインスタンスと生成
class Circle {
  constructor(x, y, radius, type) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.type = type;
  }

  draw() {
    switch (this.type) {
      case 'circle':
        this.drawCircle();
        break;

      case 'half-top':
        this.drawHalfTopCircle();
        break;

      case 'half-bottom':
        this.drawHalfBottomCircle();
        break;

      case 'half-right':
        this.drawHalfRightCircle();
        break;

      case 'half-left':
        this.drawHalfLeftCircle();
        break;

      case 'quarter-top':
        this.drawQuarterCircle();
        break;

      case 'quarter-bottom':
        this.drawQuarterCircle();
        break;

      case 'quarter-right':
        this.drawQuarterCircle();
        break;

      case 'quarter-left':
        this.drawQuarterCircle();
        break;

      case 'quarter-top-right':
        this.drawQuarterTopRight();
        break;

      case 'quarter-bottom-right':
        this.drawQuarterBottomRight();
        break;

      case 'quarter-bottom-left':
        this.drawQuarterBottomLeft();
        break;

      case 'quarter-top-left':
        this.drawQuarterTopLeft();
        break;
    }
  }

  drawCircle() {
    c.fillStyle = '#dfd9bb';
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.closePath();
  }
  drawHalfTopCircle() {
    c.fillStyle = '#dfd9bb';
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.arc(this.x, this.y, this.radius, Math.PI, Math.PI * 2);
    c.closePath();
    c.fill();
  }
  drawHalfBottomCircle() {
    c.fillStyle = '#dfd9bb';
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.arc(this.x, this.y, this.radius, 0, Math.PI);
    c.closePath();
    c.fill();
  }
  drawHalfRightCircle() {
    c.fillStyle = '#dfd9bb';
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.arc(this.x, this.y, this.radius, -Math.PI / 2, Math.PI / 2);
    c.closePath();
    c.fill();
  }
  drawHalfLeftCircle() {
    c.fillStyle = '#dfd9bb';
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.arc(this.x, this.y, this.radius, Math.PI / 2, Math.PI * 1.5);
    c.closePath();
    c.fill();
  }
  drawQuarterTopRight() {
    c.fillStyle = '#dfd9bb';
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.arc(this.x, this.y, this.radius, -Math.PI / 2, 0);
    c.closePath();
    c.fill();
  }
  drawQuarterBottomRight() {
    c.fillStyle = '#dfd9bb';
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.arc(this.x, this.y, this.radius, 0, Math.PI / 2);
    c.closePath();
    c.fill();
  }
  drawQuarterBottomLeft() {
    c.fillStyle = '#dfd9bb';
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.arc(this.x, this.y, this.radius, Math.PI / 2, Math.PI);
    c.closePath();
    c.fill();
  }
  drawQuarterTopLeft() {
    c.fillStyle = '#dfd9bb';
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.arc(this.x, this.y, this.radius, Math.PI, Math.PI * 1.5);
    c.closePath();
    c.fill();
  }

  update() {
    this.draw();
  }
}

// 実装
let circleArray;
function init() {
  circleArray = [];
  const circles = 24; // 生成個数
  const circlesPerRow = 6; // 1段あたりの個数

  for (let i = 0; i < circles; i++) {
    const radius = 80;
    const diameter = radius * 2; //混乱するのであえて直径も作成
    const gap = 0; // 一応残し

    const col = i % circlesPerRow;
    const row = Math.floor(i / circlesPerRow);

    let x = 200 + col * (diameter + gap);
    let y = 200 + row * (diameter + gap);

    let type = randomType(circleTypes);

    circleArray.push(new Circle(x, y, radius, type));
  }
}

// アニメーション
function animation() {
  requestAnimationFrame(animation);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);

  circleArray.forEach((circle) => {
    circle.update();
  });
}

/***************
  実行処理
***************/
init();
animation();
