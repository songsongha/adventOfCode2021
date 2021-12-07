// Problem 1: How many lantern fish would there be after 80 days?
// Problem 2: How many after 256 days?

const fs = require('fs')

// create array of fish timers
const fishInput = fs.readFileSync('./inputs.txt', 'utf8').split('\,').map(Number)

// made this so I wouldn't have to refactor the solution to Problem 1 (it modifies the original input array)
const fishInput2 = [...fishInput]

const calculateFish = (fishArray, days) =>{
    for (let day = 1; day <= days ; day++) {
        let addFish = 0
        for (let i = 0; i < fishArray.length; i++){
            if (fishArray[i] === 0){
                fishArray[i] = 6
                addFish += 1
            } else {
                fishArray[i] -= 1
            }
        }
        while (addFish > 0) {
            fishArray.push(8)
            addFish -=1
        }
    } 
    console.log(`There are ${fishArray.length} lantern fish after ${days} day(s)`)
}

// Problem 1 Solution
calculateFish(fishInput, 80)

// Problem 2 Solution - an issue with memeory at 256 days; need to rethink representation

const calculateFish2 = (fishInput, days) => {
// create an array where the index represents the timer status and the value is the number of fish with that status
 let fishStatusArray = new Array(9).fill(0)
 fishInput.forEach(fishStatus => {
        fishStatusArray[fishStatus] += 1
    })

 // increase fishCount
 const increaseFish = (fishArr) => {
    const tempArray = new Array(9)
    for (let timer = 0; timer <= 8 ; timer++) {
        if (timer === 6){
            tempArray[timer] =  fishArr[7] + fishArr[0]
        } else if (timer === 8) {
            tempArray[8] = fishArr[0]
        } else {
            tempArray[timer] = fishArr[timer+1]
        }
    }
    return tempArray
} 

for (let day = 1; day <= days ; day++) {
    fishStatusArray = increaseFish(fishStatusArray)
}
// total up the fish
let fishCounter = 0
fishStatusArray.forEach (fish => {
    fishCounter += fish
})

console.log(`There are ${fishCounter} lantern fish after ${days} day(s)`)
}

calculateFish2(fishInput2, 256)
