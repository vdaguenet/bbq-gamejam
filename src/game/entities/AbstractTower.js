import PIXI from 'pixi.js';
// import bindAll from 'lodash.bindAll';
/**
 * AbstractTower class
 * Will be extended by each Tower
 */
export default class AbstractTower extends PIXI.Sprite {

  constructor(options) {

    super();
    /**
     * Stats object contain all stats of the instance Tower
     * @type {object} attack
     * @type {number} precision
     * @type {number} cost
     * @type {number} radius
     * @type {number} maxTarget
     */
    this.stats = options.stats;

    this.id = options.id;
    this.currentTargets = [];
    this.position = options.position || { x: 0, y: 0 };
  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

  beforeAttack(target) {
    if (this.currentTargets.length >= this.stats.maxTarget) {
      return false;
    }

    this.currentTargets.push(target);
  }

  attack(target) {
    if (Math.random < this.stats.precision) {
      target.hp -= this.stats.attack;
    }
    else {
      console.log('Miss');
    }
  }

  afterAttack(target) {
    this.currentTargets = this.currentTargets.splice(this.currentTargets.indexOf(target), 1);
  }

  applyAttack(target) {
    if (this.beforeAttack(target)) {
      this.attack(target);
      this.afterAttack(target);
    }
  }

}
