import AbstractTower from '../AbstractTower';
/**
 * SecondInCommand class
 * Strong tower
 */
export default class SecondInCommand extends AbstractTower {

  constructor() {
    super({
      stats: {
        attack: 16,
        precision: 0.7,
        cost: 19,
        radius: 2,
        maxTarget: -1,
        fireRate: 1000,
      },
      id: 'second-in-command',
      textures: {
        up: 'sousChef_back',
        down: 'sousChef_front',
        left: 'sousChef_left',
        right: 'sousChef_right',
        ammo: 'sousChef_bean',
      },
    });

    this.anchor.set(0, 0.52);
  }

}
