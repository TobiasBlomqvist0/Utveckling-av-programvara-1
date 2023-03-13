const container = document.querySelector("#container")
const score = document.querySelector("#score")
const moves = ["Sten", "Sax", "Påse"]
let number = 0
let myMove
let botMove

const sten = document.querySelector("#sten")
const sax  = document.querySelector("#sax")
const pose = document.querySelector("#pose")

moves.map(move => writeButtons() )

function writeButtons() {
    container.innerHTML += `
        <button onclick="test(${number})">${moves[number]}</button>
    `;
    number++
}



function test(num) {
    myMove = moves[num]
    getBotMove()

    //My WINS!!!
    if(myMove === "Sten" && botMove === "Sax") {
        score.innerText = "You Win!"
    }
    if(myMove === "Sax" && botMove === "Påse") {
        score.innerText = "You Win!"
    }
    if(myMove === "Påse" && botMove === "Sten") {
        score.innerText = "You Win!"
    }
    //Bots WINS!!!
    if(botMove === "Sten" && myMove === "Sax") {
        score.innerText = "You Lose!"
    }
    if(botMove === "Sax" && myMove === "Påse") {
        score.innerText = "You Lose!"
    }
    if(botMove === "Påse" && myMove === "Sten") {
        score.innerText = "You Lose!"
    }

    //DRAW!!!
    if(myMove === "Sten" && botMove === "Sten" || myMove === "Sax" && botMove === "Sax" || myMove === "Påse" && botMove === "Påse") {
        score.innerText = "Draw!"
    }
}

function getBotMove() {
    const moveInNumber = Math.floor(Math.random()* 3)

    botMove = moves[moveInNumber]
}