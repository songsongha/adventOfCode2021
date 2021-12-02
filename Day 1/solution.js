// Problem 1: Review input file, how many measurements are larger than the previous measurement?
// Problem 2: Consider sums of a three-measurement sliding window. How many sums are larger than the previous sum?

const fs = require('fs')

// put inputs from text file into an array
const depthData = fs.readFileSync('./inputs.txt', 'utf8').split('\n')

// if the current value is larger than the previous value, increase the counter
const individualCounter = (acc, val, index, array) => {
    if (index > 0){
        if (Number(val) > Number(array[index-1])){
            return acc+1
        }
    }

    return acc
}
// if the sum of the current three value window is larger than the previous three value window, increase the counter
const slidingWindowCounter = (acc, val, index, array) => {
    if (index < array.length - 3){
        const window1 = Number(val) + Number(array[index+1]) + Number(array[index+2])
        const window2 = Number(array[index+1]) + Number(array[index+2]) + Number(array[index+3])

        if (window2 > window1) return acc+1
    return acc
    }
return acc
}

const solution1 = depthData.reduce(individualCounter, 0)
const solution2 = depthData.reduce(slidingWindowCounter, 0)

console.log({solution1, solution2})