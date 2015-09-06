import AbstractTower from '../AbstractTower';
/**
 * MasterChef class
 * Master tower
 */
export default class MasterChef extends AbstractTower {

  constructor() {

    console.log('MasterChef -> constructor');

    super({
      stats: {
        attack: 32,
        precision: 0.7,
        cost: 26,
        distAttack: 3,
        radius: 1,
        maxTarget: -1,
        fireRate: 2000,
      },
      id: 'master-chef',
      textures: {
        up: 'masterChef_back',
        down: 'masterChef_front',
        left: 'masterChef_left',
        right: 'masterChef_right',
        ammo: 'masterChef_seed',
      },
    });

    this.anchor.set(0, 0.2);

  }

}
