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
scene.background = new THREE.Color('#e7eaeb');

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

gltfLoader.load('/my-visual-works/models/can.glb', (gltf) => {
  model = gltf.scene;
  model.scale.set(0.5, 0.5, 0.5);

  scene.add(model);
});

/***************
  ライトの作成
***************/
const ambientLight = new THREE.AmbientLight('#f8e960', 0.5); // 全体を均等に
scene.add(ambientLight);

const pointLight = new THREE.PointLight('#8efff9', 100); // 斜めから強い光
pointLight.position.set(1, 5, 5);
scene.add(pointLight);

/***************
  カメラの作成
***************/
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 1.2, 10);

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
    model.rotation.y += 0.002;
  }

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

/***************
  実行処理
***************/
renderloop();

/***************
  テキストコンテンツ GSAP
***************/
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.demoCan',
    start: 'top top',
    end: '+=150%',
    pin: true,
    markers: true,
  },
});
tl.from('[data-animation="heading01"]', {
  opacity: 0,
  y: 30,
  stagger: 0.7,
});

gsap.from('[data-animation="heading02"]', {
  opacity: 0,
  // y: 30,
  duration: 0.3,
  delay: 1,
  scrollTrigger: {
    trigger: '.whatIsACan',
    start: 'top center',
    end: '+=50%',
    toggleActions: 'play none none reverse',
    scrub: true,

    // markers: true,
  },
});
