import bindAll from 'lodash.bindAll';
import raf from 'raf';
import Diver from './entities/tower/Diver';

export default class Game {
  constructor() {
    bindAll(this, 'update');

    console.log('Game - construct');
  }

  start() {
    console.log('Game - start');

    this.diver = new Diver('veggie');
    // TODO: init the game

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
