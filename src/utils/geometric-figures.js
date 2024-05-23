import * as THREE from 'three';
import { color } from './data';

const creationFunctions = [
  createCube,
  createSphere,
  createTetrahedron,
  createCylinder,
  createCone,
  createTorus
];

function createRandomShape() {
  const availableFunctions = [...creationFunctions];

  const selectedFunctions = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * availableFunctions.length);
    const selectedFunction = availableFunctions.splice(randomIndex, 1)[0];
    selectedFunctions.push(selectedFunction);
  }
  return selectedFunctions;
}

function createPlane() {
  const planeGeometry = new THREE.PlaneGeometry(12, 5);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: color.grey });

  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.name = 'plane';
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0, -1, 0);
  plane.receiveShadow = true;
  return plane;
}

function createGrid() {
  const grid = new THREE.GridHelper(12, 5, color.black, color.black);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  grid.position.set(0, -1, 0);
  return grid;
}

function createCube(pos) {
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterials = [
    new THREE.MeshBasicMaterial({ color: color.red }),
    new THREE.MeshBasicMaterial({ color: color.green }),
    new THREE.MeshBasicMaterial({ color: color.blue }),
    new THREE.MeshBasicMaterial({ color: color.yellow }),
    new THREE.MeshBasicMaterial({ color: color.cyan }),
    new THREE.MeshBasicMaterial({ color: color.magenta })
  ];

  const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
  cube.name = 'f-cube';
  cube.position.x = pos;
  cube.castShadow = true;
  cube.receiveShadow = true;
  return cube;
}

function createSphere(pos) {
  const sphereGeometry = new THREE.SphereGeometry(0.8, 20, 30);
  const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x7777ff,
      wireframe: true
  });

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.name = 'f-sphere';
  sphere.position.x = pos;
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  return sphere;
}

function createTetrahedron(pos) {
  const tetrahedronGeometry = new THREE.TetrahedronGeometry(1);
  const tetrahedronMaterials = new THREE.MeshBasicMaterial({ color: color.magenta, wireframe: true });

  const tetrahedron = new THREE.Mesh(tetrahedronGeometry, tetrahedronMaterials);
  tetrahedron.name = 'f-tetrahedron';
  tetrahedron.position.x = pos;
  tetrahedron.castShadow = true;
  tetrahedron.receiveShadow = true;
  return tetrahedron;
}

function createCylinder(pos) {
  const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
  const cylinderMaterial = new THREE.MeshBasicMaterial({ color: color.red, wireframe: true });

  const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  cylinder.name = 'f-cylinder';
  cylinder.position.x = pos;
  cylinder.castShadow = true;
  cylinder.receiveShadow = true;
  return cylinder;
}

function createCone(pos) {
  const coneGeometry = new THREE.ConeGeometry(0.6, 1.2, 32);
  const coneMaterial = new THREE.MeshBasicMaterial({ color: color.green });

  const cone = new THREE.Mesh(coneGeometry, coneMaterial);
  cone.name = 'f-cone';
  cone.position.x = pos;
  cone.castShadow = true;
  cone.receiveShadow = true;
  return cone;
}

function createTorus(pos) {
  const torusGeometry = new THREE.TorusGeometry(0.7, 0.3, 10, 100);
  const torusMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

  const torus = new THREE.Mesh(torusGeometry, torusMaterial);
  torus.name = 'f-torus';
  torus.position.x = pos;
  torus.castShadow = true;
  torus.receiveShadow = true;
  return torus;
}

export { createRandomShape, createPlane, createGrid, createCube, createSphere, createTetrahedron, createCylinder, createCone, createTorus };
