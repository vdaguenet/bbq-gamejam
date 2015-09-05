import bindAll from 'lodash.bindAll';
import raf from 'raf';
import Diver from './entities/tower/Diver';
import Enemy from './entities/Ennemy';
import Player from './Player';
import PIXI from 'pixi.js';
import Layer from './grid/Layer';
import TowerLayer from './grid/layers/TowerLayer';

export default class Game {
  constructor(width, height) {
    bindAll(this, 'update');
    console.log('Game - construct');

    this.player;
    this.width = width;
    this.height = height;
    this.renderer = PIXI.autoDetectRenderer(width, height, {
      backgroundColor: 0x1099bb,
    });
    this.stage = new PIXI.Container();
    this.enemies = [];
    this.backgroundLayer = undefined;
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
    console.log('Let\'s go ' + pseudo);
    this.diver = new Diver('veggie');

    this.update();
  }

  addLayers() {
    this.backgroundLayer = new Layer(this.width, this.height, 50, 50);
    this.towerLayer = new TowerLayer(this.width, this.height, 50, 50);
    this.stage.addChildAt(this.backgroundLayer, 0);
    this.stage.addChildAt(this.towerLayer, 1);
  }

  populateEnemies() {
    for (let i = 0; i < 1; i++) {
      this.enemies.push(new Enemy({id: 'test', side: 'meat'}));
    }
  }

  update() {
    raf(this.update);

    // TODO: update all the entities

    this.checkCollision(Player.towers, this.enemies);
    this.render();
  }

  checkCollision(towers, enemies) {
    towers.foreEach((tower) => {
      enemies.forEach((enemy) => {
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
    this.width = width;
    this.height = height;

    this.renderer.resize(width, height);
  }

  appendTo($el) {
    $el.appendChild(this.renderer.view);
  }
}
