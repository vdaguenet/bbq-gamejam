import AbstractTower from '../AbstractTower';
import Loader from 'utils/Loader';
import PIXI from 'pixi.js';
/**
 * Diver class
 * Weaker tower
 */
export default class Diver extends AbstractTower {

  constructor() {

    console.log('Diver -> constructor');

    super({
      stats: {
        attack: 2,
        precision: 0.7,
        cost: 5,
        radius: 1,
        maxTarget: 1,
        fireRate: 60,
      },
      id: 'diver',
      texture: Loader.getTexture('diver_bottom_left'),
    });

    this.head = new PIXI.Sprite(Loader.getTexture('diver_head_left'));
    this.head.anchor.set(-0.3, 0.5);
    this.addChild(this.head);

    this.anchor.set(-0.3, 0.5);
  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
