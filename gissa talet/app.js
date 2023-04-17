const button = document.querySelector("button")
const span = document.querySelector("#svar")


button.addEventListener("click", () => {
    const input = document.querySelector("input").value
    const answer = Math.floor(Math.random() * 10)
    console.log(answer)

    if(answer == input) {
        span.innerText = "Du gissade: Rätt"
    }
    else {
        span.innerText = "Du gissade: Fell"
    }
})