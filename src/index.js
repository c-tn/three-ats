import './style/main.css'
import * as THREE from 'three'
import { makeShipModel } from './js/ship/makeShipModel'
import { ShipEntity } from './js/ship/ShipEntity'
import { ShipMovement } from './js/control/shipMovement'
import { generateTerrain } from './js/terrain/terrainGenerator'
import { GlobalLight } from './js/light/GlobalLight'

const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})

// Environments

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
scene.add(camera)

// Terrain
const terrain = generateTerrain()
terrain.receiveShadow = true
scene.add(terrain)

// Player
const player = new ShipMovement(new ShipEntity({
    model: makeShipModel(Math.random().toString()),
}))
player.shipEntity.model.position.z = 3
scene.add(player.shipEntity.model)

const ship = new ShipEntity({
    model: makeShipModel(Math.random().toString()),
})
ship.model.position.z = 3
ship.model.position.x = 3
scene.add(ship.model)

// Light
const globalLight = new GlobalLight()
const { ambientLight, directionalLight } = globalLight.init()
scene.add(ambientLight)
scene.add(directionalLight)


// Loop
const loop = () =>
{
    const playerPosition = player.shipEntity.model.position

    player.update()
    camera.position.copy(playerPosition)
    camera.position.setZ(10)

    globalLight.update()

    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()