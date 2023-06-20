import * as THREE from 'three'

export function create3DShape(data) {
    let shape = new THREE.Shape()

    shape.moveTo(data.points[0].X, data.points[0].Y)

    for (let i = 1; i < data.points.length; i++) {
        shape.lineTo(data.points[i].X, data.points[i].Y)
    }

    const geometry = new THREE.ExtrudeBufferGeometry(shape, {
        depth: data.h,
        steps: 1,
        bevelEnabled: data.bevel,
        bevelThickness: 0.001,
        bevelSize: 0.001,
        bevelOffset: 0,
        bevelSegments: 1,
    })

    const material = new THREE.MeshStandardMaterial({
        color: data.color,
    })

    const mesh = new THREE.Mesh(geometry, material)

    mesh.castShadow = true

    return mesh
}