'use strict';

import bindAll from 'lodash.bindAll';
import raf from 'raf';

export default class Game {
  constructor() {
    bindAll(this, 'update');

    console.log('Game - construct');
  }

  start() {
    console.log('Game - start');

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
