import bindAll from 'lodash.bindAll';
import raf from 'raf';
import Diver from './entities/tower/Diver';
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
import clone from 'clone';

const MAX_ENEMIES = 7;

class Game {
  constructor() {
    bindAll(this, 'update');

    this.width = (level.tiles[0].length) * tileSize;
    this.height = (level.tiles.length) * tileSize;
    this.renderer = PIXI.autoDetectRenderer(this.width, this.height, {
      view: document.getElementById('canvas'),
      backgroundColor: 0xbb9a77,
      antialias: true,
    });
    this.stage = new PIXI.Container();
    this.enemies = [];
    this.backgroundLayer = undefined;
    this.isOver = false;
    this.lastUpdate = null;
    this.raf;
  }

  init() {
    // TODO: init the game
    this.addLayers();
  }

  start() {
    this.populateEnemies();

    this.update();
  }

  stop() {
    raf.cancel(this.raf);
    this.isOver = true;
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

    const enemiesInterval = setInterval(() => {
      const e = new Enemy({
        id: 'test' + Math.random(),
        side: 'meat',
        currentTile: clone(tileStart),
        target: this.towerLayer.getBase(),
      });
      this.enemies.push(e);
      this.stage.addChild(e);

      if (this.enemies.length >= MAX_ENEMIES) {
        return clearInterval(enemiesInterval);
      }
    }, 1000);
  }

  addTower(item) {
    switch(item.getAttribute('data-tower')) {
    case 'diver-tower':
      this.towerLayer.addTower(new Diver());
      break;
    case 'master-tower':
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
    if (this.isOver) return;

    const now = window.Date.now();

    if (this.lastUpdate) {
      const elapsed = (now - this.lastUpdate) / 1000;
      this.lastUpdate = now;

      // TODO: update all the entities
      this.updateEnnemies(elapsed);

      this.checkCollision(Player.towers);
      this.render();
    }
    else {
      // Skip first frame, so elapsed is not 0.
      this.lastUpdate = now;
    }

    this.raf = raf(this.update);
  }

  updateEnnemies(elapsed) {
    let i = 0;
    this.enemies.forEach((e) => {
      if (e.deletable) {
        this.stage.removeChildAt(this.stage.getChildIndex(e));
        this.enemies.splice(i, 1);
        e.destroy();
      } else {
        e.update(elapsed);
      }
      i++;
    });
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
            enemy.endureDamages(tower.stats.attack);
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
