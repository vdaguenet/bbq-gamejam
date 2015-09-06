import PIXI from 'pixi.js';
import Base from 'game/entities/Base';
import { on, off } from 'dom-event';
import Game from 'game/Game';
import Player from 'game/Player';
import { tileSize, findNearestTile } from 'utils/levelUtils';
import bindAll from 'lodash.bindAll';

export default class TowerLayer extends PIXI.Container {
  constructor() {
    super();

    bindAll(this, 'onMouseMove', 'placeTower');

    this.base = new Base();
    this.addBase();
    this.towers = [];
    this.movingTower;
  }

  /**
   * [addTower description]
   * @param {[type]} tower [description]
   */
  addTower(tower) {
    this.movingTower = tower;

    on(Game.renderer.view, 'mousemove', this.onMouseMove);
    on(Game.renderer.view, 'click', this.placeTower);
  }

  placeTower(e) {
    const xPosition = e.clientX - Game.renderer.view.getBoundingClientRect().left;
    const yPosition = e.clientY - Game.renderer.view.getBoundingClientRect().top;
    const nearestTile = findNearestTile(xPosition, yPosition);

    if (nearestTile === false) {
      off(Game.renderer.view, 'mousemove', this.onMouseMove);
      off(Game.renderer.view, 'click', this.placeTower);
      this.movingTower = null;

      return;
    }

    this.movingTower.position.x = nearestTile.x * tileSize;
    this.movingTower.position.y = nearestTile.y * tileSize;

    this.addChild(this.movingTower);

    Player.removeCash(this.movingTower.stats.cost);

    off(Game.renderer.view, 'mousemove', this.onMouseMove);
    off(Game.renderer.view, 'click', this.placeTower);
    this.movingTower = null;
  }

  addBase() {
    this.addChild(this.base);
  }

  getBase() {
    return this.base;
  }

  onMouseMove(e) {
    this.movingTower.position.x = e.x - (this.movingTower.width / 2);
    this.movingTower.position.y = e.y - (this.movingTower.height / 2);
  }
}
