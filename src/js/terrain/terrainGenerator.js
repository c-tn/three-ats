import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'

const noise3D = createNoise3D()
const textures = ['img/sand.jpeg', 'img/gray-sand.jpeg', 'img/grass.avif']
const textureIdx = ~~(textures.length * Math.random()) 

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

    const planePositions = geometry.getAttribute('position')
    const planeNormals = geometry.getAttribute('normal')
    
    for (let i = 0; i < planePositions.array.length; i += 3) {
        const noiseValue = noise3D(planePositions.array[i] + x, planePositions.array[i + 1] + y, 0) * 0.2
        planePositions.array[i + 2] = noiseValue
        planeNormals.array[i] = noiseValue
    }

    // geometry.computeVertexNormals()
    const texture = new THREE.TextureLoader().load(textures[textureIdx])

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)

    const material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: texture,
    })

    const terrain = new THREE.Mesh(geometry, material)

    terrain.position.setX(x)
    terrain.position.setY(y)

    terrain.receiveShadow = true

    terrain.name = 'terrain'

    return terrain
}