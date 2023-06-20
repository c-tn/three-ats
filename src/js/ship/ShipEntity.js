import game from './../../index'
import { store } from '../store/Store'

const PI2 = Math.PI * 2
export class ShipEntity {
    id = null

    angle = 0

    maxSpeed = 0.5
    maxBackwardSpeed = -0.1
    currentSpeed = 0
    speedBoost = 0.003
    stopSpeed = 0.006

    rotateSpeed = 0.04

    hp = 100

    model = null

    constructor(data) {
        this.id = data.id
        this.model = data.model

        this.maxSpeed = data.maxSpeed || this.maxSpeed
        this.currentSpeed = data.currentSpeed || this.currentSpeed
        this.speedBoost = data.speedBoost || this.speedBoost

        this.rotateSpeed = data.rotateSpeed || this.rotateSpeed
    }

    get position() {
        return this.model.position
    }

    increaseSpeed() {
        this.currentSpeed += this.speedBoost

        if (this.currentSpeed >= this.maxSpeed) {
            this.currentSpeed = this.maxSpeed
        }
    }

    decreaseSpeed() {
        this.currentSpeed -= this.currentSpeed > 0 ? this.speedBoost : this.stopSpeed

        if (this.currentSpeed <= this.maxBackwardSpeed) {
            this.currentSpeed = this.maxBackwardSpeed
        }
    }

    fullStop() {
        if (this.currentSpeed > 0) this.decreaseSpeed()
        if (this.currentSpeed < 0) this.increaseSpeed()

        if (Math.abs(this.currentSpeed) <= this.stopSpeed) {
            this.currentSpeed = 0
        }
    }

    rotateLeft() {
        this.angle += this.rotateSpeed

        if (this.angle > PI2 * 2) this.angle -= PI2 * 2
    }

    rotateRight() {
        this.angle -= this.rotateSpeed

        if (this.angle < 0) this.angle += PI2 * 2

    }

    getAngle() {
        return this.model.rotation.z
    }

    update() {
        this.model.position.x += Math.cos(this.getAngle() + Math.PI / 2) * this.currentSpeed
        this.model.position.y += Math.sin(this.getAngle() + Math.PI / 2) * this.currentSpeed

        this.model.rotation.z = this.angle

        if (this.hp <= 0) {
            game.scene.remove(this.model)
            store.modules.ships.remove(this.id)
        }
    }
}