import './style/main.styl';
import domready from 'domready';
import { on } from 'dom-event';
import Loader from './utils/Loader';
import Mediator from './utils/Mediator';
import Game from './game/Game';

const game = new Game(900, 500);

Loader.addTextures([
  { id: 'grass', path: '/assets/images/textures/grass.jpg' },
  { id: 'ennemy', path: '/assets/images/textures/ennemy.png' },
]);

domready(() => {
  console.log('Hello world!');
  game.appendTo(document.body);
  bindEvents();
});

function bindEvents() {
  const btnStart = document.querySelector('.ButtonStart');
  on(btnStart, 'click', startGame);

  const btnTowerList = document.querySelector('.add-tower');
  on(btnTowerList, 'click', function() {
    game.addTower();
  });

  const btnTower = document.querySelector('.tower');
  on(btnTower, 'click', function() {
    game.dragTower();
  });

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

function mousemoveHandler() {
  game.mousemove(event.clientX, event.clientY);
}
