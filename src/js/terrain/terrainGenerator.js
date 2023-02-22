import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'

const noise3D = createNoise3D()

let chunksList = []
const chunkSize = 30
const halfOfChunkSize = chunkSize / 2

export function checkPositionOnChunk(x, y) {
    const currentChunkX = Math.ceil((x - halfOfChunkSize) / chunkSize)
    const currentChunkY = Math.ceil((y - halfOfChunkSize) / chunkSize)

    const midChunk = chunksList[4]
    const midChunkX = Math.ceil((midChunk.position.x - halfOfChunkSize) / chunkSize)
    const midChunkY = Math.ceil((midChunk.position.y - halfOfChunkSize) / chunkSize)

    if (Math.abs(currentChunkX) !== Math.abs(midChunkX) || Math.abs(currentChunkY) !== Math.abs(midChunkY)) {
        makeTerrain(currentChunkX, currentChunkY)
        return chunksList
    }
}

export function makeTerrain(x = 0, y = 0) {
    for (let nextX = x - 1; nextX <= x + 1; nextX++) {
        for (let nextY = y - 1; nextY <= y + 1; nextY++) {
            const calculatedX = nextX * chunkSize
            const calculatedY = nextY * chunkSize
            const existChunk = chunksList.find(chunk => chunk.position.x === calculatedX && chunk.position.y === calculatedY)

            if (existChunk) {
                chunksList.push(existChunk)
            } else {
                chunksList.push(generateTerrain(calculatedX, calculatedY))
            }
        }
    }

    return chunksList
}



export function generateTerrain(x, y) {
    const geometry = new THREE.PlaneGeometry(chunkSize, chunkSize, 60, 60)

    geometry.vertices.map(vertices => {
        if (Math.abs(vertices.x) > 14 || Math.abs(vertices.y) > 14) {
            vertices.z = noise3D(0, 0, 0)
            return
        }

        vertices.z = noise3D(vertices.x + x, vertices.y + y, 0) * 0.1
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