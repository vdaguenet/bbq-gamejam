import PIXI from 'pixi.js';
import Base from 'game/entities/Base';
import { on, off } from 'dom-event';
import Game from 'game/Game';
import { tileSize } from 'utils/levelUtils';
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
    let x;
    let y;

    const xPosition = e.clientX;
    const yPosition = e.clientY;

    if ((xPosition - Math.floor(xPosition / this.movingTower.height) * this.movingTower.height) >= tileSize) {
      x = (Math.floor(xPosition / this.movingTower.height) * this.movingTower.height) + tileSize;
    }
    else {
      x = (Math.floor(xPosition / this.movingTower.height) * this.movingTower.height);
    }

    if ((yPosition - Math.floor(yPosition / this.movingTower.height) * this.movingTower.height) >= tileSize) {
      y = (Math.floor(yPosition / this.movingTower.height) * this.movingTower.height) + tileSize;
    }
    else {
      y = (Math.floor(yPosition / this.movingTower.height) * this.movingTower.height);
    }

    this.movingTower.position.x = x;
    this.movingTower.position.y = y;

    this.addChild(this.movingTower);

    off(Game.renderer.view, 'mousemove', this.onMouseMove);
    off(Game.renderer.view, 'click', this.placeTower);
    this.movingTower = null;
  }

  addBase() {
    this.addChild(this.base);
  }

  onMouseMove(e) {
    this.movingTower.position.x = e.x - (this.movingTower.width / 2);
    this.movingTower.position.y = e.y - (this.movingTower.height / 2);
  }
}
