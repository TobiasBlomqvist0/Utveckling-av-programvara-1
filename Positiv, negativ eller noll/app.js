const h3 = document.querySelector("h3")
const button = document.querySelector("button")


button.addEventListener("click", () => {
    const input = document.querySelector("input").value

    if(input > 0) {
        h3.innerText = "Talet är positivt"
        h3.className = "green"
    }
    else if(input == 0) {
        h3.innerText = "Talet är noll"
        h3.className = "blue"
    }
    else {
        h3.innerText = "Talet är negativt"
        h3.className = "red"
    }
})