/**
 * AbstractEnnemy class
 * Will be extended by each Ennemy
 */
export default class AbstractEnnemy {

  constructor(options) {

    /**
     * Stats object contain all stats of the instance Ennemy
     * @type {object} minAttack
     * @type {object} maxAttack
     * @type {number} precision
     * @type {number} life
     */
    this.stats = options.stats;
    this.currentTile = undefined;
    this.id = options.id;
    this.position = options.position || { x: 0, y: 0 };
  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

  // TODO Attack base

  // TODO Walk through path

}
