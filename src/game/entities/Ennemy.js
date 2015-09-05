import AbstractEnnemy from './AbstractEnnemy';
import { tileIsWalkable, tileSize } from 'utils/levelUtils';
import Loader from 'utils/Loader';

/**
 * Ennemy class
 * Weaker tower
 */
export default class Ennemy extends AbstractEnnemy {

  constructor(options) {

    console.log('Ennemy -> constructor');

    super({
      texture: Loader.getTexture('ennemy'),
      stats: {
        minAttack: 3,
        maxAttack: 4,
        precision: 0.7,
        life: 8,
      },
      id: options.id,
      currentTile: options.currentTile,
    });
    // TODO define side;
    this.side = options.side;
    this.direction = 'right';

    this.position.x = this.currentTile.x * tileSize;
    this.position.y = this.currentTile.y * tileSize;
  }

  update(elapsed) {
    this.findDirection();
    switch (this.direction) {
      case 'top':
        this.position.y -= this.velocity * elapsed;
        break;
      case 'bottom':
        this.position.y += this.velocity * elapsed;
        break;
      case 'right':
        this.position.x += this.velocity * elapsed;
        break;
      case 'left':
        this.position.x -= this.velocity * elapsed;
        break;
    }
  }

  findDirection() {
    if (tileIsWalkable(this.currentTile.x, this.currentTile.y - 1)) {
      this.direction = 'top';
    } else if (tileIsWalkable(this.currentTile.x, this.currentTile.y + 1)) {
      this.direction = 'bottom';
    } else if (tileIsWalkable(this.currentTile.x - 1, this.currentTile.y)) {
      this.direction = 'left';
    } else {
      this.direction = 'right';
    }
  }
}
