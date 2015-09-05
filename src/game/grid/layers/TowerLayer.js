import PIXI from 'pixi.js';
import Loader from 'utils/Loader';

export default class TowerLayer extends PIXI.Container {
  constructor(width, height, tileSize) {
    super();

    this.tileSize = tileSize;
    // this.populate(width, height);
  }

  /**
   * [addTower description]
   * @param {AbstractTower} tower
   * @param {Object} point x y
   */
  addTower(tower, point) {

    // TODO Trouver la case correspondante au X, Y passé en paramètre et addChild la Tower correspondante

  }
}
