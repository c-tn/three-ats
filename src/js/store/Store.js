class ShipModule {
  ships = []
  add(ship) {
    this.ships.push(ship)
  }
  remove(id) {
    this.ships = this.ships.filter(ship => ship.shipEntity.id !== id)
  }
}

class BulletModule {
  bullets = []
  add(bullet) {
    this.bullets.push(bullet)
  }
  update() {
    this.bullets = this.bullets.filter(bullet => {
      bullet.update()
      return bullet.isExist
    })
  }
}

class Store {
  modules = {
    bullets: new BulletModule(),
    ships: new ShipModule()
  }
}

export const store = new Store()