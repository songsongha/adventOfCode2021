// Problem 1: After 10 steps what is the difference between the number of the most common element and the least common element?

const fs = require('fs')

const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')

let template = input.shift()
input.shift()

const insertGuide = Object.fromEntries(input.map(entry => {
    return entry.split(' -> ')
}))

const insertPolymer = (template, guide) => {
    let str = template[0]
    
    for (let i = 0; i < template.length -1; i++) {
        const insertStr = guide[template.slice(i,i+2)]
        str = str + insertStr + template[i+1]
    }
    return str
}

for( let step = 0; step < 10; step ++) {
    template = insertPolymer(template, insertGuide)
}

// count the elements
const counter = {}
for(let i = 0; i < template.length; i++){
    if (counter[template[i]] === undefined) {
        counter[template[i]] = 1
    } else {
        counter[template[i]] += 1
    }
}
console.log({counter})
const max = Object.keys(counter).reduce((a, b) => counter[a] > counter[b] ? a : b)
const min = Object.keys(counter).reduce((a, b) => counter[a] < counter[b] ? a : b)

const p1Solution = counter[max] - counter[min]
console.log({p1Solution})