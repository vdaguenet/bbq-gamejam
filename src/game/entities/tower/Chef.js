import AbstractTower from '../AbstractTower';
/**
 * Chef class
 * Medium tower
 */
export default class Chef extends AbstractTower {

  constructor() {

    console.log('Chef -> constructor');

    super({
      stats: {
        attack: 8,
        precision: 0.7,
        cost: 12,
        radius: 1,
        maxTarget: 2,
        fireRate: 1000,
      },
      id: 'chef',
      textures: {
        up: 'chef_back',
        down: 'chef_front',
        left: 'chef_left',
        right: 'chef_right',
        ammo: '',
      },
    });

    this.anchor.set(0, 0.45);
  }

}
