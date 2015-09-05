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
    this.canvas;
    this.stage = stage;
    this.isPlacing = false
  }

  /**
   * [addTower description]
   * @param {AbstractTower} tower
   * @param {Object} point x y
   */
  addTower(tower, point) {
    this.canvas = document.getElementsByTagName('canvas');
    this.isPlacing = true;
    // create a texture from an image path
    const texture = PIXI.Texture.fromImage('assets/images/test.jpg');
    // create a new Sprite using the texture
    const towerLayer = new PIXI.Sprite(texture);
    towerLayer.position.x = point.x;
    towerLayer.position.y = point.y;

    this.stage.addChild(towerLayer);
    // Pas possible avec un on stage ?
    on(this.canvas[0], 'mousemove', (e) => {
      console.log('test');
      this.onMouseMove(e, towerLayer);
    });

    on(this.canvas[0], 'click', (e) => {
      console.log('test2');
      this.placeTower(e, towerLayer);
    });
    // TODO Trouver la case correspondante au X, Y passé en paramètre et addChild la Tower correspondante
  }

  placeTower(e, tower) {
    let x;
    let y;
    console.log(e.clientX);
    const xPosition = e.clientX;
    const yPosition = e.clientY;

    if ((xPosition - Math.floor(xPosition / 100) * 100) >= 50) {
      x = (Math.floor(xPosition / 100) * 100) + 50;
    }
    else {
      x = (Math.floor(xPosition / 100) * 100);
    }

    if ((yPosition - Math.floor(yPosition / 100) * 100) >= 50) {
      y = (Math.floor(yPosition / 100) * 100) + 50;
    }
    else {
      y = (Math.floor(yPosition / 100) * 100);
    }

    tower.position.x = x;
    tower.position.y = y;

    this.isPlacing = false;
  }

  addBase() {
    // TODO : MADJ
  }

  onMouseMove(e, tower) {
    if (this.isPlacing) {
      tower.position.x = e.x - (tower.width / 2);
      tower.position.y = e.y - (tower.height / 2);
    }
  }

  addBase() {

  }
}
