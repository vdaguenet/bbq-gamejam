import './style/main.styl';
import domready from 'domready';
import { on } from 'dom-event';
import Loader from './utils/Loader';
import Mediator from './utils/Mediator';

import Game from './game/Game';
// const game = new Game();
// Game.appendTo(document.body);

Loader.addTextures([
  { id: 'diver', path: '/assets/images/textures/plongeurHead_front.png' },
  { id: 'commis', path: '/assets/images/textures/test.jpg' },
  { id: 'masterChef', path: '/assets/images/textures/sousChef_front.png' },
  { id: 'secondInCommand', path: '/assets/images/textures/test.jpg' },
  { id: 'chef', path: '/assets/images/textures/chef_front.png' },
  { id: 'base', path: '/assets/images/textures/base.png' },
  { id: 'square', path: '/assets/images/textures/square.png' },
  { id: 'squareDeco', path: '/assets/images/textures/squareDeco.png' },
  { id: 'path', path: '/assets/images/textures/path.png' },
  { id: 'ennemy_front', path: '/assets/images/textures/ennemy_front.png' },
  { id: 'ennemy_back', path: '/assets/images/textures/ennemy_back.png' },
  { id: 'ennemy_right', path: '/assets/images/textures/ennemy_right.png' },
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
