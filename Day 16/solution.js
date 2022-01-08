// Problem 1: What is the sum of all the version numbers of the packets?

const fs = require('fs')
// make sure input doens't have \n in it.
const input = fs.readFileSync('./inputs.txt', 'utf8').trim()

// convert from hexadecimal to binary
const hexToBinary = (hex) => {
    return [...hex].map((n) => parseInt(n, 16).toString(2).padStart(4, "0"))
      .join``;
  }

const binary = hexToBinary(input)
let versionCount = 0
// let parseCall = 0

//using negative 1 to avoid boolean issues
const parsePacket = (binary, totalSubPacket = -1) =>{
    let remainingPacket = ''

    do{
        if (/^0+$/.test(binary) || binary === '') {
            // If the packet is only zeros or an empty string end loop
            break
        } else {
            const version = parseInt(binary.slice(0,3),2)
            const id = parseInt(binary.slice(3,6),2)
            versionCount = versionCount + version

            // if packet is a literal
            if (id === 4){
                let leadingBit = binary.slice(6,7)
                let literal = ''
                for (let i = 6; leadingBit !== 'done'; i += 5){
                    literal += binary.slice(i+1, i+5)
                    if (leadingBit === '0'){
                        remainingPacket = binary.slice(i+5)
                        leadingBit = 'done'
                    } else {
                        leadingBit = binary.slice(i+5, i+6)
                    }    
                }
                const value = parseInt(literal,2) //return value
                console.log({ value })
            } else {
                // packet is an operator 
                switch(id) {
                    case 0: 
                      // sum packet - value is sum of all subpackets
                      break
                    case 1:
                      // product packet - value is product of all subpackets
                      break
                    case 2:
                      // minimum packet - value is the minimum of all subpackets
                      break
                    case 3:
                      // maximum packet - value is the maximum of all subpackets
                      break
                    case 5:
                      // greater than packet - always 2 subpackets, if first packet is greater than second, value is 1 otherwise 0
                      break
                    case 6:
                      // less than packet - always 2 subpackets, if first packet is less than second, value is 1 otherwise 0
                      break
                    case 7:
                      // equal to packet - always 2 subpackets, if packets equal value is 1 otherwise 0
                      break
                    default:
                      console.log('unknown id',id)
                  }
                  
                const lengthId = binary.slice(6,7)
                if (lengthId === '0'){
                    // next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet.
                    const lengthOfSubPackets = parseInt(binary.slice(7, 7+15),2)
                    const subPacket = binary.slice(22, 22 + lengthOfSubPackets)
                    remainingPacket = binary.slice(22 + lengthOfSubPackets)
                    // parse subPackets
                    parsePacket(subPacket)
                } else {
                    // next 11 bits are a number that represents the number of sub-packets immediately contained by this packet
                    let noOfSubPackets = parseInt(binary.slice(7, 7+11),2)
                    const subPacket = binary.slice(18)
                    remainingPacket = parsePacket(subPacket,noOfSubPackets)
                }
            }
        }
        binary =  remainingPacket
        totalSubPacket--
    } while (totalSubPacket > 0)
        // continue to call the function if there are remaining bits left
        if (remainingPacket.length > 0){
            remainingPacket = parsePacket(remainingPacket)
        }
        
        return remainingPacket
}   

parsePacket(binary)

console.log('total versionCount',versionCount)