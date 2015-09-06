import './style/main.styl';
import domready from 'domready';
import { on } from 'dom-event';
import Loader from './utils/Loader';
import Mediator from './utils/Mediator';

import Game from './game/Game';

Loader.addTextures([
  // Diver
  { id: 'diver_bottom_front', path: '/assets/images/textures/diver_bottom_front.png' },
  { id: 'diver_bottom_back', path: '/assets/images/textures/diver_bottom_back.png' },
  { id: 'diver_bottom_left', path: '/assets/images/textures/diver_bottom_left.png' },
  { id: 'diver_bottom_right', path: '/assets/images/textures/diver_bottom_right.png' },
  { id: 'diver_head_front', path: '/assets/images/textures/diver_head_front.png' },
  { id: 'diver_head_back', path: '/assets/images/textures/diver_head_back.png' },
  { id: 'diver_head_left', path: '/assets/images/textures/diver_head_left.png' },
  { id: 'diver_head_right', path: '/assets/images/textures/diver_head_right.png' },
  // Chef
  { id: 'chef_front', path: '/assets/images/textures/chef_front.png' },
  { id: 'chef_back', path: '/assets/images/textures/chef_back.png' },
  { id: 'chef_left', path: '/assets/images/textures/chef_left.png' },
  { id: 'chef_right', path: '/assets/images/textures/chef_right.png' },
  // Second in Command
  { id: 'sousChef_front', path: '/assets/images/textures/sousChef_front.png' },
  { id: 'sousChef_back', path: '/assets/images/textures/sousChef_back.png' },
  { id: 'sousChef_left', path: '/assets/images/textures/sousChef_left.png' },
  { id: 'sousChef_right', path: '/assets/images/textures/sousChef_right.png' },
  // Master Chef
  { id: 'masterChef_front', path: '/assets/images/textures/masterChef_front.png' },
  { id: 'masterChef_back', path: '/assets/images/textures/masterChef_back.png' },
  { id: 'masterChef_left', path: '/assets/images/textures/masterChef_left.png' },
  { id: 'masterChef_right', path: '/assets/images/textures/masterChef_right.png' },
  // Ammos
  { id: 'masterChef_seed', path: '/assets/images/textures/masterChef_seed.png' },
  { id: 'sousChef_bean', path: '/assets/images/textures/sousChef_bean.png' },
  { id: 'diver_washer', path: '/assets/images/textures/diver_washer.png' },
  // Base
  { id: 'base', path: '/assets/images/textures/base.png' },
  // Ennemy
  { id: 'ennemy_front', path: '/assets/images/textures/ennemy_front.png' },
  { id: 'ennemy_back', path: '/assets/images/textures/ennemy_back.png' },
  { id: 'ennemy_right', path: '/assets/images/textures/ennemy_right.png' },
  // Grid
  { id: 'square', path: '/assets/images/textures/square.png' },
  { id: 'squareDeco', path: '/assets/images/textures/squareDeco.png' },
  { id: 'path', path: '/assets/images/textures/path.png' },
]);

domready(() => {
  bindEvents();
});

function bindEvents() {
  const btnStart = document.querySelector('.button-start');
  const addTowerButtons = document.querySelectorAll('.tower');

  on(btnStart, 'click', startGame);
  [].forEach.call(addTowerButtons, (addButton) => {
    on(addButton, 'click', addTower);
  });

  Mediator.on('game:over', stopGame);

  Mediator.on('loader:complete', () => {
    Game.init();
  });
}

function startGame() {
  const stepOne = document.querySelector('.step-one');
  const stepTwo = document.querySelector('.step-two');

  stepOne.setAttribute('class', 'step step-one');
  stepTwo.setAttribute('class', 'step step-two active');

  Mediator.emit('game:start');
  Game.start();
}

function addTower() {
  Game.addTower(this);
}

function stopGame() {
  const endContainer = document.querySelector('.game-over-container');

  endContainer.className += ' active';
}
