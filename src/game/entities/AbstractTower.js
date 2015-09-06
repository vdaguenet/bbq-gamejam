import PIXI from 'pixi.js';
// import bindAll from 'lodash.bindAll';
import Bullet from './Bullet';
import Loader from 'utils/Loader';

/**
 * AbstractTower class
 * Will be extended by each Tower
 */
export default class AbstractTower extends PIXI.Sprite {

  constructor(options) {

    super(options.texture);
    /**
     * Stats object contain all stats of the instance Tower
     * @type {number} attack
     * @type {number} precision
     * @type {number} cost
     * @type {number} distAttack
     * @type {number} radius
     * @type {number} maxTarget
     * @type {number} fireRate
     * @type {object} textures
     */
    this.stats = options.stats;

    this.id = options.id;
    this.currentTargets = [];
    this.bullets = [];
    this.vector = options.vector || { x: 0, y: 0 };
    this.lastFire = 0;
    this.textures = {
      up: Loader.getTexture(options.stats.textures.up),
      right: Loader.getTexture(options.stats.textures.right),
      down: Loader.getTexture(options.stats.textures.down),
      left: Loader.getTexture(options.stats.textures.left),
    };
    this.texture = Loader.getTexture(this.stats.textures.down);

  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));

    this.rotateTower(this.currentTargets);
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
    if (Date.now() - this.lastFire > this.stats.fireRate) {
      this.bullets.push(new Bullet(this.x, this.y, vector));

      this.lastFire = Date.now();
    }
  }

  deleteOldBullets() {
    this.bullets = this.bullets.filter((bullets) => {
      return !bullets.deletable;
    });
  }

  rotateTower(target) {
    const angle = Math.atan2(target.y - this.y, target.x - this.x);

    if (angle >= Math.PI / 4 && angle < 3 * Math.PI / 4) {
      this.texture = Loader.getTexture(this.stats.textures.up);
      return;
    }

    if (angle >= 3 * Math.PI / 4 && angle < 5 * Math.PI / 4) {
      this.texture = Loader.getTexture(this.stats.textures.left);
      return;
    }

    if (angle >= 5 * Math.PI / 4 && angle < 7 * Math.PI / 4) {
      this.texture = Loader.getTexture(this.stats.textures.down);
      return;
    }

    if (angle >= 7 * Math.PI / 4 && angle < Math.PI / 4) {
      this.texture = Loader.getTexture(this.stats.textures.right);
      return;
    }
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
