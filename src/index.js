import './style/main.styl';
import domready from 'domready';
import { on } from 'dom-event';

import Mediator from './utils/Mediator';
import Game from './game/Game';

const game = new Game();

domready(() => {
	console.log('Hello world!');
	bindEvents();
});

function bindEvents() {
	const btnStart = document.querySelector('.ButtonStart');

	on(btnStart, 'click', startGame);
}

function startGame() {
	let pseudo = document.getElementById('pseudo').value;

	if (pseudo.length > 0) {
		Mediator.emit('game:start');
		game.start(pseudo);
	} else {
		alert('Sans pseudo, jouer, tu ne peux...')
	}
}