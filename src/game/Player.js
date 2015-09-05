export default class Player {
  constructor(pseudo) {
    this.pseudo = pseudo;
    this.cash = 10;
    this.towers = [];
  }

  addCash(cash) {
    this.cash += cash;
  }

  removeCash(cash) {
    this.cash -= cash;
  }

  addTower(tower) {
    this.towers.push(tower);
  }

  removeTower(id) {
    for (let i = 0; i < this.towers.length; i++) {
      if (this.towers[i].id === id) {
        this.towers.splice(i, 1);
      }
    }
  }
}
