// Problem 1: After 10 steps what is the difference between the number of the most common element and the least common element?
// Problem 2: After 40?

const fs = require('fs')

const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')

let template = input.shift()
input.shift()

const insertGuide = Object.fromEntries(input.map(entry => {
    return entry.split(' -> ')
}))

const insertPolymerCount = (count, guide) => {    
    const { pairs, letters } = count
    const newCount = {
        pairs: {},
        letters
    }

    const pairsArray = Object.keys(pairs)
    for(let i = 0; i < pairsArray.length; i++){
        // look up the pair in the guide
        const insertStr = guide[pairsArray[i]]  
        // increase letter count by the number of times the pair is seen
        if (newCount.letters[insertStr] === undefined) {
            newCount.letters[insertStr] = pairs[pairsArray[i]]
        } else {
            newCount.letters[insertStr] = newCount.letters[insertStr] + pairs[pairsArray[i]]
        }
        // create and count new pairs
        const newPair1 = pairsArray[i].slice(0,1) + insertStr
        const newPair2 = insertStr + pairsArray[i].slice(1,2)
        if (newCount.pairs[newPair1] === undefined) {
            newCount.pairs[newPair1] = pairs[pairsArray[i]]
        } else {
            newCount.pairs[newPair1] = newCount.pairs[newPair1] + pairs[pairsArray[i]]
        }
        if (newCount.pairs[newPair2] === undefined) {
            newCount.pairs[newPair2] = pairs[pairsArray[i]]
        } else {
            newCount.pairs[newPair2] = newCount.pairs[newPair2] + pairs[pairsArray[i]]
        }
    }
    return newCount
}


const insertPolymers = (steps) => {
    let count = {
        pairs: {},
        letters: {}
    }
    // put the template count into an object
    for (let i = 0; i < template.length -1; i++) {
        if (count.pairs[template.slice(i,i+2)] === undefined) {
            count.pairs[template.slice(i,i+2)] = 1
        } else {
            count.pairs[template.slice(i,i+2)] += 1
        }
        if (count.letters[template.slice(i,i+1)] === undefined) {
            count.letters[template.slice(i,i+1)] = 1
        } else {
            count.letters[template.slice(i,i+1)] += 1
        }
    }
    if (count.letters[template.slice(-1)] === undefined) {
        count.letters[template.slice(-1)] = 1
    } else {
        count.letters[template.slice(-1)] += 1
    }
    
    // insert polymers
    for( let step = 0; step < steps; step ++) {
        count = insertPolymerCount(count, insertGuide)
    }

    const max = Object.keys(count.letters).reduce((a, b) => count.letters[a] > count.letters[b] ? a : b)
    const min = Object.keys(count.letters).reduce((a, b) => count.letters[a] < count.letters[b] ? a : b)
 
    const solution = count.letters[max] - count.letters[min]

    return solution
}

p1Solution = insertPolymers(10)
console.log({p1Solution})

p2Solution = insertPolymers(40)
console.log({p2Solution})