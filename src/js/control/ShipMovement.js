export class ShipMovement {
    shipEntity = null
    movementState = {
        isRotateLeft: false,
        isRotateRight: false,
        isForward: false,
        isBackward: false
    }

    constructor(shipEntity) {
        this.shipEntity = shipEntity

        this.bindKeys()
    }

    setMovementState(key, state) {
        switch (key) {
            case 'd':
                this.movementState.isRotateRight = state
                break
            case 'a':
                this.movementState.isRotateLeft = state
                break
            case 'w':
                this.movementState.isForward = state
                break
            case 's':
                this.movementState.isBackward = state
                break
        }
    }

    bindKeys() {
        document.addEventListener('keydown', e => {
            this.setMovementState(e.key, true)
        })
    
        document.addEventListener('keyup', e => {
            this.setMovementState(e.key, false)
        })
    }

    update() {
        if (this.movementState.isRotateRight) this.shipEntity.rotateRight()
        if (this.movementState.isRotateLeft) this.shipEntity.rotateLeft()
        if (this.movementState.isForward) this.shipEntity.increaseSpeed()
        if (this.movementState.isBackward) this.shipEntity.decreaseSpeed()

        this.shipEntity.update()
    }
}