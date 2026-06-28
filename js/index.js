import gsap from 'gsap';

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
  pageTitleAnimation();

  setupTicker(ticker01, ticker01Item);
  startTickerAnimation01();

  setupTicker(ticker02, ticker02Item);
  startTickerAnimation02();
});
