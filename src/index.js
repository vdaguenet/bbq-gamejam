import './style/main.styl';
import domready from 'domready';
import { on } from 'dom-event';
import Loader from './utils/Loader';
import Mediator from './utils/Mediator';

import game from './game/Game';
// const game = new Game();
game.appendTo(document.body);

Loader.addTextures([
  { id: 'grass', path: '/assets/images/textures/grass.jpg' },
  { id: 'ennemy', path: '/assets/images/textures/ennemy.png' },
]);

domready(() => {
  console.log('Hello world!');
  bindEvents();
});

function bindEvents() {
  const btnStart = document.querySelector('.ButtonStart');
  const btnTowerAdd = document.querySelector('.add-tower');

  on(btnStart, 'click', startGame);
  on(btnTowerAdd, 'click', addTower);
  on(document, 'mousemove', mousemoveHandler);

  Mediator.on('loader:complete', () => {
    game.init();
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
    game.start(pseudo.value);
  }
  else {
    pseudo.setAttribute('class', 'error');
    error.setAttribute('class', 'error-message active');
  }
}

function mousemoveHandler(event) {
  game.mousemove(event.clientX, event.clientY);
  game.moveTower(event.clientX, event.clientY);
}

function addTower() {
  game.addTower();
  const btnTower = document.querySelector('.tower');
  on(btnTower, 'click', dragTower);
}

function dragTower() {
  game.dragTower();
}
