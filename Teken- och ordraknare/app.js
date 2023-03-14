const textArea = document.querySelector("textarea")
const span = document.querySelector("span")

let TekenAmount = 125

textArea.addEventListener("input", () => {

    if(textArea.value.length > TekenAmount) {
        alert("Sorry but message will be to long")
        let str = textArea.value
        let strMax = str.substring(0, 50)
        textArea.value = strMax
    }
    else {
        span.innerText = textArea.value.length + " / " + TekenAmount
    }
})