'use strict';

import './style/main.styl';
import domready from 'domready';
import {on} from 'dom-event';

import Mediator from './utils/Mediator';
import Game from './game/Game';

const game = new Game();

domready(() => {
  console.log('Hello world!');
  bindEvents();
});

function bindEvents () {
  let btnStart = document.querySelector('.ButtonStart');

  on(btnStart, 'click', startGame);
}

function startGame () {
  Mediator.emit('game:start');
  game.start();
}
