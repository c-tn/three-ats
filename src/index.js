import * as THREE from 'three'
import { GUI } from 'dat.gui'
import './style/main.css'
import { makeShipModel } from './js/ship/makeShipModel'
import { ShipEntity } from './js/ship/ShipEntity'
import { ShipMovement } from './js/control/shipMovement'
import { makeTerrain, checkPositionOnChunk } from './js/terrain/terrainGenerator'
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
scene.add(camera)

// Terrain
makeTerrain().forEach(chunk => {
    scene.add(chunk)
})

// Player
const player = new ShipMovement(new ShipEntity({
    model: makeShipModel(Math.random().toString()),
}))
// player.shipEntity.model.position.setX(-15)
// player.shipEntity.model.position.setY(-15)
player.shipEntity.model.position.setZ(3)
scene.add(player.shipEntity.model)

const ship = new ShipEntity({
    model: makeShipModel(Math.random().toString()),
})
ship.model.position.setZ(3)
ship.model.position.setX(3)
scene.add(ship.model)

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

// Loop
const loop = () =>
{
    const playerPosition = player.shipEntity.model.position

    player.update()
    camera.position.setX(playerPosition.x)
    camera.position.setY(playerPosition.y)
    camera.position.setZ(10)

    globalLight.update(playerPosition.x, playerPosition.y)

    debugWindow.innerText = `x: ${playerPosition.x.toFixed(2)}, y: ${playerPosition.y.toFixed(2)}`
    const newChunks = checkPositionOnChunk(playerPosition.x, playerPosition.y)

    newChunks?.forEach(chunk => {
        scene.add(chunk)
    })

    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()