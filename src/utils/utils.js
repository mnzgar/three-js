import * as THREE from 'three';
import { color } from './data';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function createCamera(width, height, scene) {
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(0, 60, 90);
  camera.lookAt(scene.position);
  return camera;
}

function createRenderer(width, height) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

function createControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 1, 0);
  controls.maxPolarAngle = Math.PI / 2;
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.update();
}

function createHemisphereLight() {
  const hemiLight = new THREE.HemisphereLight(color.white, color.grey, 2);
  hemiLight.position.set(0, 2, 0);
  return hemiLight;
}

function createDirectionalLight() {
  const directionalLight = new THREE.DirectionalLight(color.white, 3);
  directionalLight.position.set(5, 10, 7);
  directionalLight.castShadow = true;
  return directionalLight;
}

function render(renderer, scene, camera) {
  renderer.render(scene, camera);
}

function onWindowResize(witdh, height, camera, renderer) {
  camera.aspect = witdh / height;
  camera.updateProjectionMatrix();
  renderer.setSize(witdh, height);
}

function clearScene(scene) {
  while (scene.children.length > 0) {
    const object = scene.children[0];
    scene.remove(object);

    if (object.geometry) object.geometry.dispose();
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach(material => material.dispose());
      } else {
        object.material.dispose();
      }
    }
  }
}

export { createCamera, createRenderer, createControls, createHemisphereLight, createDirectionalLight, render, onWindowResize, clearScene };
