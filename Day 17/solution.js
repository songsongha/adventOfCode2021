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


const velocity = {
    x: targetArea.x[0],
    y: targetArea.y[0]
}

const drag = (xVelocity) => {
    if (xVelocity > 0) return xVelocity - 1
    else if (xVelocity < 0) return xVelocity + 1
    else return 0
}

// returns maxY value unless probe never enters target area it returns undefined
const findMaxY = (position, velocity) =>{
    let withinTarget = false
    let maxY = position.y
    let loopCount = 0
    while (!withinTarget) {
        position.x += velocity.x 
        position.y += velocity.y 
        if (position.y > maxY) {
            maxY = position.y
        }
        if (position.x > targetArea.x[0] && position.x < targetArea.x[1] &&
            position.y > targetArea.y[0] && position.y < targetArea.y[1] ) {
                withinTarget = true
            }
        velocity.x = drag(velocity.x)
        velocity.y -= 1 
        loopCount++
        if (loopCount > 400){
            maxY = undefined
            break
        }
    }
    return maxY
}

const findInitialV = () => {
    let maxY = targetArea.y[0]
    for ( let i = 0; i < 2 * targetArea.x[1]; i++){
        for (let j = -125; j < Math.abs(targetArea.y[1]); j++){
            const newVelocity = {
                x: i,
                y: j
            }
            const position = {
                x: 0,
                y: 0
            }
            
            const yPosition = findMaxY(position, newVelocity)
            if (yPosition && yPosition > maxY){
                maxY = yPosition
                console.log({maxY})
                console.log({newVelocity})
            }
            newVelocity.y++
        }
    }
    console.log('This is the max Y', maxY)
}

findInitialV()