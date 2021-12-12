// Problem 1: Find the corrupted inputs; find the first illegal character on each line and calculate the score

const fs = require('fs')
const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
console.log({input})

const illegalChar = []
const incompleteScore = []
input.forEach(line =>{
    let bracketOrder = []
    checks:{
        for(let i =0; i < line.length; i++) {
            switch (line[i]) {
                case '(':
                    bracketOrder.push(line[i])
                    break
                case ')':
                    if (bracketOrder.pop() !== '('){
                        illegalChar.push(line[i])
                        break checks // stop checking line
                    }
                    break
                case '[':
                    bracketOrder.push(line[i])
                    break
                case ']':
                    if (bracketOrder.pop() !== '['){
                        illegalChar.push(line[i])
                        break checks
                    }
                    break
                case '{':
                    bracketOrder.push(line[i])
                    break
                case '}':
                    if (bracketOrder.pop() !== '{'){
                        illegalChar.push(line[i])
                        break checks
                    }
                    break
                case '<':
                    bracketOrder.push(line[i])
                    break
                case '>':
                    if (bracketOrder.pop() !== '<'){
                        illegalChar.push(line[i])
                        break checks
                    }
                    break
            }
        }  
        // if the check hasn't been broken then the line is incomplete not corrupt
        let score = 0 
        for(let i = bracketOrder.length-1; i >= 0; i--) {
            switch(bracketOrder[i]){
                case '(':
                    score = score * 5 + 1
                    break
                case '[':
                    score = score * 5 + 2
                    break
                case '{':
                    score = score * 5 + 3
                    break
                case '<':
                    score = score * 5 + 4
                    break

            }
        }
        incompleteScore.push(score)
    }
})

let points = 0
illegalChar.forEach(char =>{
    switch (char){
        case ')':
            points += 3
            break
        case ']':
            points += 57
            break 
        case '}':
            points+= 1197
            break 
        case '>':
            points+= 25137
            break
    }
})

console.log({points})

incompleteScore.sort((a, b) => a - b)
const median = incompleteScore[Math.floor(incompleteScore.length/2)]

console.log({median})