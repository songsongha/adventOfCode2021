// Problem 1: In the output values, how many times do digits 1, 4, 7, or 8 appear?


// put input into an nested array
const fs = require('fs')
const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')

const notes = input.map(line => {
    return line.split(' | ')
})

for (let i = 0; i< notes.length ; i++) {
    notes[i][0] = notes[i][0].split(' ')
    notes[i][1] = notes[i][1].split(' ')
}

// check outputs for string lengths of 2,3,4,7 which represent 1,7,4,8 respectively
let easyDigitCount = 0

notes.forEach(line =>{
    line[1].forEach(output => {
        if ((output.length >= 2 && output.length <= 4) || output.length === 7) {
            easyDigitCount++
        }
    })

})

console.log({easyDigitCount})