'use strict';

import bindAll from 'lodash.bindAll';
import Mediator from 'utils/Mediator';

export default class Game {
  constructor() {
    bindAll(this, 'start');

    console.log('Game - construct');

    Mediator.on('game:start', this.start);
  }

  start() {
    console.log('Game - start');
    alert('Let play together!!!!');
  }
}