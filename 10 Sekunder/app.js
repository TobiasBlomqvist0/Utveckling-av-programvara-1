const body = document.querySelector("body")

let secondsLeft = 10;

tick()

function tick() {
    if(secondsLeft > 0) {
        setTimeout(tick, 1000);
    }

    body.innerHTML = `
        <span>${secondsLeft} ${secondsLeft > 1 ? "Sekunder" : "Sekund"} </span>
    `
    secondsLeft --;
}
