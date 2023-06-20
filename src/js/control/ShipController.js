export class ShipController {
    shipEntity = null
    movementState = {
        isRotateLeft: false,
        isRotateRight: false,
        isForward: false,
        isBackward: false,
    }
    
    isShooting = false
    weapons = []

    constructor(shipEntity, weapons = []) {
        this.shipEntity = shipEntity
        this.weapons = weapons

        this.bindKeys()
    }

    addWeapon(weapon) {
        this.weapons.push(weapon)
    }

    setMovementState(key, state) {
        switch (key) {
            case 68: // D
                this.movementState.isRotateRight = state
                break
            case 65: // A
                this.movementState.isRotateLeft = state
                break
            case 87: // W
                this.movementState.isForward = state
                break
            case 83: // S
                this.movementState.isBackward = state
                break
            case 32: // Space
                this.isShooting = state
                break
        }
    }

    bindKeys() {
        document.addEventListener('keydown', e => {
            this.setMovementState(e.keyCode, true)
        })
    
        document.addEventListener('keyup', e => {
            this.setMovementState(e.keyCode, false)
        })
    }

    update() {
        if (this.movementState.isRotateRight) this.shipEntity.rotateRight()
        if (this.movementState.isRotateLeft) this.shipEntity.rotateLeft()
        if (this.movementState.isForward) this.shipEntity.increaseSpeed()
        if (this.movementState.isBackward) this.shipEntity.decreaseSpeed()
        if (this.isShooting) {
            this.weapons.forEach(w => w.use(this.shipEntity))
        }

        this.shipEntity.update()
    }
}