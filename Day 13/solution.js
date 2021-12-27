// Problem 1: How many dots on the page after the first fold?

const fs = require('fs')
const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')

let dots = input.filter(input => input.match(','))
dots = dots.map(coord =>{
    return coord.split(',').map(Number)
})

let instruction = input.filter(input => input.match('fold along'))
instruction = instruction.map(entry=>{
    return entry.replace('fold along ', '').split('=')
})

// transform dots based on fold
const foldIndex = instruction[0][0] === 'x' ? 0 : 1
const line = instruction[0][1]
dots.forEach(dot =>{
    if (dot[foldIndex] > Number(line)){
        dot[foldIndex] = dot[foldIndex] - 2 * Math.abs(dot[foldIndex] - line)
    }
})

// count dots and exclude duplicate dots
let dotCounter = 0
const dotObject = {}
dots.forEach(dot => {
    if (dotObject[dot[0]] === undefined) {
        dotObject[dot[0]] = [dot[1]]
        dotCounter++
    } else if (!dotObject[dot[0]].find(entry => entry === dot[1])) {
        // if there is duplicate then add it to the object and increase counter
        dotObject[dot[0]].push(dot[1])
        dotCounter++
    }
})
console.log({dotCounter})