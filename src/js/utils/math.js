export function mirror(arr) {
    return arr.map(point => ({ X: -point.X, Y: point.Y }))
}
