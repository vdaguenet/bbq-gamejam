import PIXI from 'pixi.js';
import bindAll from 'lodash.bindAll';

export default class Tile extends PIXI.Sprite {
  constructor(x, y, texture) {
    super(texture);

    bindAll(this, 'onMouseOver', 'onMouseOut');

    this.x = x;
    this.y = y;
    this.buttonMode = true;
    this.interactive = true;
    this.anchor = new PIXI.Point(0, 0);

    this.on('mouseover', this.onMouseOver);
    this.on('mouseout', this.onMouseOut);
  }

  onMouseOver() {
    this.alpha = 0.5;
  }

  onMouseOut() {
    this.alpha = 1;
  }
}
