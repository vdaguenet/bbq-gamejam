import PIXI from 'pixi.js';
// import bindAll from 'lodash.bindAll';
import Bullet from './Bullet';

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
    this.bullets = [];
    this.vector = options.vector || { x: 0, y: 0 };
    this.lastFire = 0;

  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));

    this.applyAttack(this.currentTargets);
    this.deleteOldBullets();
  }

  beforeAttack(target) {
    if (this.currentTargets.length >= this.stats.maxTarget) {
      return false;
    }

    this.currentTargets.push(target);
  }

  attack(target, vector) {
    if (Math.random < this.stats.precision) {
      target.hp -= this.stats.attack;
      this.addBullet(target.position, vector);
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
      this.vector = this.getVector(target);
      this.attack(target, this.vector);
      this.afterAttack(target);
    }
  }

  addBullet(vector) {
    if (Date.now() - this.lastFire > this.fireRate &&
      Math.random() < this.precision) {
      // TODO setup the shot with the precision parameter
      this.bullets.push(new Bullet(this.x, this.y, vector));

      this.lastFire = Date.now();
    }
  }

  deleteOldBullets() {
    this.bullets = this.bullets.filter((bullets) => {
      return !bullets.deletable;
    });
  }

  getDistance(target) {
    const x = (target.x + target.width / 2) - this.position.x;
    const y = (target.y + target.height / 2) - this.position.y;

    return Math.sqrt(x * x + y * y);
  }

  getVector(target) {
    const x = (target.x + target.width / 2) - this.position.x;
    const y = (target.y + target.height / 2) - this.position.y;

    const length = this.getDistance(target);

    return { 'x': x / length, 'y': y / length };
  }

}
