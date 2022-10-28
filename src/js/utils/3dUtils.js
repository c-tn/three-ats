import * as THREE from 'three'

export function create3DShape(data) {
    let shape = new THREE.Shape()

    shape.moveTo(data.points[0].X, data.points[0].Y)

    for (let i = 1; i < data.points.length; i++) {
        shape.lineTo(data.points[i].X, data.points[i].Y)
    }

    const geometry = new THREE.ExtrudeBufferGeometry(shape, {
        depth: data.h || 0.1,
        steps: 1,
        bevelEnabled: data.bevel,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 1,
    })
    const material = new THREE.MeshBasicMaterial({ color: data.color })
    const mesh = new THREE.Mesh(geometry, [ material ])

    return mesh
}