import AbstractTower from '../AbstractTower';
import Loader from 'utils/Loader';
/**
 * SecondInCommand class
 * Strong tower
 */
export default class SecondInCommand extends AbstractTower {

  constructor() {

    console.log('SecondInCommand -> constructor');

    super({
      stats: {
        attack: 16,
        precision: 0.7,
        cost: 19,
        radius: 2,
        maxTarget: -1,
        fireRate: 60,
      },
      id: 'second-in-command',
      texture: Loader.getTexture('secondInCommand'),
    });
  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
