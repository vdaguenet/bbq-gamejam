import Game from '../Game';
import PIXI from 'pixi.js';
import Loader from 'utils/Loader';
/**
 * Bullet class
 */
export default class Bullet extends PIXI.Sprite {
  constructor(x, y, vector, texture) {
    super(Loader.getTexture(texture));
    console.log('Bullet fired');

    this.x = x;
    this.y = y;
    this.vector = vector;
    this.deletable = false;
  }

  update() {
    this.x += this.vector.x;
    this.y += this.vector.y;
    this.checkOffScreenPosition();
  }

  checkOffScreenPosition() {
    if (this.x < 0 || this.x > Game.width ||
      this.y < 0 || this.y > Game.width) {
      this.deletable = true;
    }
  }
}
