// Problem 1: What is the sum of all the version numbers of the packets?

const fs = require('fs')
// make sure input doens't have \n in it.
const input = fs.readFileSync('./inputs.txt', 'utf8').trim()
console.log({input})

// convert from hexadecimal to binary
const binary = parseInt(input, 16).toString(2)
console.log({binary})

// separate into packets
const version = parseInt(binary.slice(0,3),2)
const id = parseInt(binary.slice(3,6),2)
console.log({version})
console.log({id})
// if packet is a literal
if (id === 4){
    let leadingBit = binary.slice(6,7)
    console.log({leadingBit})
    let literal = ''
    for (let i = 6; leadingBit !== 'done'; i += 5){
        console.log({i})
        console.log('slice', binary.slice(i+1, i+5))
        literal += binary.slice(i+1, i+5)
        console.log({literal})
        leadingBit === '0' ? leadingBit = 'done' : leadingBit = binary.slice(i+5, i+6)
        console.log({leadingBit})
    }
    console.log({literal})
    console.log(parseInt(literal,2))
} else {
    // packet is an operator 
}