import * as THREE from 'three';
import { createCamera, createRenderer, createControls, createHemisphereLight, createDirectionalLight, onWindowResize, clearScene, render } from '../utils/utils';
import { createPlane, createGrid, createRandomShape } from '../utils/geometric-figures';
import { createDescriptionScene } from './description-scene';

const createMainScene = (width, height) => {
  const mainScene = new THREE.Scene();
  
  const container = getContainer();
  const camera = createCamera(width, height, mainScene);
  const renderer = createRenderer(width, height);
  createControls(camera, renderer);

  mainScene.add(createHemisphereLight());
  mainScene.add(createDirectionalLight());

  container.appendChild(renderer.domElement);
  document.addEventListener('click', onClickMain);
  window.addEventListener('resize', onWindowResize(width, height, camera, renderer));

  const plane = createPlane();
  const grid = createGrid();

  mainScene.add(plane);
  mainScene.add(grid);

  const position = [-3, 0, 3];
  const figures = [];
  createRandomShape().forEach((createFunction, index) => {
    const figure = createFunction(position[index]);
    figures.push(figure);
    mainScene.add(figure);
  });

  animate();

  function getContainer() {
    const app = document.querySelector('#app');
    app.classList.remove('show-text');

    const sceneContainer = app.querySelector('#scene-container');
    if (sceneContainer.firstChild) {
      sceneContainer.removeChild(sceneContainer.firstChild);
    }
    return sceneContainer;
  }

  function onClickMain(event) {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
  
    mouse.x = (event.clientX / width) * 2 - 1;
    mouse.y = -(event.clientY / height) * 2 + 1;
  
    raycaster.setFromCamera(mouse, camera);
  
    const intersects = raycaster.intersectObjects(mainScene.children);
    if (intersects.length > 0) {
      const selectedFigure = intersects[0].object;
      if (selectedFigure.name.startsWith('f-')) {
        changeToDescriptionScene(selectedFigure);
      }
    }
  }

  function changeToDescriptionScene(figure) {
    clearScene(mainScene);
    renderer.dispose();
    createDescriptionScene(width, height, figure);
  }
  
  function animate() {
    requestAnimationFrame(animate);
  
    figures.forEach((figure) => {
      figure.rotation.x += 0.01;
      figure.rotation.y += 0.01;
    });
  
    render(renderer, mainScene, camera);
  }

  return mainScene;
}

export { createMainScene };
