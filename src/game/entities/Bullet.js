/**
 * Bullet class
 */
export default class Bullet {
  constructor(x, y, vector) {
    console.log('Bullet fired');

    this.x = x;
    this.y = y;
    this.vector = vector;
    this.deletable = false;
  }

  update() {
      // TODO follow the vector
      // TODO turn deletable to true if bullet pass through screen edges
  }
}
