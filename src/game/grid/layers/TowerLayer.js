import PIXI from 'pixi.js';
import Base from 'game/entities/Base';

export default class TowerLayer extends PIXI.Container {
  constructor(width, height, tileSize) {
    super();

    this.base = new Base();
    this.tileSize = tileSize;
    this.addBase(width, height);
  }

  /**
   * [addTower description]
   * @param {AbstractTower} tower
   * @param {Object} point x y
   */
  addTower(tower, point) {

    // TODO Trouver la case correspondante au X, Y passé en paramètre et addChild la Tower correspondante

  }

  addBase() {

  }
}
