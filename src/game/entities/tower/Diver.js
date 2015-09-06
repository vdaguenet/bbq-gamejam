import AbstractTower from '../AbstractTower';
import Loader from 'utils/Loader';
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
      texture: Loader.getTexture('diver'),
    });
  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
