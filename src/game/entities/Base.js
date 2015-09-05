import PIXI from 'pixi.js';
import Loader from 'utils/Loader';
/**
 * Base class
 * Weaker tower
 */
export default class Base extends PIXI.Sprite {

  constructor(options) {

    super(Loader.getTexture('diver'));
    console.log('Base -> constructor');

    this.life = 20;

    // TODO define side
    //this.side = options.side;

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
