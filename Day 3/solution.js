// Problem 1: Determine epsilon and gamma rates; gamma is made up of the most common bit in each position, epsilong is lease common bit in each position
// Problem 2: Determine O2 and C02 rate; filter diagnostic report valuess by bit position, 02 is most common, C02 is least common, until there is only 1 value

const fs = require('fs')

// put inputs from text file into an array
const diagnosticReport = fs.readFileSync('./inputs.txt', 'utf8').split('\n')

let positionCount = Array(diagnosticReport[0].split('').length).fill(0)

diagnosticReport.forEach(line => {
    const bitArray = line.split('')

    bitArray.forEach((bit, index) =>{
        // for each position determine which one is more common
        if (bit === '1') {
            positionCount[index] += 1

        }
        else {
            positionCount[index] -= 1
        } 
    })
})

console.log({ positionCount })

let gamma = '' // most common bits
let epsilon = '' // least common bits

positionCount.forEach(position =>{
    if (position < 0) {
        // 0 is the most common bit in this position
        gamma += '0'
        epsilon += '1'
        
    } else if (position > 0) {
        // 1 is the most common bit in this position
        gamma += '1'
        epsilon += '0'
    } else {
        console.log ('error: equal number of 1s and 0s')
    }

})

console.log({gamma,epsilon})
const gammaDecimal = parseInt(gamma, 2)
const epsilonDecimal = parseInt(epsilon, 2)

console.log({gammaDecimal, epsilonDecimal})
const solution1 = gammaDecimal * epsilonDecimal
const solution2 = 0
console.log({solution1, solution2})