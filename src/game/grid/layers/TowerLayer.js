import PIXI from 'pixi.js';
import Tile from '../tile/Tile';
import Loader from 'utils/Loader';

export default class TowerLayer extends PIXI.Container {
  constructor(width, height, tileSize) {
    super();

    this.tileSize = tileSize;
    // this.populate(width, height);
  }

  addTower(x, y) {

    // TODO Trouver la case correspondante au X, Y passé en paramètre et addChild la Tower correspondante

  }
}
