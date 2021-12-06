// Problem 1: Play Bingo - find the winning card and calculate the score
// Do not check diagonals

const fs = require('fs')

// separate the numbers called from the bingo cards in the input file and convert to Numbers
const input = fs.readFileSync('./inputs.txt', 'utf8').split('\n')
const callNums = input.shift(0).split(',').map(Number)

const rows = input.map((element) =>{
    if (element !== ''){
        return element.split(' ').filter(val => val !== '').map(Number)
    } 
})

// create bingoCard nested array
let index1 = 0
let index2 = 0
let bingoCards = []
let card = []
while (index1 < rows.length) {
    if (index1 % 6 !== 0){
        card.push(rows[index1])
    }
    if (card.length === 5){
        bingoCards.push([...card])
        card = []
        index2++
    } 
    index1++
}

// a winner is a card with all one row marked or the same position on every row
const isWinner = (card) => {
    let vertIndex = 0
    let horizIndex = 0
    let horizNullcounter = 0
    let vertNullcounter = [0,0,0,0,0]
    let winner = false
    while (vertIndex < 5){
        while(horizIndex < 5){
            if(card[vertIndex][horizIndex] === null){
                horizNullcounter++
                vertNullcounter[horizIndex] += 1 
                if (horizNullcounter === 5 || vertNullcounter[horizIndex] === 5 ) {
                    winner = true
                }
            }
            horizIndex++
        } 
        horizIndex = 0
        horizNullcounter = 0
        vertIndex++
    } 
    return winner
}

const playBingo = (callNums, bingoCards)=> {
    let callNumIndex = 0
    let cardIndex = 0
    let rowIndex = 0
    let columnIndex = 0
    while (callNumIndex < callNums.length){
        while (cardIndex < bingoCards.length){
            while (rowIndex < 5){
                while (columnIndex < 5) {
                    if (bingoCards[cardIndex][rowIndex][columnIndex] === callNums[callNumIndex]){
                        bingoCards[cardIndex][rowIndex][columnIndex] = null
                        if (callNumIndex > 5){
                            if (isWinner(bingoCards[cardIndex])){
                                // BINGO!
                                return { 
                                    winningCard: bingoCards[cardIndex],
                                    lastCall: callNums[callNumIndex],
                                    cardIndex
                                }
                            }
                        }
                    }
                    columnIndex++
                }
                columnIndex = 0
                rowIndex++
            }
            rowIndex = 0
            cardIndex++
        }
        cardIndex = 0
        callNumIndex++
    }
    // no winner
    return undefined 
}

// determine winning card
const results = playBingo(callNums, bingoCards)

// calculate score of winning card
const scoreCard = (results) => {
    let score = 0
    if (results){
        results.winningCard.forEach(row => {
            row.forEach(num => {
                score += num
            })
        })
        return score * results.lastCall
    }
}

const winningCardScore = scoreCard(results)

// Solution to problem 1
console.log({winningCardScore})

// Problem 2 - Pick the card that will win last
while (bingoCards.length > 1){
    const result = playBingo(callNums, bingoCards)
    bingoCards.splice(result.cardIndex, 1)
}

const lastWinner = playBingo(callNums, bingoCards)

// calculate score of last winning card
const lastWinnerScore = scoreCard(lastWinner)

console.log({lastWinnerScore})

