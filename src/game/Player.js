class Player {
  constructor() {
    this.pseudo = '';
    this.cash = 10;
    this.towers = [];
    this.list = document.querySelector('.tower-list');
  }

  setPseudo(pseudo) {
    this.pseudo = pseudo;
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

export default new Player();
