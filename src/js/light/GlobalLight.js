import * as THREE from 'three'

export class GlobalLight {
    directionalLight = null
    ambientLight = null
    time = 0
    timeSpeed = 0.01
    sunDistance = 100
    PI2 = Math.PI * 2

    constructor() {
        this.init()
    }

    init() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
        this.ambientLight.position.z = 3

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        this.directionalLight.color.setHSL(0.07, 1, 0.7)
        this.directionalLight.position.set(2, 0, 10)
        this.directionalLight.castShadow = true
        this.directionalLight.shadow.mapSize.width = 2048
        this.directionalLight.shadow.mapSize.height = 2048

        const d = 15
        this.directionalLight.shadow.camera.left = - d
        this.directionalLight.shadow.camera.right = d
        this.directionalLight.shadow.camera.top = d
        this.directionalLight.shadow.camera.bottom = - d
        this.directionalLight.shadow.camera.far = 3500
        this.directionalLight.shadow.bias = - 0.0001
        return {
            ambientLight: this.ambientLight,
            directionalLight: this.directionalLight,
        }
    }

    update() {
        this.time += this.timeSpeed
        this.directionalLight.position.setX(Math.sin(this.time) * this.sunDistance + 10)
        this.directionalLight.position.setZ(Math.cos(this.time) * this.sunDistance)
        this.directionalLight.color.setHSL(Math.sin(this.time) * 0.01 + 0.07, Math.sin(this.time) * 0.5 + 0.4, 0.7)
    
        if (this.time > this.PI2) this.time = 0
    }
}