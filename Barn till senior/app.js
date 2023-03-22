const button = document.querySelector("button")
const h3 = document.querySelector("h3")


button.addEventListener("click", (e) => {
    e.preventDefault()
    const input = document.querySelector("input").value

    if(input <= 0) {
        h3.innerText = "Ange en giltig ålder"
    }
    else if(input <= 13) {
        h3.innerText = "Du är ett barn"
    }
    else if(input >= 13 && input <= 19) {
        h3.innerText = "Du är en tonåring"
    }
    else if(input >= 20 && input <= 64) {
        h3.innerText = "Du är en vuxen"
    }
    else {
        h3.innerText = "Du är en senior"
    }

})