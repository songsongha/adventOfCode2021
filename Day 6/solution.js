// Problem 1: How many lantern fish would there be after 80 days?
// Problem 2: How many after 256 days?

const fs = require('fs')

// create array of fish timers
const fishArray = fs.readFileSync('./inputs.txt', 'utf8').split('\,').map(Number)

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
calculateFish(fishArray, 80)
