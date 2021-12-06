// Problem 1: How many points do at least 2 lines overlap? Consider horizontal / vertical lines only

const fs = require('fs')

// create coordinate List
const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
const coordinateList = []

input.forEach(line => {
    const coordinates = line.split(' -> ')
    let lineArray = []
    coordinates.forEach(point => {
        const pointArray = point.split(',').map(Number)
        lineArray.push(pointArray)
    })
   coordinateList.push(lineArray) 
})

// create line diagram for vertical/horizontal
const lineDiagram ={}
coordinateList.forEach(line =>{
    const p1x = line[0][0]
    const p1y = line[0][1]
    const p2x = line[1][0]
    const p2y = line[1][1]
    
    // line is horizontal
    if ( p1x === p2x ){
        // this is to deal with line direction
        let factor = 1
        if (p2y-p1y < 0) factor = -1

        for (let i = 0; i <= Math.abs(p2y-p1y); i++){

            // create the x key if it doesn't already exist
            if (!lineDiagram[`${p1x}`]){
                lineDiagram[`${p1x}`] = {}
            }

            lineDiagram[`${p1x}`][`${p1y + i * factor}`] = lineDiagram[`${p1x}`][`${p1y + i * factor}`] || 0
            lineDiagram[`${p1x}`][`${p1y + i * factor}`] += 1
        }
    }
    // line is vertical
    if ( p1y === p2y ){
        let factor = 1
        if (p2x-p1x < 0) factor = -1

        for (let i = 0; i <= Math.abs(p2x-p1x); i++){
            // create the x key if it doesn't already exist
            if (!lineDiagram[`${p1x +i * factor}`]){
                lineDiagram[`${p1x + i * factor}`] = {}
            }
            
            lineDiagram[`${p1x + i * factor}`][`${p1y}`] = lineDiagram[`${p1x + i * factor}`][`${p1y}`] || 0
            lineDiagram[`${p1x + i * factor}`][`${p1y}`] += 1
        }
    }
})

// count how many points where two or more lines overlap
let count = 0
 const yArrays = Object.values(lineDiagram)
 yArrays.forEach(element => {
     const innerArray = Object.values(element)
     innerArray.forEach(location =>{
         if (location > 1) count++
     })
 })

 // Problem 1 Solution
 console.log(count)