import Mediator from 'utils/Mediator';

class Player {
  constructor() {
    this.cash = 5;
    this.score = 0;
    this.towers = [];
  }

  addCash(cash) {
    this.cash += cash;
    Mediator.emit('cash:update', this.cash);
  }

  removeCash(cash) {
    this.cash -= cash;
    Mediator.emit('cash:update', this.cash);
  }

  addScore(value) {
    this.score += value;
    this.addCash(0.1 * value);
    Mediator.emit('score:update', this.score);
  }

  addTower(tower) {
    if (this.cash < tower.stats.cost) return;

    this.towers.push(tower);
  }

  // removeTower(id) {
  //   for (let i = 0; i < this.towers.length; i++) {
  //     if (this.towers[i].id === id) {
  //       this.towers.splice(i, 1);
  //     }
  //   }
  // }
}

export default new Player();
