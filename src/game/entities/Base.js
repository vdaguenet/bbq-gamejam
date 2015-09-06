import PIXI from 'pixi.js';
import Loader from 'utils/Loader';
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
    console.log('Base -> constructor');

    this.life = 20;

    // TODO define side
    // this.side = options.side;
  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

  set life(value) {
    if (value < 0) {
      // TODO emit game over
      console.log('Game Over');
    }
  }

}
