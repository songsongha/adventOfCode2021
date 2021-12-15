// Problem 1: How many total flashes are there after 100 steps?

const fs = require('fs')
const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
// console.log({input})
const energyLevels = input.map((row, rowIndex) => {
    const array = []
    const values = row.split('').map(Number)
    return values.map((value, colIndex) =>{
        return {
            val: value,
            row: rowIndex,
            col: colIndex,
            flashed: false
        }
    })
})

// console.log({energyLevels})

console.log('statement 1')
// copied from Day 9 but add in diagonals
const getAdjacent = (heightMap, current) => {
    const adjacent = []
    const{row, col} = current

    // orthoganal
    if (row >= 1) adjacent.push(heightMap[row-1][col])
    if (col >= 1) adjacent.push(heightMap[row][col-1])
    if (row < heightMap.length -1) adjacent.push(heightMap[row+1][col])
    if (col < heightMap[row].length -1) adjacent.push(heightMap[row][col+1])

    // diagonal
    if (row < heightMap.length -1 && col < heightMap[row].length -1) adjacent.push(heightMap[row+1][col+1])
    if (row < heightMap.length -1 && col >= 1) adjacent.push(heightMap[row+1][col-1])
    if (row >=1 && col < heightMap[row].length -1) adjacent.push(heightMap[row-1][col+1])
    if (row >=1 && col >=1) adjacent.push(heightMap[row-1][col-1])

    return adjacent
}

let flashCount = 0
for(let steps = 0 ; steps < 2; steps++){
    const queue = []
    // increase all energy levels by 1
    for(let row = 0; row < energyLevels.length; row++) {
        for( let col = 0; col < energyLevels[row].length; col++){
            energyLevels[row][col].val += 1
            if (energyLevels[row][col].val > 9){
                // octopus 'flashes'
                queue.push(energyLevels[row][col])
            }
        }
    }
    // octopus adjacent to flashes levels are increased
    while(queue.length > 0){
        console.log({queue})
        const current = queue.shift()
        console.log({current})
        if (current){
            if (current.val <= 9){
                energyLevels[current.row][current.col].val +=1
            }
            if (current.val > 9 && !current.flashed){
                energyLevels[current.row][current.col].flashed = true
                flashCount++
                queue.push(...getAdjacent(energyLevels,current))
            }
        } else {
            console.log('current is undefined')
            break
        }
    }

    // set all energy levels above 9 to 0 and reset to allow flashes
    for(let row = 0; row < energyLevels.length; row++) {
        for( let col = 0; col < energyLevels[row].length; col++){
            if (energyLevels[row][col].flashed){
                energyLevels[row][col].flashed = false
                energyLevels[row][col].val = 0
            }
        }
    }
}

console.log('statement3', energyLevels[0][0].val, energyLevels[0][1].val, energyLevels[0][2].val, energyLevels[0][3].val, energyLevels[0][4].val,
 energyLevels[1][0].val, energyLevels[1][1].val, energyLevels[1][2].val, energyLevels[1][3].val, energyLevels[1][4].val,  
 energyLevels[2][0].val, energyLevels[2][1].val, energyLevels[2][2].val, energyLevels[2][3].val, energyLevels[2][4].val,
 energyLevels[3][0].val, energyLevels[3][1].val, energyLevels[3][2].val, energyLevels[3][3].val, energyLevels[3][4].val,
 energyLevels[4][0].val, energyLevels[4][1].val, energyLevels[4][2].val, energyLevels[4][3].val, energyLevels[4][4].val )

 console.log({flashCount})