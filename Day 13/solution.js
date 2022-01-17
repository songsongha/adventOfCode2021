// Problem 1: How many dots on the page after the first fold?
// Problem 2: Execute all the folds, what do the dots spell in the end?

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
for (let i=0; i < instruction.length; i++){
    const foldIndex = instruction[i][0] === 'x' ? 0 : 1
    const line = instruction[i][1]
    console.log('foldIndex', foldIndex,'line', line)
    dots.forEach(dot =>{
        if (dot[foldIndex] > Number(line)){
            dot[foldIndex] = dot[foldIndex] - 2 * Math.abs(dot[foldIndex] - line)
        }
    })
}

// count dots and exclude duplicate dots
let dotCounter = 0
let maxX = 0
let maxY = 0
const dotObject = {}
dots.forEach(dot => {
    // find the display grid size
    if (dot[0] > maxX) maxX = dot[0]
    if (dot[1] > maxY) maxY = dot[1]

    // create the list of unique dots in an object
    if (dotObject[dot[0]] === undefined) {
        dotObject[dot[0]] = [dot[1]]
        dotCounter++
    } else if (!dotObject[dot[0]].find(entry => entry === dot[1])) {
        // if there isn't a duplicate then add it to the object and increase counter
        dotObject[dot[0]].push(dot[1])
        dotCounter++
    }
})
console.log({dotCounter})
console.log({dotObject})

const doesDotExist = (x , y) => {
    if (dotObject[x] && dotObject[x].find(entry => entry === y) !== undefined) {
        return true
    } 

    return false
}

// display dots
for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
        process.stdout.write(doesDotExist(x,y) ? '#' : ' ');
    }
    process.stdout.write('\n');
}