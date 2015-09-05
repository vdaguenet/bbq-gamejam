import AbstractEnnemy from './AbstractEnnemy';
import { tileIsWalkable, tileSize } from 'utils/levelUtils';
import Loader from 'utils/Loader';

/**
 * Ennemy class
 * Weaker tower
 */
export default class Ennemy extends AbstractEnnemy {

  constructor(options) {
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
    this.velocity = 10;
    this.side = options.side;
    this.direction = 'right';
    this.position.x = this.currentTile.x * tileSize;
    this.position.y = this.currentTile.y * tileSize;
  }

  update(elapsed) {
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
    default:
      this.fight();
    }

    if (this.direction === '') return;

    if (this.position.x > (this.currentTile.x * tileSize + tileSize)) {
      this.currentTile.x++;
      this.findDirection();
    }

    if (this.position.y < (this.currentTile.y * tileSize - tileSize)) {
      this.currentTile.y--;
      this.findDirection();
    }

    if (this.position.y > (this.currentTile.y * tileSize + tileSize)) {
      this.currentTile.y++;
      this.findDirection();
    }
  }

  findDirection() {
    if (this.direction !== 'bottom' && tileIsWalkable(this.currentTile.x, this.currentTile.y - 1)) {
      this.direction = 'top';
      return;
    }

    if (this.direction !== 'top' && tileIsWalkable(this.currentTile.x, this.currentTile.y + 1)) {
      this.direction = 'bottom';
      return;
    }

    if (tileIsWalkable(this.currentTile.x + 1, this.currentTile.y)) {
      this.direction = 'right';
      return;
    }

    this.direction = '';
  }

  fight() {
    console.log('Enemy - fight');
  }
}
