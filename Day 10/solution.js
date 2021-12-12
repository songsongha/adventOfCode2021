// Problem 1: Find the corrupted inputs; find the first illegal character on each line and calculate the score

const fs = require('fs')
const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
console.log({input})

const illegalChar = []
input.forEach(line =>{
    let bracketOrder = []
    for(let i =0; i < line.length; i++) {
        switch (line[i]) {
            case '(':
                bracketOrder.push(line[i])
                break
            case ')':
                if (bracketOrder.pop() !== '('){
                    illegalChar.push(line[i])
                    i = line.length // stop checking line
                }
                break
            case '[':
                bracketOrder.push(line[i])
                break
            case ']':
                if (bracketOrder.pop() !== '['){
                    illegalChar.push(line[i])
                    i = line.length
                }
                break
            case '{':
                bracketOrder.push(line[i])
                break
            case '}':
                if (bracketOrder.pop() !== '{'){
                    illegalChar.push(line[i])
                    i = line.length
                }
                break
            case '<':
                bracketOrder.push(line[i])
                break
            case '>':
                if (bracketOrder.pop() !== '<'){
                    illegalChar.push(line[i])
                    i = line.length
                }
                break
        }
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