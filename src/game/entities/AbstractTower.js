/**
 * AbstractTower class
 * Will be extended by each Tower
 */
export default class AbstractTower {

  constructor(options) {

    /**
     * Stats object contain all stats of the instance Tower
     * @type {object} attack
     * @type {number} precision
     * @type {number} cost
     * @type {number} radius
     * @type {number} maxTarget
     */
    this.id = options.id;
    this.stats = options.stats;
    this.currentTarget = [];
    this.position = options.position || { x: 0, y: 0 };
  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

  attack(target) {

    if (this.currentTarget.length >= this.stats.maxTarget) {
      return;
    }

    this.currentTarget.push(target);

    if (Math.random < this.stats.precision) {
      target.hp -= this.stats.attack;
    }
    else {
      console.log('Miss');
    }

  }
}
