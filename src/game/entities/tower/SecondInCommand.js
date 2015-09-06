import AbstractTower from '../AbstractTower';
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
        textures: {
          up: 'secondInCommand_up',
          right: 'secondInCommand_right',
          down: 'secondInCommand_down',
          left: 'secondInCommand_left',
        },
      },
      id: 'second-in-command',
      texture: 'secondInCommand_down',
    });
  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
