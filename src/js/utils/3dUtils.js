import * as THREE from 'three'

export function createShape(data = []) {
    if (!data.length) {
        throw new Error('Data must be provided')
    }

    let shape = new THREE.Shape()

    shape.moveTo(data[0].X, data[0].Y)

    for (let i = 1; i < data.length; i++) {
        shape.lineTo(data[i].X, data[i].Y)
    }

    const geometry = new THREE.ExtrudeBufferGeometry(shape, {
        depth: data.h,
        steps: 1,
        bevelEnabled: data.bevel,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 1,
    })
    const material1 = new THREE.MeshBasicMaterial({ color: data.color1 })
    const material2 = new THREE.MeshBasicMaterial({ color: data.color2 })
    const mesh = new THREE.Mesh(geometry, [ material1, material2 ])

    return mesh
}