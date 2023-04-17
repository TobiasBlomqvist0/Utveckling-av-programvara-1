const button = document.querySelector("button")
const scoreSpan = document.querySelector("#score")
let generatedNumbers = []
let score = 0
let total = 7 

function chcekNumber(num) {
    generatedNumbers.map(Gnumber => Gnumber == num ? score++ : "")
}

button.addEventListener("click", () => {
    const guess = document.querySelectorAll("input")
    generatedNumbers = []
    score = 0
    total = 7

    for(let i = 0;i < total;i++) {
        let newNumber = Math.floor(Math.random() * 35)
        if(generatedNumbers.includes(newNumber) || newNumber == 0) {
            total++
        }
        else {
            generatedNumbers.push(newNumber)
        }
    }


    guess.forEach(gues => chcekNumber(gues.value))
    scoreSpan.innerText = "Antal rätt: " + score
    console.log(generatedNumbers)
})
