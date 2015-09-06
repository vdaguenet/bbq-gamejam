import AbstractTower from '../AbstractTower';
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
        textures: {
          up: 'commis_up',
          right: 'commis_right',
          down: 'commis_down',
          left: 'commis_left',
        },
      },
      id: 'commis-chef',
      texture: 'commis_down',
    });

  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
