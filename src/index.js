import './style/main.styl';
import domready from 'domready';
import { on } from 'dom-event';
import Loader from './utils/Loader';
import Mediator from './utils/Mediator';

import Game from './game/Game';
// const game = new Game();
Game.appendTo(document.body);

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
  // Master Chef
  { id: 'masterChef', path: '/assets/images/textures/sousChef_front.png' },
  // Second in Command
  { id: 'secondInCommand', path: '/assets/images/textures/test.jpg' },
  // Chef
  { id: 'chef_back', path: '/assets/images/textures/chef_back.png' },
  { id: 'chef_right', path: '/assets/images/textures/chef_right.png' },
  { id: 'chef_left', path: '/assets/images/textures/chef_left.png' },
  { id: 'chef_front', path: '/assets/images/textures/chef_front.png' },
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
  console.log('Hello world!');
  bindEvents();
});

function bindEvents() {
  const btnStart = document.querySelector('.ButtonStart');
  const addTowerButtons = document.querySelectorAll('.tower');

  on(btnStart, 'click', startGame);
  [].forEach.call(addTowerButtons, (addButton) => {
    on(addButton, 'click', addTower);
  });

  Mediator.on('loader:complete', () => {
    Game.init();
  });
}

function startGame() {
  const pseudo = document.getElementById('pseudo');
  const error = document.querySelector('.error-message');
  const stepOne = document.querySelector('.step-one');
  const stepTwo = document.querySelector('.step-two');

  if (pseudo.value.length > 0) {
    pseudo.setAttribute('class', '');
    error.setAttribute('class', 'error-message');
    Mediator.emit('game:start');
    stepOne.setAttribute('class', 'step-one');
    stepTwo.setAttribute('class', 'step-two active');
    Game.start(pseudo.value);
  }
  else {
    pseudo.setAttribute('class', 'error');
    error.setAttribute('class', 'error-message active');
  }
}

function addTower() {
  Game.addTower(this);
}
