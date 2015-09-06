import AbstractTower from '../AbstractTower';
import Loader from 'utils/Loader';
/**
 * MasterChef class
 * Master tower
 */
export default class MasterChef extends AbstractTower {

  constructor(options) {

    console.log('MasterChef -> constructor');

    super({
      stats: {
        attack: 32,
        precision: 0.7,
        cost: 26,
        distAttack: 3,
        radius: 1,
        maxTarget: -1,
        fireRate: 60,
      },
      id: 'master-chef',
      texture: Loader.getTexture('masterChef'),
    });

  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
