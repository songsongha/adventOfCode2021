// Problem 1: How many points do at least 2 lines overlap? Consider horizontal / vertical lines only
// Problem 2: Consider diagonal lines,  the lines int he list are only ever horizontal, vertical or diagonal

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
    } else if ( p1y === p2y ){ // line is vertical
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
    } else { // line is diagonal - Problem 2 code addition
        let xfactor = 1
        let yfactor = 1
        if (p2x-p1x < 0) xfactor = -1
        if (p2y-p1y < 0) yfactor = -1

        for (let i = 0; i <= Math.abs(p2x-p1x); i++){ 
            // create the x key if it doesn't already exist
            if (!lineDiagram[`${p1x +i * xfactor}`]){
                lineDiagram[`${p1x + i * xfactor}`] = {}
            }
            
            lineDiagram[`${p1x + i * xfactor}`][`${p1y + i * yfactor}`] = lineDiagram[`${p1x + i * xfactor}`][`${p1y + i * yfactor}`] || 0
            lineDiagram[`${p1x + i * xfactor}`][`${p1y + i * yfactor}`] += 1
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

 // Problem 2 Solution
 console.log(count)