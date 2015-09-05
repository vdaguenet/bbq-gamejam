import PIXI from 'pixi.js';
import Tile from './Tile';
import Loader from 'utils/Loader';

export default class Layer extends PIXI.Container {
  constructor(width, height, tileSize, level) {
    super();

    this.tileSize = tileSize;
    this.level = level;
    console.log(this.level);
    this.populate(width, height);
  }

  populate(width, height) {
    const nbCols = Math.floor(width / this.tileSize);
    const nbRaws = Math.floor(height / this.tileSize);

    for (let x = 0; x < nbCols; x++) {
      for (let y = 0; y < nbRaws; y++) {
        this.addChild(new Tile(x * this.tileSize, y * this.tileSize, Loader.getTexture(this.level.codes[this.level.tiles[y][x]])));
      }
    }
  }
}
