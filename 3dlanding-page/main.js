import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import moonTexture from "../assets/img/moon.png";
import moonMap from "../assets/img/moon-map.jpg";

// Crete new scene
const scene = new THREE.Scene();

//Create Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);

//Load textures
const textuerLoader = new THREE.TextureLoader();
const texture = textureLoader.load(moonTexture);
const displacementMap = textureLoader.load(moonMap);

//Add material
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: texture,
  displacementMap: displacementMap,
  displacementScale: 0.05,
  bumpMap: displacementMap,
  bumpScale: 0.04,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Sizer
let w;
if (window.innerWidth < 800) {
  w = window.innerWidth;
} else {
  w = window.innerWidth / 2;
}

let h = window.innerHeight;

//Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(100, 10, 5);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(25, w / h);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
  antialias: true,
});

renderer.setSize(w, h);
renderer.render(scene, camera);

//Orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

//Window Resize
window.addEventListener("resize", () => {
  //Update size
  if (window.innerWidth < 800) {
    w = window.innerWidth;
  } else {
    w = window.innerWidth / 2;
  }
  h = window.innerHeight;

  // Update camera
  camera.aspet = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

//Animate rotation and update scene
const loop = () => {
  mesh.rotation.y += 0.001;
  renderer;
  render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
