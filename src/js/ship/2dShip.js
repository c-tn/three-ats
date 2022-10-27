import { random, mirror } from '../utils/math'

function getRandomColor() {
	return '#' + Math.floor(Math.random()*16777215).toString(16)
}

function makeCabinShape() {
    const cabin = [
        { X: 0, Y: random(40, 45) },
        { X: -10, Y: random(50, 60) },
        { X: -10, Y: random(90, 100) },
        { X: 0, Y: random(90, 105) },
    ]
  
    cabin.push(...mirror(cabin))
    cabin.color = getRandomColor()

    return cabin
}

export function makeShipShape() {
    const cabinOffset = Math.random() > 0.7 ? random(0, 10) : 0

    const cabin = makeCabinShape()
  
    const wing1 = [
        { X: -10 - cabinOffset, Y: random(20, 75) },
        { X: -10 - cabinOffset, Y: random(80, 120) },
        { X: -random(15, 30) - cabinOffset, Y: random(80, 110) },
        { X: -random(15, 30) - cabinOffset, Y: random(40, 75) },
    ]
  
    wing1.color = getRandomColor()
    const wing1Mirrored = mirror(wing1)
  
    const wingOffset = Math.random() > 0.7 ? random(0, 10) : 0
  
    const wing2 = [
        { X: wing1[3][0] - wingOffset, Y: wing1[3][1] },
        { X: wing1[2][0] - wingOffset, Y: wing1[2][1] },
        { X: -random(50, 70) - wingOffset, Y: random(40, 110) },
        { X: wing1[3][0] - wingOffset, Y: wing1[3][1] },
    ]
  
    wing2.color = getRandomColor()
    const wing2Mirrored = mirror(wing2)
  
    const wing3 = [
        cabin[1],
        cabin[2],
        { X: wing2[2][0], Y: wing2[2][1] },
    ]
  
    const wing3Mirrored = mirror(wing3)
    wing3.color = cabin.color

    const wings = [
        wing1, wing1Mirrored,
        wing2, wing2Mirrored,
        wing3, wing3Mirrored,
    ]
    
    return {
        cabin,
        wings,
    }
  }
