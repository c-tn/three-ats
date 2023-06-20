import { distance } from "../utils/math"
import { store } from "../store/Store"
import { TargetIndicator } from "../ui/TargetIndicator"
import game from './../../index'

export class ShipAI {
  shipEntity = null
  action = null
  target = null
  indicator = null
  id = null

  constructor(shipEntity) {
    this.id = shipEntity.id
    this.shipEntity = shipEntity
    this.indicator = new TargetIndicator(shipEntity.position, store.modules.ships.ships[0].shipEntity.position)
  }

  get model() {
    return this.shipEntity.model
  }

  setAction(action, target) {
    this.action = action
    this.target = target
  }

  moveTo(point) {
    const range = distance(point, this.model.position)
    const stopPoint = (range * this.shipEntity.currentSpeed) / (range * 1.5 * this.shipEntity.stopSpeed)

    this.rotateTo(point)

    if (Math.abs(range) < 0.5) {
      this.shipEntity.fullStop()
      return
    }

    if (range > stopPoint) {
      this.shipEntity.increaseSpeed()
    }
    else if (range < stopPoint) {
      this.shipEntity.decreaseSpeed()
    }
  }

  rotateTo(point) {
    const dx = point.x - this.shipEntity.position.x
    const dy = point.y - this.shipEntity.position.y

    let targetAngle = Math.atan2(dy, dx)

    let angleDiff = targetAngle - this.shipEntity.angle - Math.PI / 2

    while (angleDiff > Math.PI) {
      angleDiff -= 2 * Math.PI
    }
    while (angleDiff < -Math.PI) {
      angleDiff += 2 * Math.PI
    }

    if (angleDiff < 0.1) {
      this.shipEntity.rotateRight()
    }
    else if (angleDiff > 0.1) {
      this.shipEntity.rotateLeft()
    }
  }

  update() {
    this.shipEntity.update()
    this.indicator.update()
    if (this.action === 'move') {
      this.moveTo(this.target)
    }

    if (this.shipEntity.hp <= 0) {
      game.scene.remove(this.shipEntity.model)
      game.scene.remove(this.indicator.entity)
      store.modules.ships.remove(this.id)
    }
  }
}