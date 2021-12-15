// Problem 1: How many total flashes are there after 100 steps?

const fs = require('fs')
const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
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

// copied from Day 9 but add in diagonals
const getAdjacent = (heightMap, current) => {
    const adjacent = []
    const{row, col} = current

    // orthoganal
    if (row >= 1) adjacent[adjacent.length] = heightMap[row-1][col]
    if (col >= 1) adjacent[adjacent.length] = heightMap[row][col-1]
    if (row < heightMap.length -1) adjacent[adjacent.length] = heightMap[row+1][col]
    if (col < heightMap[row].length -1) adjacent[adjacent.length] = heightMap[row][col+1]

    // diagonal
    if (row < heightMap.length -1 && col < heightMap[row].length -1) adjacent[adjacent.length] = heightMap[row+1][col+1]
    if (row < heightMap.length -1 && col >= 1) adjacent[adjacent.length] = heightMap[row+1][col-1]
    if (row >=1 && col < heightMap[row].length -1) adjacent[adjacent.length] = heightMap[row-1][col+1]
    if (row >=1 && col >=1) adjacent[adjacent.length] = heightMap[row-1][col-1]

    return adjacent
}

let flashCount = 0
let allFlashed = 0
let steps = 0
loop:{
    while (allFlashed < energyLevels.length * energyLevels[0].length) {
        allFlashed = 0
        const queue = []
        // increase all energy levels by 1
        for(let row = 0; row < energyLevels.length; row++) {
            for( let col = 0; col < energyLevels[row].length; col++){
                energyLevels[row][col].val += 1
                if (energyLevels[row][col].val > 9){
                    // octopus 'flashes'
                    queue[queue.length] = energyLevels[row][col]
                }
            }
        }
        // octopus adjacent to flashes levels are increased
        while(queue.length > 0){
            const current = queue.shift()
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
                    allFlashed++
                }
            }
        }
        steps++
    }
}
 console.log({flashCount})
 console.log({steps})