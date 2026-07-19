import './demo-can.css';

// Three.js：メイン
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// Three.js：外部モデル読み込み用
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// GSAP
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/***************
  シーンの作成
***************/
const scene = new THREE.Scene();
scene.background = new THREE.Color('#e4e7e7');

/***************
  カメラの作成
***************/
let camera;
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.2, 10);

/***************
  ライトの作成
***************/
const ambientLight = new THREE.AmbientLight('#f8e960', 0.5); // 全体を均等に
scene.add(ambientLight);

const pointLight = new THREE.PointLight('#8efff9', 100); // 斜めから強い光
pointLight.position.set(1, 5, 5);
scene.add(pointLight);

/***************
  モデル読み込み
***************/
// モデルの圧縮ファイル対応（draco）
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/my-visual-works/libs/draco/gltf/');

// 3Dモデルを読み込むLoder
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
let model;

// const localYAxis = new THREE.Vector3(0, 1, 0);

gltfLoader.load('/my-visual-works/models/can.glb', (gltf) => {
  model = gltf.scene;
  model.scale.set(0.5, 0.5, 0.5);
  scene.add(model);

  gsap.to(camera.position, {
    z: 4,
    y: 1.2,
    ease: 'none',
    scrollTrigger: {
      trigger: '.whatIsACan',
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
    },
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.demoCan',
      start: 'top top',
      end: '+=100%',
      pin: true,
      // markers: true,
    },
  });
  tl.from('[data-animation="heading01"]', {
    opacity: 0,
    y: 30,
    stagger: 0.7,
  });

  const historyTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.historyOfTheCan',
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
    },
  });
  historyTl.to(
    model.position,
    {
      x: 1.5,
      y: 0.9,
      ease: 'none',
    },
    0
  );
  historyTl.to(
    model.rotation,
    {
      x: -0.8,
      z: 1,
      ease: 'none',
    },
    0
  );
  historyTl.to(
    model.scale,
    {
      x: 0.2,
      y: 0.2,
      z: 0.2,
      ease: 'none',
    },
    0
  );

  gsap.from('[data-animation="whatIsACanH2"]', {
    opacity: 0,
    duration: 0.5,
    delay: 1,
    scrollTrigger: {
      trigger: '.whatIsACan',
      start: 'top center',
      end: '+=30%',
      toggleActions: 'play none none reverse',
      scrub: true,
    },
  });
});

/***************
  レンダー、コントロール
***************/
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false; // スクロールによるモデル拡大縮小の無効

controls.target.set(0, 1.0, 0);
controls.update();

// 環境マップ
const pmremGenerator = new THREE.PMREMGenerator(renderer);
const roomEnv = new RoomEnvironment(renderer);
const envTexture = pmremGenerator.fromScene(roomEnv).texture;

scene.environment = envTexture;

roomEnv.dispose();
pmremGenerator.dispose();

// イベント
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// シーンのレンダー（アニメーション）
const renderloop = () => {
  if (model) {
    model.rotation.y += 0.003;
    // model.rotateOnAxis(localYAxis, 0.003);
  }

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

/***************
  実行処理
***************/
renderloop();
