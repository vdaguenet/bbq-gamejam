import PIXI from 'pixi.js';
import bindAll from 'lodash.bindAll';
import Mediator from './Mediator';

class Loader extends PIXI.loaders.Loader {
  constructor() {
    super();

    bindAll(this, 'onLoaded');

    this.once('complete', this.onLoaded);
  }

  addTextures(textures) {
    textures.forEach((texture) => {
      this.add(texture.id, texture.path);
    });

    this.load();
  }

  onLoaded() {
    Mediator.emit('loader:complete');
    console.log('Loader - complete');
  }

  getTexture(id) {
    if (!this.resources[id]) return;
    console.log(this.resources[id]);
    console.log(this.resources[id].texture);
    return this.resources[id].texture;
  }
}

export default new Loader();
