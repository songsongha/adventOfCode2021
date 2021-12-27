// Problem 1: How many paths are there through the cave that only go through small caves once?
// Problem 2: If you can enter one of the small caves twice how many paths are there now?

const fs = require('fs')
const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
console.log({input})
const caves = input.map(link =>{
    return link.split('-')
})

console.log({caves})

// returns an array of all the caves connected to a particular cave
const findPathways = (caves, searchParam) => {
    const pathways = []
    caves.forEach (link => {
        if (link.find(cave => cave === searchParam)){
            if (link.find(cave => cave !== searchParam) !== 'start') {
            pathways[pathways.length] = link.find(cave => cave !== searchParam)
            }
        }
    })
    return pathways
}

const isLowerCase = (str) => {
     if (str == str.toLowerCase()){
        return true
     } else {
        return false
     }
}

// build all pathways
let queue = [['start']]
let endPathCounter = 0
while (queue.length > 0) {
let tempRoute = []
    queue.forEach(pathArray => {
        let pathways = findPathways(caves, pathArray[pathArray.length-1])
        pathways.forEach(option => {
            if (option === 'end'){
                // count the path
                endPathCounter++
            } else if (isLowerCase(option) && pathArray.find(cave => cave === option)){
                // if the path is a small cave and already exists in the route then check if there is a duplicate already, if so get rid of it
                let tempArray = [...pathArray]
                let isDuplicate = false
                while (tempArray.length > 0) {
                    let searchParam = tempArray.pop()
                    if (isLowerCase(searchParam) && tempArray.find(cave => cave === searchParam)){
                        // there is a dupliicate 
                        isDuplicate = true
                    } 
                }
                if (!isDuplicate){
                    // if there is no duplicate then add it to the array
                    tempRoute[tempRoute.length] = [...pathArray, option]
                }
            } else {
                // add it to the queue
                tempRoute[tempRoute.length] = [...pathArray, option]
            }
        })
    }) 
    queue = [...tempRoute]
}
console.log({endPathCounter})
