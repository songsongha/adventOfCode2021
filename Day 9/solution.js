// Problem 1: Find low points. Calculate risk (1+ height).  What is the sum of the risk of all the low points?
// Diagonals do not count as adjacent!


// put input into an nested array
const fs = require('fs')
const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
const heightMap = input.map((row, rowIndex) => {
    const array = []
    const values = row.split('').map(Number)
    values.forEach((value, colIndex) =>{
        const obj = {
            val: value,
            row: rowIndex,
            col: colIndex,
            checked: false
        }
        array.push(obj)
    })
    return array
})

const getAdjacent = (heightMap, current) => {
    const adjacent = []
    const{row, col} = current

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
        const adjacent = getAdjacent(heightMap, current)
        // if at lease one value in smaller than current value, current is not a low point
        if (!adjacent.some(location => location.val <= current.val)) {
            lowPoints.push(current)
        }
    }
}

let risk = 0
lowPoints.forEach(location =>{
    risk += location.val + 1
})
console.log({risk})

// find basins
const basinSizes = lowPoints.map(lowPoint =>{
    const queue = [lowPoint]
    let size = 0
    while (queue.length > 0){
        const current = queue.shift()
        // if the current value hasn't been checked yet or it isn't a 9 then we are still in the basin
        if (!current.checked && current.val !== 9) {
            queue.push(...getAdjacent(heightMap, current))
            current.checked = true // this works becuase of pointers!
            size++
        }
    }
    return size
})

basinSizes.sort((a, b) => {
  return b - a;
})

const solution2 = basinSizes[0] * basinSizes[1] * basinSizes[2]
console.log({solution2});