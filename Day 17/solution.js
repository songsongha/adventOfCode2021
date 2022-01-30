// Problem 1: determine the highest arc that will still land in target area. What is the highest y position value?
// initial position is 0, 0.  Solve for x, y velocity
// The probe's x position increases by its x velocity.
// The probe's y position increases by its y velocity.
// Due to drag, the probe's x velocity changes by 1 toward the value 0; that is, 
//      it decreases by 1 if it is greater than 0, increases by 1 if it is less than 0, or does not change if it is already 0.
// Due to gravity, the probe's y velocity decreases by 1.

const fs = require('fs')
const input = fs.readFileSync('./inputs.txt', 'utf8').replace('target area: ', '').split(', ')
console.log({input})
const targetArea = {
    x: input[0].replace('x=', '').split('..').map(Number),
    y: input[1].replace('y=', '').split('..').map(Number)
}
console.log({targetArea})


// const velocity = {
//     x: targetArea.x[0],
//     y: targetArea.y[0]
// }

const drag = (xVelocity) => {
    if (xVelocity > 0) return xVelocity - 1
    else if (xVelocity < 0) return xVelocity + 1
    else return 0
}
const findMaxY = (velocity) => {
    // physics equation for finding height of an object based on velocity, discrete heights
    const maxY = velocity.y * (velocity.y + 1)/ 2 
    if (maxY === 7626) console.log({velocity})
    // console.log({maxY})
    return maxY
}

// returns maxY value unless probe never enters target area it returns undefined
const physics = (position, velocity) =>{
    let withinTarget = false
    const initialVelocity = {...velocity}
    let loopCount = 0
    while (!withinTarget) {
        position.x += velocity.x 
        position.y += velocity.y 
        // if (position.y > maxY) {
        //     maxY = position.y
        // }
        if (position.x > targetArea.x[0] && position.x < targetArea.x[1] &&
            position.y > targetArea.y[0] && position.y < targetArea.y[1] ) {
                withinTarget = true
                return findMaxY(initialVelocity)
            }
        velocity.x = drag(velocity.x)
        velocity.y -= 1 
        loopCount++
        if (loopCount > 400){
            return undefined
            break
        }
    }
}

const findInitialV = () => {
    let maxY = targetArea.y[0]
    for ( let i = 0; i < 3 * targetArea.x[1]; i++){
        // console.log({i})
        for (let j = -125; j < Math.abs(targetArea.y[1]); j++){
            const velocity = {
                x: i,
                y: j
            }
            
            const position = {
                x: 0,
                y: 0
            }
            
            const yPosition = physics(position, velocity)
            if (yPosition && yPosition > maxY){
                maxY = yPosition
                console.log({maxY})
                console.log({i})
            }
        }
    }
    console.log('This is the max Y', maxY)
}

findInitialV()
const n = -1 * targetArea.y[0] - 1
console.log({n})
const solution = n * (n+1) / 2
console.log({solution})
