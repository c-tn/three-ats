export function mirror(arr) {
    return arr.map(point => ({ X: -point.X, Y: point.Y }))
}

export function insideCircle(data, circle) {
    const x = data.x - circle.x;
    const y = data.y - circle.y;
    return Math.sqrt(x ** 2 + y ** 2) < circle.radius
}

export function distance(p1, p2) {
    // const neg = Math.sqrt((p1.x - p2.x) + (p1.y - p2.y)) ? 1 : -1;
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}