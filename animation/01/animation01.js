import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * contentA
 */
//01の通過
gsap.to('#aItem01', {
  yPercent: -100,
  ease: 'none',
  scrollTrigger: {
    trigger: '.contentA__stage',
    start: 'top top',
    end: '+=100%',
    scrub: true,
    markers: true,
  },
});

//01以降の固定
ScrollTrigger.create({
  trigger: '.contentA__stage',
  start: 'top top',
  end: '+=200%',
  pin: true,
  pinSpacing: true,
  anticipatePin: 1,
  markers: true,
});

/**
 * contentC
 */
//maskの円形サイズと01の固定
gsap.fromTo(
  '.contentC__mask',
  {
    '--hole-size': '80px', //初期状態
  },
  {
    '--hole-size': '150vmax', //最大時maskを見えなくする
    ease: 'none',
    scrollTrigger: {
      trigger: '.contentC',
      start: 'top top',
      end: '+=200%',
      scrub: 1,
      pin: '.contentC__stage',
      anticipatePin: 1,
      markers: true,
    },
  }
);

/**
 * contentD
 */
const stageD = document.querySelector('.contentD__stage');
const horizontalDistance = () => stageD.scrollWidth - window.innerWidth; // 計算用関数
const startHoldD = 400;
const endHoldD = 800;

const timelineD = gsap.timeline({
  scrollTrigger: {
    trigger: '.contentD',
    start: 'top top',
    end: () => `+=${startHoldD + horizontalDistance() + endHoldD}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    markers: true,
  },
});

// 開始時の固定
timelineD.to(
  {},
  {
    duration: startHoldD,
  }
);

// 横移動
timelineD.to(stageD, {
  x: () => -horizontalDistance(),
  ease: 'none',
  duration: horizontalDistance,
});

// 終了時の固定
timelineD.to(
  {},
  {
    duration: endHoldD,
  }
);
