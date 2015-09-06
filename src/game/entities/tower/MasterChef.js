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
        fireRate: 60,
        textures: {
          up: 'masterChef_up',
          right: 'masterChef_right',
          down: 'masterChef_down',
          left: 'masterChef_left',
        },
      },
      id: 'master-chef',
      texture: 'masterChef_down',
    });

  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
