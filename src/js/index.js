import gsap from 'gsap';

/*
 * firstview canvas
 */
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
    mataballInit();

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
    c.fillStyle = '#2a0fbe';
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
function mataballInit() {
  circleArray = [];

  for (let i = 0; i < 30; i++) {
    let radius;
    if (canvas.width > 800) {
      radius = randomIntFromRange(60, 120);
    } else {
      radius = randomIntFromRange(20, 80);
    }
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 1.5; // delta x（xの変化量）
    let dy = (Math.random() - 0.5) * 1.5; // delta y（yの変化量）

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

// 動き
function metaballAnimation() {
  requestAnimationFrame(metaballAnimation);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

/*
 * pageTitle animation
 */
const pageTitleSpan = document.querySelectorAll('[data-animation="pageTitle"]');

function pageTitleAnimation() {
  gsap.from(pageTitleSpan, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    delay: 1,
    stagger: 0.8, //段の間隔
  });
}

/*
 * ticker animation
 */
const ticker01 = document.getElementById('ticker01');
const ticker01Item = document.querySelector('[data-animation="ticker01__item"]');
const ticker02 = document.getElementById('ticker02');
const ticker02Item = document.querySelector('[data-animation="ticker02__item"]');

function setupTicker(wrapper, item) {
  if (!wrapper && !item) return;

  //コピーするテキストの横幅を読み取り必要量の計算
  const textWidth = item.offsetWidth;
  const requiredAmount = Math.ceil(window.innerWidth / textWidth);

  // +1はスタンバイ用
  for (let i = 1; i <= requiredAmount + 1; i++) {
    const clone = item.cloneNode(true);

    clone.setAttribute('aria-hidden', 'true');
    wrapper.appendChild(clone);
  }
}

function startTickerAnimation01() {
  const allTexts = document.querySelectorAll('[data-animation="ticker01__item"]');

  gsap.to(allTexts, {
    xPercent: -100,
    duration: 5,
    ease: 'none',
    repeat: -1,
  });
}

function startTickerAnimation02() {
  const allTexts = document.querySelectorAll('[data-animation="ticker02__item"]');

  // 左から右へ用
  gsap.set(allTexts, { xPercent: -100 });

  gsap.to(allTexts, {
    xPercent: 0,
    duration: 15,
    ease: 'none',
    repeat: -1,
  });
}

/***************
  実行処理
***************/
window.addEventListener('DOMContentLoaded', () => {
  // firstview canvas
  mataballInit();
  metaballAnimation();

  pageTitleAnimation();

  setupTicker(ticker01, ticker01Item);
  startTickerAnimation01();

  setupTicker(ticker02, ticker02Item);
  startTickerAnimation02();
});
