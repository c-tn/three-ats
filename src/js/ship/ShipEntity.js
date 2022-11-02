export class ShipEntity {
    angle = 0

    maxSpeed = 0.5
    maxBackwardSpeed = -0.1
    currentSpeed = 0
    speedBoost = 0.003
    stopSpeed = 0.006

    rotateSpeed = 0.04

    model = null

    constructor(data) {
        this.model = data.model

        this.maxSpeed = data.maxSpeed || this.maxSpeed
        this.currentSpeed = data.currentSpeed || this.currentSpeed
        this.speedBoost = data.speedBoost || this.speedBoost

        this.rotateSpeed = data.rotateSpeed || this.rotateSpeed
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

    stopSpeed() {
        if (this.currentSpeed > 0) this.decreaseSpeed()
        if (this.currentSpeed < 0) this.increaseSpeed()
    }

    rotateLeft() {
        this.angle += this.rotateSpeed
    }

    rotateRight() {
        this.angle -= this.rotateSpeed
    }

    getAngle() {
        return this.model.rotation.z
    }

    update() {
        this.model.position.x += Math.cos(this.getAngle() + Math.PI / 2) * this.currentSpeed
        this.model.position.y += Math.sin(this.getAngle() + Math.PI / 2) * this.currentSpeed

        this.model.rotation.z = this.angle
    }
}