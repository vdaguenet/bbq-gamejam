import AbstractTower from '../AbstractTower';
import Loader from 'utils/Loader';
/**
 * CommisChef class
 * Weaker tower
 */
export default class CommisChef extends AbstractTower {

  constructor() {

    console.log('CommisChef -> constructor');

    super({
      stats: {
        attack: 4,
        precision: 0.7,
        cost: 8,
        radius: 1,
        maxTarget: 1,
        fireRate: 60,
      },
      id: 'commis-chef',
      texture: Loader.getTexture('commis'),
    });

  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
