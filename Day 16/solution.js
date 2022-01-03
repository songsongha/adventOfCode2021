// Problem 1: What is the sum of all the version numbers of the packets?

const fs = require('fs')
// make sure input doens't have \n in it.
const input = fs.readFileSync('./inputs.txt', 'utf8').trim()
console.log({input})

// convert from hexadecimal to binary
const hexToBinary = (hex) => {
    return [...hex].map((n) => parseInt(n, 16).toString(2).padStart(4, "0"))
      .join``;
  }

const binary = hexToBinary(input)
console.log({binary})
let versionCount = 0

//using negative 1 to avoid boolean issues
const parsePacket = (binary, totalSubPacket = -1) =>{
    console.log('parsePacket is called', binary)

        if (/^0+$/.test(binary)) {
            // If the packet is only zeros end loop
            console.log('packet is all zeros')
            // break
        } else {
            let remainingPacket = ''
            const version = parseInt(binary.slice(0,3),2)
            const id = parseInt(binary.slice(3,6),2)
            console.log({version})
            versionCount = versionCount + version
            console.log('in the loop versionCount',versionCount)
            console.log({id})
            // if packet is a literal
            if (id === 4){
                console.log('packet is a literal')
                let leadingBit = binary.slice(6,7)
                console.log({leadingBit})
                let literal = ''
                for (let i = 6; leadingBit !== 'done'; i += 5){
                    console.log('literal for loop called and leading bit is', leadingBit)
                    literal += binary.slice(i+1, i+5)
                    if (leadingBit === '0'){
                        remainingPacket = binary.slice(i+5)
                        console.log({remainingPacket})
                        leadingBit = 'done'
                    } else {
                        leadingBit = binary.slice(i+5, i+6)
                    }    
                }
                console.log('literal value',parseInt(literal,2))
            } else {
                // packet is an operator 
                const lengthId = binary.slice(6,7)
                console.log('packet is an operator with length ID of', lengthId)
                if (lengthId === '0'){
                    // next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet.
                    console.log('bitslice', binary.slice(7, 7+15))
                    let lengthOfSubPackets = parseInt(binary.slice(7, 7+15),2)
                    console.log({lengthOfSubPackets})
                    const subPacket = binary.slice(22, 22 + lengthOfSubPackets)
                    remainingPacket = binary.slice(22 + lengthOfSubPackets)
                    console.log({subPacket})
                    console.log({remainingPacket})
                    // parse subPackets
                    parsePacket(subPacket)
                } else {
                    // next 11 bits are a number that represents the number of sub-packets immediately contained by this packet
                    let noOfSubPackets = parseInt(binary.slice(7, 7+11),2)
                    const subPacket = binary.slice(18)
                    console.log({noOfSubPackets})
                    console.log({subPacket})
                    // parsePacket(subPacket,noOfSubPackets)
                }
            }
            // continue to call the function if there are remaining bits left
            if (remainingPacket.length > 0){
                parsePacket(remainingPacket)
            }
        }
        totalSubPacket--
        console.log({totalSubPacket})

}   

parsePacket(binary)
parsePacket('0000001100100000100011000001100000',3)
parsePacket('000001100000',2)
console.log('out of the loop versionCount',versionCount)