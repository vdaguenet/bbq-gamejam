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
import Mediator from 'utils/Mediator';

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
    this.round = 1;
    this.roundMaxEnemies = 3;
  }

  init() {
    this.addLayers();
  }

  start() {
    this.populateEnemies();
    this.startMusic();

    this.update();
  }

  stop() {
    raf.cancel(this.raf);
    this.isOver = true;
  }

  startMusic() {
    const audio = new Audio('assets/music/music.mp3');
    audio.play();
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

    Mediator.emit('round:update', this.round);

    const enemiesInterval = setInterval(() => {
      const e = new Enemy({
        id: 'test' + Math.random(),
        side: 'meat',
        currentTile: clone(tileStart),
        target: this.towerLayer.getBase(),
      });
      this.enemies.push(e);
      this.stage.addChild(e);

      if (this.enemies.length >= this.roundMaxEnemies) {
        return clearInterval(enemiesInterval);
      }
    }, 1000);
  }

  addTower(item) {
    let tower = null;
    switch(item.getAttribute('data-tower')) {
    case 'diver-tower':
      tower = new Diver();
      this.towerLayer.addTower(tower);
      Player.addTower(tower);
      break;
    case 'second-tower':
      tower = new SecondInCommand();
      this.towerLayer.addTower(tower);
      Player.addTower(tower);
      break;
    case 'chief-tower':
      tower = new Chef();
      this.towerLayer.addTower(tower);
      Player.addTower(tower);
      break;
    case 'master-tower':
      tower = new MasterChef();
      this.towerLayer.addTower(tower);
      Player.addTower(tower);
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
      this.checkTargets(Player.towers);
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

        if (this.enemies.length === 0) {

          setTimeout(() => {
            this.round += 1;
            this.roundMaxEnemies += 2;
            this.populateEnemies();
          }, 5000);
        }
      }
      else {
        e.update(elapsed);
      }
      i++;
    });
  }

  checkTargets(towers) {
    if (!towers || towers.length <= 0) return;

    towers.forEach((tower) => {
      tower.currentTargets = [];
      this.enemies.forEach((ennemy) => {
        if (tower.getDistance(ennemy) < tileSize * tower.stats.radius) {
          tower.currentTargets.push(ennemy);
          tower.update();
        }
      });
    });
  }

  checkCollision(towers) {
    if (!towers || towers.length <= 0) return;

    towers.forEach((tower) => {
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
