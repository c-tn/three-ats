export function random(min, max) {
	return ~~(Math.random() * (max - min)) + min
}

export function mirror(arr) {
    return arr.map(point => ({ X: -point.X, Y: point.Y }))
}