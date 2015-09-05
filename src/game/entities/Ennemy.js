import AbstractEnnemy from '../AbstractEnnemy';
/**
 * Ennemy class
 * Weaker tower
 */
export default class Ennemy extends AbstractEnnemy {

  constructor(options) {

    console.log('Ennemy -> constructor');

    super({
      stats: {
        minAttack: 3,
        maxAttack: 4,
        precision: 0.7,
        life: 8,
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
