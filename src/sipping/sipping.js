const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let isDrinking = false;

//イベント
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// インスタンス
class DrinkCircle {
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
  }

  update() {
    this.draw();
  }
}

let drinkCircleArrayA;
let drinkCircleArrayB;
let drinkAX;
let drinkAY;
let drinkBX;
let drinkBY;
let drinkRadius = 100;
let drinkCircles = 200;
let drinkColor = '#ee8a48';

//初期画面（飲み物full）
function init() {
  drinkCircleArrayA = [];
  drinkCircleArrayB = [];

  isDrinking = false;

  drinkAX = canvas.width / 2 - 100;
  drinkBX = canvas.width / 2 + 120;
  drinkAY = canvas.height / 2 - 100;
  drinkBY = canvas.height / 2;

  c.fillStyle = '#dbd8d7';

  c.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < drinkCircles; i++) {
    drinkCircleArrayA.push(new DrinkCircle(drinkAX, drinkAY + i, drinkRadius, drinkColor));
    drinkCircleArrayA[i].draw();

    drinkCircleArrayB.push(new DrinkCircle(drinkBX, drinkBY + i, drinkRadius, drinkColor));
    drinkCircleArrayB[i].draw();
  }

  glass();
}

function glass() {
  c.strokeStyle = 'black';
  c.lineWidth = 2;

  // glassA 上部
  c.beginPath();
  c.arc(drinkAX, drinkAY - 20, drinkRadius, 0, Math.PI * 2, false);
  c.stroke();

  // glassA 下部
  c.beginPath();
  c.arc(drinkAX, drinkAY + drinkRadius * 2, drinkRadius, 0, Math.PI * 2, false);
  c.stroke();

  // glassB 上部
  c.beginPath();
  c.arc(drinkBX, drinkBY - 20, drinkRadius, 0, Math.PI * 2, false);
  c.stroke();

  // glassB 下部
  c.beginPath();
  c.arc(drinkBX, drinkBY + drinkRadius * 2, drinkRadius, 0, Math.PI * 2, false);
  c.stroke();

  //strawA
  c.lineWidth = 15;
  c.beginPath();
  c.moveTo(canvas.width / 2 - 280, canvas.height / 2 - 200);
  c.lineTo(canvas.width / 2 - 150, canvas.height / 2 - 250);
  c.lineTo(canvas.width / 2 - 30, canvas.height / 2 + 150);

  c.stroke();

  //strawB
  c.beginPath();
  c.moveTo(canvas.width / 2 + 220, canvas.height / 2 - 200);
  c.lineTo(canvas.width / 2 + 80, canvas.height / 2 + 250);
  c.stroke();
}

let frameCount = 0;
// animation
function animation() {
  requestAnimationFrame(animation);
  c.fillStyle = '#dbd8d7';
  c.fillRect(0, 0, canvas.width, canvas.height);

  if (isDrinking && drinkCircleArrayA.length > 1) {
    drinkCircleArrayA.shift();
  }
  drinkCircleArrayA.forEach((circle) => {
    circle.update();
  });

  frameCount++;
  if (isDrinking && frameCount % 2 === 0) {
    if (drinkCircleArrayB.length > 1) {
      drinkCircleArrayB.shift();
    }
  }
  // 描画は毎フレーム行う（そうしないとチカチカしてしまうため）
  drinkCircleArrayB.forEach((circle) => circle.update());

  glass();
}

/***************
  実行処理
***************/
init();
animation();

addEventListener('click', () => {
  isDrinking = true;
});
