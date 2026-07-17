import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// シーンの作成
const scene = new THREE.Scene();
scene.background = new THREE.Color('#fff');

// 3Dモデルを読み込むローダ
const gltfLoader = new GLTFLoader();
let model;

gltfLoader.load('/my-visual-works/models/octocat_voxel.glb', (gltf) => {
  model = gltf.scene;

  model.scale.set(0.5, 0.5, 0.5);

  model.traverse((child) => {
    if (child.isMesh) {
      const mat = child.material;
      mat.roughness = 0.1;
      mat.metalness = 0.1;
    }
  });
  scene.add(model);
});

// ライトの作成
const ambientLight = new THREE.AmbientLight('#fff', 0.5); // 全体を均等に
scene.add(ambientLight);

const pointLight = new THREE.PointLight('#fff', 100); // 斜めから強い光
pointLight.position.set(1, 5, 5);
scene.add(pointLight);

// カメラの作成
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 1.2, 5);

// レンダー
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// renderer.outputColorSpace = THREE.SRGBColorSpace;

// コントロール
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

controls.target.set(0, 1.0, 0);
controls.update();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// シーンのレンダー
const renderloop = () => {
  if (model) {
    model.rotation.y += 0.003;
  }

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
