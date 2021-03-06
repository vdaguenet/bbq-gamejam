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

    super(Loader.getTexture(options.textures.down));
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
      up: Loader.getTexture(options.textures.up),
      right: Loader.getTexture(options.textures.right),
      down: Loader.getTexture(options.textures.down),
      left: Loader.getTexture(options.textures.left),
      ammo: Loader.getTexture(options.textures.ammo),
    };
    // this.texture = this.textures.right;

  }

  update() {
    // console.warn('You should override update method on', Object.getPrototypeOf(this));
    this.rotateTower(this.currentTargets[0]);
    this.applyAttack(this.currentTargets[0]);
    this.deleteOldBullets();
  }

  beforeAttack(target) {
    if (this.currentTargets.length >= this.stats.maxTarget) {
      return false;
    }

    this.currentTargets.push(target);
  }

  attack(target, vector) {
    if (Math.random() < this.stats.precision) {
      target.endureDamages(this.stats.attack);
      this.addBullet(vector);
    }
    else {
      console.log('Miss');
    }
  }

  afterAttack(target) {
    this.currentTargets = this.currentTargets.splice(this.currentTargets.indexOf(target), 1);
  }

  applyAttack(target) {
    this.vector = this.getVector(target);
    this.attack(target, this.vector);
    this.afterAttack(target);
  }

  addBullet(vector) {
    if (Date.now() - this.lastFire > this.stats.fireRate) {
      this.bullets.push(new Bullet(this.x, this.y, vector, this.textures.ammo));

      this.lastFire = Date.now();
    }
  }

  deleteOldBullets() {
    this.bullets = this.bullets.filter((bullets) => {
      return !bullets.deletable;
    });
  }

  rotateTower(target) {
    let angle = Math.atan2(target.y - this.y, target.x - this.x);
    if (angle < 0) {
      angle += 2 * Math.PI;
    }

    if (angle >= Math.PI / 4 && angle < 3 * Math.PI / 4) {
      this.texture = this.textures.down;
      return;
    }

    if (angle >= 3 * Math.PI / 4 && angle < 5 * Math.PI / 4) {
      this.texture = this.textures.left;
      return;
    }

    if (angle >= 5 * Math.PI / 4 && angle < 7 * Math.PI / 4) {
      this.texture = this.textures.up;
      return;
    }

    if (angle >= 7 * Math.PI / 4) {
      this.texture = this.textures.right;
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
