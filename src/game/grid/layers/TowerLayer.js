import PIXI from 'pixi.js';
import Base from 'game/entities/Base';
import { on } from 'dom-event';

export default class TowerLayer extends PIXI.Container {
  constructor(width, height, tileSize, stage) {
    super();

    this.base = new Base();
    this.tileSize = tileSize;
    this.addBase(width, height);
    this.towers = [];
    this.stage = stage;
    this.isPlacing = false
  }

  /**
   * [addTower description]
   * @param {AbstractTower} tower
   * @param {Object} point x y
   */
  addTower(tower, point) {

    this.isPlacing = true;
    // create a texture from an image path
    const that = this;
    const texture = PIXI.Texture.fromImage('assets/images/test.jpg');
    // create a new Sprite using the texture
    const towerLayer = new PIXI.Sprite(texture);
    towerLayer.position.x = point.x;
    towerLayer.position.y = point.y;
    console.log(this);

    this.stage.addChild(towerLayer);
    // Pas possible avec un on stage ?
    on(document, 'mousemove', function(e) {
      console.log('test');
      that.onMouseMove(e, towerLayer);
    });

    on(document, 'click', function(e) {
      console.log('test2');
      that.onClick(e, towerLayer);
    });
    // TODO Trouver la case correspondante au X, Y passé en paramètre et addChild la Tower correspondante
  }

  placeTower(e, tower) {
    let xPosition = this.stage.width - e.clientX;
    let yPosition = this.stage.height - e.clientY;
    console.log(this.stage);
    console.log(e);
    console.log(tower);
  }

  addBase() {
    // TODO : MADJ
  }

  onMouseMove(e, tower) {
    console.log(e);
    tower.position.x = e.x - (tower.width / 2);
    tower.position.y = e.y - (tower.height / 2);
  }

  onClick(e, tower) {
    this.placeTower(e, tower);
  }
}
