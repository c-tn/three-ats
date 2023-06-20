import * as THREE from 'three'
import game from './../../index'

export class TargetIndicator {
  position = null
  target = null
  entity = null

  constructor(target, position) {
    this.target = target
    this.position = position

    const map = new THREE.TextureLoader().load('img/ui/arrow.png')
    const material = new THREE.SpriteMaterial({ map: map })
    const sprite = new THREE.Sprite(material)

    sprite.scale.set(0.5, 0.5, 1)
    sprite.position.set(0, 0, 3)
    sprite.center.set(-3, 0.5)
    game.scene.add(sprite)
    this.entity = sprite
  }

  update() {
    this.entity.position.x = this.position.x
    this.entity.position.y = this.position.y

    const dx = this.target.x - this.entity.position.x
    const dy = this.target.y - this.entity.position.y

    let targetAngle = Math.atan2(dy, dx)

    this.entity.material.rotation = targetAngle
  }
}