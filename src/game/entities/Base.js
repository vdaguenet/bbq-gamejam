/**
 * Base class
 * Weaker tower
 */
export default class Base {

  constructor(options) {

    console.log('Base -> constructor');

    this.life : 20;

    // TODO define side;
    this.side = options.side;

  }

  update() {
    console.warn('You should override update method on', Object.getPrototypeOf(this));
  }

}
