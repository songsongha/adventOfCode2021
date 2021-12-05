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

const gammaDecimal = parseInt(gamma, 2)
const epsilonDecimal = parseInt(epsilon, 2)

const solution1 = gammaDecimal * epsilonDecimal

// Problem 2

const mostCommonBit = (report, position, boolean, defaultVal) =>{
    let mostCommon = 0
    report.forEach(line =>{
        const bitArray = line.split('')
        if (bitArray[position] === '1') {
            mostCommon += 1
        } else {
            mostCommon -= 1
        }
    })
    if (mostCommon < 0 && boolean || mostCommon > 0 && !boolean) {
        // 0 is the most common bit or we want to know the least common
        return '0'
    } else if (mostCommon > 0 && boolean || mostCommon < 0 && !boolean) {
        // 1 is the most common bit in this position
        return '1'
    } else {
        // equal number of 1s and 0s
        return defaultVal
    }

}

const filterReport = (report, boolean, defaultVal) => {
    let index = 0
    while (report.length > 1) {
        const filterVal = mostCommonBit(report, index, boolean, defaultVal)
        const re = new RegExp(`^.{${index}}${filterVal}`)
        report = report.filter(str => str.match(re))
        index++
    }
    return report
    
}

O2Rate = filterReport(diagnosticReport, true, '1')
CO2Rate = filterReport(diagnosticReport, false, '0')

const O2Decimal = parseInt(O2Rate[0], 2)
const CO2Decimal = parseInt(CO2Rate[0], 2)

const solution2 = O2Decimal * CO2Decimal

console.log({solution1, solution2})