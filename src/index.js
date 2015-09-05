import './style/main.styl';
import domready from 'domready';
import { on } from 'dom-event';
import Loader from './utils/Loader';
import Mediator from './utils/Mediator';
import Game from './game/Game';

const game = new Game(900, 500);

Loader.addTextures([
  { id: 'grass', path: '/assets/images/textures/grass.jpg' }
]);

domready(() => {
  console.log('Hello world!');
  game.appendTo(document.body);
  bindEvents();
});

function bindEvents() {
  const btnStart = document.querySelector('.ButtonStart');

  on(btnStart, 'click', startGame);

  Mediator.on('loader:complete', () => {
    game.init();
  });
}

function startGame() {
  Mediator.emit('game:start');
  game.start();
}
