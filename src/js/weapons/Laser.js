import * as THREE from 'three'

import { Weapon } from "./DefaultWeapon"
import { store } from "../store/Store"
import game from './../../index'
import { insideCircle } from '../utils/math'

function createBulletModel(x, y, angle) {
  const geometry = new THREE.BoxGeometry(0.05, 0.5, 0.05)
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const bullet = new THREE.Mesh(geometry, material)

  bullet.position.x = x
  bullet.position.y = y
  bullet.position.z = 3
  bullet.rotation.z = angle

  return {
    bullet
  }
}

class LaserBullet {
  model = null
  speed = 0.8
  created = 0
  lifetime = 2000
  isExist = true
  owner = null

  constructor(data) {
    this.owner = data.owner
    this.created = Date.now()
    this.damage = data.damage || 15

    const { bullet } = createBulletModel(data.x, data.y, data.angle)

    this.model = bullet

    game.scene.add(this.model)
  }

  update() {
    this.isExist = Date.now() < this.created + this.lifetime

    this.model.position.x += Math.cos(this.model.rotation.z + Math.PI / 2) * this.speed
    this.model.position.y += Math.sin(this.model.rotation.z + Math.PI / 2) * this.speed

    const collidedWith = store.modules.ships.ships.find(ship => {
      if (ship.shipEntity.id === this.owner) return false
      return insideCircle(
        this.model.position,
        {
          x: ship.shipEntity.model.position.x,
          y: ship.shipEntity.model.position.y,
          radius: 0.5
        }
      )
    })

    if (collidedWith) {
      this.isExist = false
      collidedWith.shipEntity.hp -= this.damage
    }

    if (!this.isExist) {
      game.scene.remove(this.model)
    }
  }
}

export class LaserWeapon extends Weapon {
  owner = null
  offset = 0
  reloading = 1000
  lastTimeUse = 0

  constructor(data) {
    super(data)
    this.owner = data.owner
    this.offset = data.offset
    this.reloading = data.reloading || 1000
  }

  use(data) {
    if (Date.now() < this.lastTimeUse + this.reloading) return

    this.lastTimeUse = Date.now()

    store.modules.bullets.add(new LaserBullet({
      x: data.model.position.x + Math.cos(data.angle) * this.offset,
      y: data.model.position.y + Math.sin(data.angle) * this.offset,
      angle: data.angle,
      owner: this.owner,
    }))
  }
}