import AbstractTower from '../AbstractTower';
import Loader from 'utils/Loader';
/**
 * Chef class
 * Medium tower
 */
export default class Chef extends AbstractTower {

  constructor(options) {

    console.log('Chef -> constructor');

    super({
      stats: {
        attack: 8,
        precision: 0.7,
        cost: 12,
        radius: 1,
        maxTarget: 2,
        fireRate: 60,
      },
      id: options.id,
      texture: Loader.getTexture('chef'),
    });
    // TODO define side
    this.side = options.side;

  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
