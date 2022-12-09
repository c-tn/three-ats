import * as THREE from 'three'
import { FBM } from 'three-noise'

const fbm = new FBM({
    seed: Math.random(),
})
let chunksList = []
const chunkSize = 30
const halfOfChunkSize = chunkSize / 2

export function updateTerrain(x, y) {
    const currentChunkX = Math.ceil((x - halfOfChunkSize) / chunkSize)
    const currentChunkY = Math.ceil((y - halfOfChunkSize) / chunkSize)

    const midChunk = chunksList[4]
    const midChunkX = Math.ceil((midChunk.position.x - halfOfChunkSize) / chunkSize)
    const midChunkY = Math.ceil((midChunk.position.y - halfOfChunkSize) / chunkSize)

    if (Math.abs(currentChunkX) !== Math.abs(midChunkX) || Math.abs(currentChunkY) !== Math.abs(midChunkY)) {
        initTerrain(currentChunkX, currentChunkY)
        return chunksList
    }
}

export function initTerrain(x = 0, y = 0) {
    chunksList = []

    for (let nextX = x - 1; nextX <= x + 1; nextX++) {
        for (let nextY = y - 1; nextY <= y + 1; nextY++) {
            chunksList.push(generateTerrain(nextX * chunkSize, nextY * chunkSize))
        }
    }

    return chunksList
}

export function generateTerrain(x, y) {
    const geometry = new THREE.PlaneGeometry(chunkSize, chunkSize, 60, 60)

    geometry.vertices.map(vertices => {
        if (Math.abs(vertices.x) > 14 || Math.abs(vertices.y) > 14) {
            vertices.z = fbm.get2({
                x: 0,
                y: 0,
            })
            return
        }

        vertices.z = fbm.get2({
            x: vertices.x + x,
            y: vertices.y + y,
        })
    })
    
    geometry.computeVertexNormals()

    const texture = new THREE.TextureLoader().load('img/sand.jpeg')

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)

    const material = new THREE.MeshStandardMaterial({
        map: texture,
    })

    const terrain = new THREE.Mesh(geometry, material)

    terrain.position.setX(x)
    terrain.position.setY(y)

    terrain.receiveShadow = true

    return terrain
}