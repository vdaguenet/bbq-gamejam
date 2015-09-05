import bindAll from 'lodash.bindAll';
import raf from 'raf';
import PIXI from 'pixi.js';

export default class Game {
  constructor(width, height) {
    bindAll(this, 'update');

    console.log('Game - construct');

    this.width = width;
    this.width = height;
    this.renderer = PIXI.autoDetectRenderer(width, height, {
      backgroundColor: 0x1099bb,
    });
    this.stage = new PIXI.Container();
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
    this.renderer.render(this.stage);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;

    this.renderer.resize(width, height);
  }

  addElement(element) {
    this.stage.addChild(element);
  }

  appendTo($el) {
    $el.appendChild(this.renderer.view);
  }
}
