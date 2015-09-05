import bindAll from 'lodash.bindAll';
import raf from 'raf';
import Player from './Player';

export default class Game {
  constructor() {
    bindAll(this, 'update');

    console.log('Game - construct');

    this.player;
  }

  createPlayer(pseudo){
    this.player = new Player(pseudo);
  }

  start(pseudo) {
    console.log('Game - start');
    console.log("Let's go " + pseudo);

    // TODO: init the game
    this.createPlayer(pseudo);
    this.update();
  }

  update() {
    raf(this.update);

    // TODO: update all the entities

    this.render();
  }

  render() {
    // TODO: render all the things
  }
}
