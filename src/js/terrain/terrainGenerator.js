import * as THREE from 'three'
import { FBM } from 'three-noise'

const chunksList = []

export function updateTerrain(x, y) {

}

export function generateTerrain() {
    const fbm = new FBM({
        seed: Math.random(),
    })

    const geometry = new THREE.PlaneGeometry(30, 30, 60, 60)
    geometry.vertices.map(vertices => {
        vertices.z = fbm.get2(vertices)
    })
    
    geometry.computeVertexNormals()

    const texture = new THREE.TextureLoader().load('img/txtr.jpeg')

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)

    const material = new THREE.MeshStandardMaterial({
        map: texture,
    })

    const terrain = new THREE.Mesh(geometry, material)

    return terrain
}