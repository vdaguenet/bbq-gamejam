import PIXI from 'pixi.js';
import Loader from 'utils/Loader';
import LifeBar from 'game/LifeBar';
import Game from 'game/Game';
import Mediator from 'utils/Mediator';

/**
 * Base class
 * Weaker tower
 */
export default class Base extends PIXI.Sprite {

  constructor() {
    super(Loader.getTexture('base'));

    this.tileSize = 50;

    this.x = 16 * this.tileSize;
    this.y = 3 * this.tileSize;
    this.anchor = new PIXI.Point(0, 0);

    this.life = 100;

    this.lifeBar = new LifeBar(this.life);
    this.lifeBar.position.x = 25;
    this.lifeBar.position.y = 30;
    this.addChild(this.lifeBar);
  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

  endureDamages(value) {
    this.life -= value;

    if (this.life <= 0) {
      Mediator.emit('game:over');
      Game.stop();
    }

    this.lifeBar.update(this.life);
  }

}
