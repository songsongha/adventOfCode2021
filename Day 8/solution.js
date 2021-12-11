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

// Problem 2: Add up the value of all the output values

// function that returns matching characters
const match = (str1, str2) => { 
    let match = ''
    if (str2){
        for (let i = 0; i < str2.length; i++) {
            // Traverse str2 char by char and check if they are present in str1
            if (str1 && str1.includes(str2[i])) 
                match += str2[i]
        }
    }
    return match
}


// function returns an array where the index indicates the number that the pattern is associated with
const determineNumbers = (signalPattern) => {
    const decodedArray = new Array(10)
    signalPattern.forEach((signal, index) =>{
        switch(signal.length) {
            case 2:
                // one is the only signal with length 2
                decodedArray[1] = signalPattern.slice(index, index+1)[0]
                break
            case 3:
                // seven is the only signal with length 3
                decodedArray[7] = signalPattern.slice(index, index+1)[0]
                break
            case 4:
                // four is the only signal with length 4
                decodedArray[4] = signalPattern.slice(index, index+1)[0] 
                break
            case 7:
                // eight is the only signal with length 7
                decodedArray[8] = signalPattern.slice(index, index+1)[0]
                break
        }
    })

    signalPattern.forEach((signal,index) => {
        if (signal.length === 5) {
            const matchOne = match(signal, decodedArray[1])
            if (matchOne.length === 2 ) {
                // three is the only  number with a length of 3 that matches both positions of 1, (two and five do not)
                decodedArray[3] = signalPattern.slice(index, index+1)[0]
            }
        }
        if (signal.length === 6) {
            const matchOne = match(signal, decodedArray[1])
            if (matchOne.length === 1) {
                // six is the only number with a length of 6 that does not match both positions of 1
                decodedArray[6] = signalPattern.slice(index, index+1)[0]
            }
        }
    })

    // position d is the segment that 3 and 4 have in common that is not in 1
    const matchThreeFour = match(decodedArray[3],decodedArray[4])
    let positionD = ''
    for (let i = 0; i < matchThreeFour.length; i++) {
        if (!decodedArray[1].includes(matchThreeFour[i])) 
            positionD = matchThreeFour[i]
    }

    // Number 9 has the length of 6 and contains positionD, number 0 is length 6 and does not have positionD
    signalPattern.forEach((signal, index) => {
        if (signal.length === 6 && signal !== decodedArray[6]) {
            const matchD = match(signal,positionD)
            if (matchD.length === 1){
                // nine
                decodedArray[9] = signalPattern.slice(index, index+1)[0]
            } else {
                // zero
                decodedArray[0] = signalPattern.slice(index, index+1)[0]
            }
            signalPattern.slice(index, index+1)
        }
    })

    // position e is the segment that zero has but 9 does not
    const match9 = match(decodedArray[0], decodedArray[9])
    let positionE = ''
    for (let i = 0; i < decodedArray[0].length; i++) {
        // This will check if characters in shared between 0 & 9 are present in zero
        if (!match9.includes(decodedArray[0][i])) 
            positionE = decodedArray[0][i] 
    }
    
    // Two has positionE, Five does not have positionE
    signalPattern.forEach((signal,index) => {
        if (signal.length === 5 && signal !== decodedArray[3] && signal.includes(positionE)){
            decodedArray[2] = signalPattern.slice(index, index+1)[0]
        } else if (signal.length === 5 && signal !== decodedArray[3]){
            decodedArray[5] = signalPattern.slice(index, index+1)[0]
        }
    })

    return decodedArray
}


// Problem 2 Solution
let outputSum = 0
notes.forEach((line) => {
    const decodedSignal = determineNumbers(line[0])
    let outputString = ''
    line[1].forEach(output => {
        // match the decoded signal to the output and use a string to track actual output
        decodedSignal.forEach((pattern, index) => {
            const matchOutput = match(output,pattern)
            if (matchOutput.length === output.length && matchOutput.length === pattern.length) {
                outputString += `${index}`
            }
        })
    })
    outputSum += Number(outputString)
})

console.log({outputSum})
