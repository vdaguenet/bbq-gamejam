export default class Player {
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
    const li = document.createElement('li');
    li.innerHTML = '<a class="tower" href="javascript:void(0)">1 tour</a>';
    this.list.appendChild(li);
  }

  removeTower(id) {
    for (let i = 0; i < this.towers.length; i++) {
      if (this.towers[i].id === id) {
        this.towers.splice(i, 1);
      }
    }
  }
}

