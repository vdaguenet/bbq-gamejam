import bindAll from 'lodash.bindAll';
import raf from 'raf';
import Diver from './entities/tower/Diver';
import CommisChef from './entities/tower/CommisChef';
import MasterChef from './entities/tower/MasterChef';
import SecondInCommand from './entities/tower/SecondInCommand';
import Chef from './entities/tower/Chef';
import Enemy from './entities/Ennemy';
import Player from './Player';
import PIXI from 'pixi.js';
import Layer from './grid/Layer';
import TowerLayer from './grid/layers/TowerLayer';
import level from './levels/level1.json';
import { tileSize } from 'utils/levelUtils';

class Game {
  constructor() {
    bindAll(this, 'update');
    console.log('Game - construct');

    this.width = (level.tiles[0].length) * tileSize;
    this.height = (level.tiles.length) * tileSize;
    this.renderer = PIXI.autoDetectRenderer(this.width, this.height, {
      backgroundColor: 0x1099bb,
    });
    this.stage = new PIXI.Container();

    this.enemies = [];
    this.backgroundLayer = undefined;

    this.lastUpdate = null;
  }

  init() {
    console.log('Game - init', this.width);
    // TODO: init the game
    this.addLayers();
    this.populateEnemies();
  }

  start(pseudo) {
    console.log('Game - start');
    Player.setPseudo(pseudo);

    this.update();
  }

  addLayers() {
    this.backgroundLayer = new Layer(this.width, this.height, level);
    this.towerLayer = new TowerLayer(this.width, this.height, 50, this.stage);
    this.stage.addChildAt(this.backgroundLayer, 0);
    this.stage.addChildAt(this.towerLayer, 1);
  }

  populateEnemies() {
    const tileStart = {
      x: 0,
      y: 5,
    };
    let e;

    for (let i = 0; i < 1; i++) {
      e = new Enemy({ id: 'test', side: 'meat', 'currentTile': tileStart });
      this.enemies.push(e);
      this.stage.addChild(e);
    }
  }

  addTower(item) {
    switch(item.getAttribute('data-tower')) {
    case 'diver-tower':
      this.towerLayer.addTower(new Diver());
      break;
    case 'clerk-tower':
      this.towerLayer.addTower(new CommisChef());
      break;
    case 'part-tower':
      this.towerLayer.addTower(new MasterChef());
      break;
    case 'second-tower':
      this.towerLayer.addTower(new SecondInCommand());
      break;
    case 'chief-tower':
      this.towerLayer.addTower(new Chef());
      break;
    }
  }

  update() {
    const now = window.Date.now();

    if (this.lastUpdate) {
      const elapsed = (now - this.lastUpdate) / 1000;
      this.lastUpdate = now;

      // TODO: update all the entities
      this.enemies.forEach((e) => {
        e.update(elapsed);
      });

      this.checkCollision(Player.towers);
      this.render();
    }
    else {
      // Skip first frame, so elapsed is not 0.
      this.lastUpdate = now;
    }

    raf(this.update);
  }

  checkCollision(towers) {
    if (!towers || towers.length <= 0) return;

    towers.foreEach((tower) => {
      this.enemies.forEach((enemy) => {
        tower.bullets.forEach((bullet) => {
          if (bullet.x >= enemy.x
            && bullet.x <= enemy.x + enemy.width
            && bullet.y >= enemy.y
            && bullet.y <= enemy.y + enemy.height) {
            bullet.deletable = true;
            enemy.deletable = true;
            // TODO add points ?
          }
        });
      });
    });
  }

  render() {
    this.renderer.render(this.stage);
  }

  resize(width, height) {
    this.width = (level.tiles[0].length) * tileSize;
    this.height = (level.tiles.length) * tileSize;

    this.renderer.resize(width, height);
  }

  appendTo($el) {
    $el.appendChild(this.renderer.view);
  }
}

export default new Game();
