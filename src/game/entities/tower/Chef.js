import AbstractTower from '../AbstractTower';
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
        textures: {
          up: 'chef_up',
          right: 'chef_right',
          down: 'chef_down',
          left: 'chef_left',
        },
      },
      id: options.id,
      texture: 'chef_down',
    });
    // TODO define side
    this.side = options.side;

  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
