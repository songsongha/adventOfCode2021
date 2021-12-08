// Problem 1: What is the most efficient movement of the crab submarines and the fuel amount used?

const fs = require('fs')
let crabPositionArray = fs.readFileSync('./inputs.txt', 'utf8').split(',').map(Number)

// sort array to find the median of all the crab positions, the median is the most efficient movement position
crabPositionArray = crabPositionArray.sort((a, b) => a - b);
const median = crabPositionArray[Math.round(crabPositionArray.length/2)]

// calculate total fuel used
let totalFuel = 0
crabPositionArray.forEach(position => {
    totalFuel += Math.abs(position - median)
})

// Problem 1 Solution
console.log({totalFuel})