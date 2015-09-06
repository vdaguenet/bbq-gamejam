import AbstractTower from '../AbstractTower';
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
        textures: {
          up: 'diver_up',
          right: 'diver_right',
          down: 'diver_down',
          left: 'diver_left',
        },
      },
      id: 'diver',
      texture: 'diver_down',
    });
  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
