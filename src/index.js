import './style/main.styl';
import domready from 'domready';
import { on } from 'dom-event';

import Mediator from './utils/Mediator';
import Game from './game/Game';

const game = new Game(900, 500);

domready(() => {
  console.log('Hello world!');
  game.appendTo(document.body);
  bindEvents();
});

function bindEvents() {
  const btnStart = document.querySelector('.ButtonStart');
  on(btnStart, 'click', startGame);
}

function startGame() {
  const pseudo = document.getElementById('pseudo');
  const error = document.querySelector('.error-message');

  if (pseudo.value.length > 0) {
	pseudo.setAttribute('class', '');
    error.setAttribute('class', 'error-message');
    Mediator.emit('game:start');
    game.start(pseudo.value);
  }
  else {
    pseudo.setAttribute('class', 'error');
    error.setAttribute('class', 'error-message active');
  }
}
