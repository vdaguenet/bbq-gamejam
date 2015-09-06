import PIXI from 'pixi.js';
import LifeBar from 'game/LifeBar';

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
    this.target = options.target;
    this.id = options.id;
    this.deletable = false;
    this.velocity = 0;

    this.lifeBar = new LifeBar(this.stats.life);
    this.lifeBar.position.y = -35;
    this.addChild(this.lifeBar);
  }

  fight() {
    console.log('Enemy - fight');

    const randPreci = Math.random();
    if (randPreci <= this.stats.precision) {
      const valueFight = Math.random() * (this.stats.maxAttack - this.stats.minAttack) + this.stats.minAttack;
      this.target.endureDamages(valueFight);
    }
  }

  endureDamages(damage) {
    this.stats.life -= damage;

    if (this.stats.life <= 0) {
      this.die();
      return;
    }

    this.lifeBar.update(this.stats.life);
  }

  die() {
    this.deletable = true;
  }

}
