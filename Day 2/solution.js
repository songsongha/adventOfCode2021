// Problem 1: Calculate horizontal position and depth.  What is the value of those two multiplied?
// Problem 2: Aim parameter is added; aim changes when sub moves up or down, depth only changes when sub moves forward.
//    What is the new horizontal position * depth considering aim?

const fs = require('fs')

// put inputs from text file into an array
const plannedCourse = fs.readFileSync('./inputs.txt', 'utf8').split('\n')

// initial position
let horizontalPosition = 0
let depthP1 = 0
let depthP2 = 0
let aim = 0

plannedCourse.forEach(move => {
    const moveArray = move.split(' ')
    switch (moveArray[0]) {
        case 'forward':
           horizontalPosition += Number(moveArray[1]) 
           depthP2+=  Number(moveArray[1]) * aim
            break
        case 'up':
            depthP1 -= Number(moveArray[1])
            aim -= Number(moveArray[1])
            break
        case 'down':
            depthP1 += Number(moveArray[1])
            aim += Number(moveArray[1])
            break
    }
})

const solution1 = horizontalPosition * depthP1
const solution2 = horizontalPosition * depthP2
console.log({solution1, solution2})