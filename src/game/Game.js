import bindAll from 'lodash.bindAll';
import raf from 'raf';
<<<<<<< HEAD
import Diver from './entities/tower/Diver';
=======
import Player from './Player';
import PIXI from 'pixi.js';
>>>>>>> a412e3c2e10bb21ea95f833e08ee36a5e7b54095

export default class Game {
  constructor(width, height) {
    bindAll(this, 'update');
    console.log('Game - construct');

    this.player;
    this.width = width;
    this.height = height;
    this.renderer = PIXI.autoDetectRenderer(width, height, {
      backgroundColor: 0x1099bb,
    });
    this.stage = new PIXI.Container();
  }

  createPlayer(pseudo){
    this.player = new Player(pseudo);
  }

  start(pseudo) {
    console.log('Game - start');
    console.log("Let's go " + pseudo);

    this.diver = new Diver('veggie');
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
