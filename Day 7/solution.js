// Problem 1: What is the most efficient movement of the crab submarines and the fuel amount used?
// Problem 2: For each step, the fuel burned increases by 1, recalculate fuel used for most efficient movement

const fs = require('fs')
let crabPositionArray = fs.readFileSync('./inputs.txt', 'utf8').split(',').map(Number)

// Problem 1
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

// Problem 2
// determine the minimum number of movements by taking the mean, need to check above and below the true mean because of integers
let positionTotal = 0
crabPositionArray.forEach(position => {
    positionTotal += position
})
const mean1 = Math.ceil(positionTotal / crabPositionArray.length)
const mean2 = Math.floor(positionTotal / crabPositionArray.length)

// use Triangular number formula to determine fuel amount used
// Xn = n(n+1)/2 where Xn is the fuel used and n is the number of movements made

let totalFuel1 = 0
let totalFuel2 = 0
crabPositionArray.forEach(position =>{
    const n1 = Math.abs(position - mean1)
    const n2 = Math.abs(position - mean2)
    totalFuel1 += n1*(n1 + 1)/2
    totalFuel2 += n2*(n2 + 1)/2
})

// Problem 2 Solution is the option that uses less fuel
totalFuel1 > totalFuel2 ? console.log({totalFuel2}) : console.log({totalFuel1})
