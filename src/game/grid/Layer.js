import PIXI from 'pixi.js';
import Tile from './Tile';
import Loader from 'utils/Loader';
import {getTextureCode, tileSize} from 'utils/levelUtils';

export default class Layer extends PIXI.Container {
  constructor(width, height, level) {
    super();

    this.level = level;
    this.populate(width, height);
  }

  populate(width, height) {
    const nbCols = Math.floor(width / tileSize);
    const nbRaws = Math.floor(height / tileSize);

    for (let x = 0; x < nbCols; x++) {
      for (let y = 0; y < nbRaws; y++) {
        this.addChild(new Tile(
          x * tileSize,
          y * tileSize,
          Loader.getTexture(getTextureCode(x, y))
          )
        );
      }
    }
  }
}
