import './style/main.css'
import * as THREE from 'three'
import { makeShipModel } from './js/ship/makeShipModel'
import { ShipEntity } from './js/ship/ShipEntity'
import { ShipMovement } from './js/control/shipMovement'

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight

window.addEventListener('resize', () =>
{
    // Save sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Environments
 */
// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('.webgl')
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(sizes.width, sizes.height)

const player = new ShipMovement(new ShipEntity({
    model: makeShipModel('123'),
}))

scene.add(player.shipEntity.model)

/**
 * Loop
 */
const loop = () =>
{
    player.update()

    // Render
    renderer.render(scene, camera)

    // Keep looping
    window.requestAnimationFrame(loop)
}
loop()