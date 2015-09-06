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
      textures: {
        up: 'diver_bottom_back',
        down: 'diver_bottom_front',
        left: 'diver_bottom_left',
        right: 'diver_bottom_right',
      },
    });

    this.head = new PIXI.Sprite(Loader.getTexture('diver_head_front'));
    this.head.anchor.set(-0.20, 0.50);
    this.addChild(this.head);

    this.anchor.set(-0.2, 0.5);

  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

  turnleft() {
    this.head.anchor.set(-0.20, 0.50);
  }

  turnRight() {
    this.head.anchor.set(-0.20, 0.50);
  }

  turnUp() {
    this.head.anchor.set(-0.18, 0.50);
  }

  turnDown() {
    this.head.anchor.set(-0.18, 0.50);
  }

}
