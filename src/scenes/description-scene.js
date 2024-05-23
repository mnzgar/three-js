import * as THREE from 'three';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import { createCamera, createRenderer, createControls, createHemisphereLight, createDirectionalLight, onWindowResize, clearScene, render } from '../utils/utils';
import { features, figuresData } from '../utils/data';
import { createPlane, createGrid } from '../utils/geometric-figures';
import { createMainScene } from './main-scene';

const createDescriptionScene = (width, height, figure) => {
  const descriptionScene = new THREE.Scene();
  
  const container = getContainer(figure);
  const camera = createCamera(width, height, descriptionScene);
  const renderer = createRenderer(width, height);
  createControls(camera, renderer);

  descriptionScene.add(createHemisphereLight());
  descriptionScene.add(createDirectionalLight());

  container.appendChild(renderer.domElement);
  document.addEventListener('click', onClickDescription);
  window.addEventListener('resize', onWindowResize(width, height, camera, renderer));

  const plane = createPlane();
  const grid = createGrid();
  
  descriptionScene.add(plane);
  descriptionScene.add(grid);
  
  figure.position.x = -2;
  descriptionScene.add(figure);
  
  animate();

  function getContainer(figure) {
    const app = document.querySelector('#app');
    app.classList.add('show-text');

    const sceneContainer = app.querySelector('#scene-container');
    if (sceneContainer.firstChild) {
      sceneContainer.removeChild(sceneContainer.firstChild);
    }

    const featureList = app.querySelector('#feature-list');
    featureList.innerHTML = '';
    figuresData[figure.name].forEach((data, index) => {
      const li = document.createElement("li");
      li.textContent = `${features[index]} ${data}`;
      featureList.appendChild(li);
    });

    const downloadButton = app.querySelector('#download-button');
    downloadButton.addEventListener('click', downloadMesh);

    return sceneContainer;
  }

  function downloadMesh() {
    const exporter = new STLExporter();
    const result = exporter.parse(figure, { binary: true });

    const blob = new Blob([result], { type: 'application/octet-stream' });
    const filename = "mesh.stl";

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  function onClickDescription(event) {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
  
    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = -(event.clientY / height) * 2 + 1;
  
    raycaster.setFromCamera(mouse, camera);
  
    const intersects = raycaster.intersectObjects(descriptionScene.children);
    if (intersects.length > 0) {
      const selectedFigure = intersects[0].object;
      if (selectedFigure.name.startsWith('f-')) {
        changeToMainScene(selectedFigure);
      }
    }
  }

  function changeToMainScene() {
    clearScene(descriptionScene);
    renderer.dispose();
    createMainScene(width, height);
  }
  
  function animate() {
    requestAnimationFrame(animate);
  
    figure.rotation.x += 0.01;
    figure.rotation.y += 0.01;
  
    render(renderer, descriptionScene, camera);
  }

  return descriptionScene;
}

export { createDescriptionScene };
