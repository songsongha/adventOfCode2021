// Problem 1: What is the loweset total risk from top left to bottom right?
// Problem 2: The cavern is 5x larger and risk increased/rolls around, what is the new lowest total risk?

const fs = require('fs')
const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
const cavernMap = input.map((row, rowIndex) => {
    const values = row.split('').map(Number)
    return values.map((value, colIndex) =>{
        return {
            val: value,
            row: rowIndex,
            col: colIndex,
            checked: false,
            totalRisk: Number(0)
        }
    })
})
 const getValue = (num) => {
    if (num > 9) {
        return num - 9
    } 
    return num
 }

 // create 5x larger cavern
const cavernMap2 = []
const cavernRowSize = cavernMap.length
const cavernColSize = cavernMap[0].length
for(let rowIndex = 0; rowIndex < cavernRowSize * 5; rowIndex++){
    const caveCol = []
    for(let colIndex = 0; colIndex < cavernColSize * 5; colIndex++){
        const refRow = rowIndex - Math.floor(rowIndex / cavernRowSize) * cavernRowSize
        const refCol = colIndex - Math.floor(colIndex / cavernColSize) * cavernColSize
        const value = getValue(cavernMap[refRow][refCol].val + Math.floor(rowIndex / cavernRowSize) + Math.floor(colIndex / cavernColSize))
        caveCol[caveCol.length] = {
            val: value,
            row: rowIndex,
            col: colIndex,
            checked: false,
            totalRisk: Number(0)
        }
    }
    cavernMap2[rowIndex] = caveCol
}

// taken from Day 9 solution
const getAdjacent = (cavernMap, current) => {
    const adjacent = []
    const{row, col} = current

    if (row >= 1) adjacent.push(cavernMap[row-1][col])
    if (col >= 1) adjacent.push(cavernMap[row][col-1])
    if (row < cavernMap.length -1) adjacent.push(cavernMap[row+1][col])
    if (col < cavernMap[row].length -1) adjacent.push(cavernMap[row][col+1])

    return adjacent
}

// sort from lowest to highest
const sortQ = (queue) => {
    queue.sort((a, b) => {
        return a.totalRisk - b.totalRisk
})
}

const findLowestRisk = (cavernMap) => {

    const startPoint = cavernMap[0][0]
    const endPoint = cavernMap[cavernMap.length-1][cavernMap[0].length-1]
    let finished = false

    // create a priority queue, explore the paths that have the least risk first
    const queue = [startPoint]

    while (!finished){
        const current = queue.shift()
        if (current === endPoint) {
            finished = true
        } else {
            const adjacent = getAdjacent(cavernMap, current)
            for(let i = 0; i < adjacent.length; i++){
                if(!adjacent[i].checked){
                adjacent[i].totalRisk = current.totalRisk + adjacent[i].val
                adjacent[i].checked = true
                queue.push(adjacent[i])
                } 
            }
            sortQ(queue)
        }
        
    }
    console.log('total Risk', endPoint.totalRisk)
}

findLowestRisk(cavernMap)
findLowestRisk(cavernMap2)