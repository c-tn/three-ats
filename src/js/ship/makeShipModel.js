import * as THREE from 'three'
import { create3DShape } from '../utils/3dUtils'
import { makeShipShape } from './makeShipShape'

export function makeShipModel(seed) {
    const shipModel = new THREE.Object3D()
    const shipShapes = makeShipShape(seed)
    for (let i = 0; i < shipShapes.shapes.length; i++) {
        const shape = shipShapes.shapes[i]
        const color = shipShapes.shapes[i].color || shipShapes.shapes[i - 1].color
        const height = shipShapes.shapes[i].h || shipShapes.shapes[i - 1].h

        const wingModel = create3DShape({
            points: shape,
            color: color,
            bevel: false,
            h: height,
        })

        shipModel.add(wingModel)
    }

    shipModel.rotateZ(Math.PI)

    return shipModel
}