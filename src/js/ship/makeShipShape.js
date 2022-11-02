import { mirror } from '../utils/math'
import { RandomBetween, PseudoRandom } from '../utils/random'

function getRandomColor(value = 0.5) {
	return +('0x' + Math.floor(value * 16777215).toString(16))
}

export function makeShipShape(seed = '') {
    const pseudoRandom = new PseudoRandom(seed)
    const randomBetween = new RandomBetween(pseudoRandom)

    const cabinOffset = pseudoRandom.getValue() > 0.7 ? randomBetween.getValue(0.1, 0.15) : 0.1
    const yOffset = 0.7

    const cabin = [
        { X: 0, Y: randomBetween.getValue(0.4, 0.45) - yOffset },
        { X: -0.1, Y: randomBetween.getValue(0.4, 0.45) - yOffset },
        { X: -0.1, Y: randomBetween.getValue(0.9, 1) - yOffset },
        { X: 0, Y: randomBetween.getValue(1, 1.1) - yOffset },
    ]
  
    const cabinMirrored = mirror(cabin)
    cabin.color = getRandomColor(pseudoRandom.getValue())
    cabin.h = 0.15

    const wing1 = [
        { X: 0 - cabinOffset, Y: randomBetween.getValue(0.2, 0.75) - yOffset },
        { X: 0 - cabinOffset, Y: randomBetween.getValue(0.8, 1.2) - yOffset },
        { X: -randomBetween.getValue(0.15, 0.3) - cabinOffset, Y: randomBetween.getValue(0.8, 1.1) - yOffset },
        { X: -randomBetween.getValue(0.15, 0.3) - cabinOffset, Y: randomBetween.getValue(0.4, 0.75) - yOffset },
    ]
  
    const wing1Mirrored = mirror(wing1)
    wing1.color = getRandomColor(pseudoRandom.getValue())
    wing1.h = 0.1
  
    const wingOffset = pseudoRandom.getValue() > 0.7 ? randomBetween.getValue(0, 0.1) : 0
  
    const wing2 = [
        { X: wing1[3].X - wingOffset, Y: wing1[3].Y },
        { X: wing1[2].X - wingOffset, Y: wing1[2].Y },
        { X: -randomBetween.getValue(0.5, 0.7) - wingOffset, Y: randomBetween.getValue(0.4, 1.1) - yOffset },
        { X: wing1[3].X - wingOffset, Y: wing1[3].Y },
    ]
  
    const wing2Mirrored = mirror(wing2)
    wing2.color = getRandomColor(pseudoRandom.getValue())
    wing2.h = 0.1
  
    const wing3 = [
        cabin[1],
        cabin[2],
        { X: wing2[2].X, Y: wing2[2].Y },
    ]
  
    const wing3Mirrored = mirror(wing3)
    wing3.color = cabin.color
    wing3.h = 0.05

    const shapes = [
        cabin, cabinMirrored,
        wing3, wing3Mirrored,
        wing1, wing1Mirrored,
        wing2, wing2Mirrored,
    ]

    return {
        shapes,
    }
  }
