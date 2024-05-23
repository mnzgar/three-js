import { createMainScene } from './scenes/main-scene';

const width = window.innerWidth;
const height = window.innerHeight;

const newSceneButton = document.querySelector('#new-scene-button');
newSceneButton.addEventListener('click', () => { createMainScene(width, height) });

createMainScene(width, height);