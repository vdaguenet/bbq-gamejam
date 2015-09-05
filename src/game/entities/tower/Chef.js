import AbstractTower from '../AbstractTower';
/**
 * Chef class
 * Weaker tower
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
      },
      id: options,
    });
    // TODO define side;
    this.side = options.side;

  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
