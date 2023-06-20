import { distance } from "../utils/math"

export class ShipAI {
  shipEntity = null
  action = null
  target = null

  constructor(shipEntity) {
    this.shipEntity = shipEntity
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
    if (this.action === 'move') {
      this.moveTo(this.target)
    }
  }
}