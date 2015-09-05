import AbstractTower from '../AbstractTower';
/**
 * CommisChef class
 * Weaker tower
 */
export default class CommisChef extends AbstractTower {

  constructor(options) {

    console.log('CommisChef -> constructor');

    super({
      stats: {
        attack: 4,
        precision: 0.7,
        cost: 8,
        radius: 1,
        maxTarget: 1,
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
