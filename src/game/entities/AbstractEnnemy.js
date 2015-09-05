import PIXI from 'pixi.js';

/**
 * AbstractEnnemy class
 * Will be extended by each Ennemy
 */
export default class AbstractEnnemy extends PIXI.Sprite {

  constructor(options) {
    super(options.texture);

    /**
     * Stats object contain all stats of the instance Ennemy
     * @type {object} minAttack
     * @type {object} maxAttack
     * @type {number} precision
     * @type {number} life
     */
    this.stats = options.stats;
    this.currentTile = options.currentTile;
    this.id = options.id;
    this.deletable = false;
    this.velocity = 10;
  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

  // TODO Attack base

  // TODO Walk through path

}
