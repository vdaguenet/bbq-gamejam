import PIXI from 'pixi.js';

export default class LifeBar extends PIXI.Graphics {
  constructor(maxLife) {
    super();

    this.maxLife = maxLife;
    this.currentLife = 1;

    this.draw();
  }

  update(value) {
    this.currentLife = value / this.maxLife;
    this.draw();
  }

  draw() {
    this.clear();
    this.beginFill(0xe6c16d, 1);
    this.drawRoundedRect(0, 0, 40, 5, 2);
    this.endFill();
    this.beginFill(0xf95857, 1);
    this.drawRoundedRect(0, 0, this.currentLife * 40, 5, 2);
    this.endFill();
  }
}
