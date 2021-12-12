// Problem 1: Find low points. Calculate risk (1+ height).  What is the sum of the risk of all the low points?
// Diagonals do not count as adjacent!


// put input into an nested array
const fs = require('fs')
const heightMap = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
console.log({heightMap})
// const heightMap = heightMap.map(line => {
//     return line.split('').map(Number)
// })
// console.log({heightMap})

const getAdjacent = (heightMap, row, col) => {
    const adjacent = []

    if (row >= 1) adjacent.push(heightMap[row-1][col])
    if (col >= 1) adjacent.push(heightMap[row][col-1])
    if (row < heightMap.length -1) adjacent.push(heightMap[row+1][col])
    if (col < heightMap[row].length -1) adjacent.push(heightMap[row][col+1])

    return adjacent
}

const lowPoints = []
for (let row = 0; row < heightMap.length; row++) {
    for (let col = 0; col < heightMap[row].length; col++){
        const current = heightMap[row][col]
        const adjacent = getAdjacent(heightMap, row, col)
        // if at lease one value in smaller than current value, current is not a low point
        if (!adjacent.some(value => value <= current)) {
            lowPoints.push(current)
        }
    }
}
console.log({lowPoints})

let risk = 0
lowPoints.forEach(location =>{
    risk += Number(location) + 1
})
console.log({risk})