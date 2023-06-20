import * as THREE from 'three'
import { GUI } from 'dat.gui'
import Stats from 'stats.js'
import './style/main.css'
import { makeShipModel } from './js/ship/makeShipModel'
import { ShipEntity } from './js/ship/ShipEntity'
import { ShipController, ShipAI } from './js/control/index'
import { makeTerrain, checkPositionOnChunk } from './js/terrain/terrainGenerator'
import { GlobalLight } from './js/light/GlobalLight'
import { LaserWeapon } from './js/weapons/Laser'
import { store } from './js/store/Store'
import { createAIShip } from './js/utils/ship'

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
scene.add(camera)

// Terrain
makeTerrain().forEach(chunk => {
    scene.add(chunk)
})

// Player
const playerShip = new ShipEntity({
    model: makeShipModel(Math.random().toString()),
    id: 0
})

const player = new ShipController(
    playerShip,
    [
        new LaserWeapon({
            name: 'Laser',
            reloading: 600,
            offset: 0.3,
            owner: playerShip.id,
        }),
        new LaserWeapon({
            name: 'Laser',
            reloading: 400,
            offset: -0.3,
            owner: playerShip.id,
        }),
    ]
)
player.shipEntity.model.position.setZ(3)
player.shipEntity.model.position.setX(14)
player.shipEntity.model.position.setY(14)
scene.add(player.shipEntity.model)
store.modules.ships.add(player)


// for (let i = 0; i < 20; i++) {
//     const x = Math.random() * 500 - 250
//     const y = Math.random() * 500 - 250
//     const ship = createAIShip({ x, y})
//     ship.setAction('move', player.shipEntity.model.position)
//     scene.add(ship.shipEntity.model)
// }

// Light
const globalLight = new GlobalLight()
const { ambientLight, directionalLight } = globalLight.init()
directionalLight.target = player.shipEntity.model
scene.add(ambientLight)
scene.add(directionalLight)

// GUI
const gui = new GUI()
const lightFolder = gui.addFolder('Light')
lightFolder.add(globalLight, 'time', 0, Math.PI * 2)
lightFolder.open()

const debugWindow = document.getElementById('debug')

const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.domElement)

// Loop
const loop = () =>
{
    const playerPosition = player.shipEntity.model.position

    store.modules.ships.ships.forEach(s => s.update())

    camera.position.setX(playerPosition.x)
    camera.position.setY(playerPosition.y)
    camera.position.setZ(10)

    store.modules.bullets.update()

    globalLight.update(playerPosition.x, playerPosition.y)

    debugWindow.innerText = `x: ${playerPosition.x.toFixed(2)}, y: ${playerPosition.y.toFixed(2)} speed: ${player.shipEntity.currentSpeed.toFixed(2)}`
    const newChunks = checkPositionOnChunk(playerPosition.x, playerPosition.y)

    newChunks?.forEach(chunk => {
        scene.add(chunk)
    })

    renderer.render(scene, camera)

    stats.update()
    window.requestAnimationFrame(loop)
}
loop()

export default {
    scene
}