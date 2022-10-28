export class ShipEntity {
    angle = 0

    maxSpeed = 5
    maxBackwardSpeed = -2
    currentSpeed = 0
    speedBoost = 0.001

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
        this.currentSpeed -= this.speedBoost

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