const Terning = document.querySelector("#Terning")
const btn = document.querySelector("button")

const numbers = ["one", "two", "three", "four", "five", "six"]

btn.addEventListener("click", () => {
    let num = Math.floor(Math.random()* 6)

    Terning.innerHTML = `
        <img src="img/${numbers[num]}.png" alt="${numbers[num]} Ternings sida">
    `
})