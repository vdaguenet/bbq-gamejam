import PIXI from 'pixi.js';
import Tile from '../Tile';
import Loader from 'utils/Loader';

export default class TowerLayer extends PIXI.Container {
  constructor(width, height, tileSize) {
    super();
    console.log('towerLayer');
    this.tileSize = tileSize;
    this.populate(width, height);
  }

  populate(width, height) {
    const nbCols = Math.floor(width / this.tileSize);
    const cols = Math.floor(nbCols / 3);
    const nbRaws = Math.floor(height / this.tileSize);
    const raws = Math.floor(nbRaws / 3);

    for (let x = cols; x < nbCols - cols; x++) {
      for (let y = raws; y < nbRaws - raws; y++) {
        this.addChild(new Tile(x * this.tileSize, y * this.tileSize, Loader.getTexture('ennemy')));
      }
    }
  }
}
