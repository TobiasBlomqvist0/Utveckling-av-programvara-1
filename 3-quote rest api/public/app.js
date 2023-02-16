const qouteBox = document.querySelector("#qoute")

fetchQoute()

async function fetchQoute() {
    const response = await fetch("/api/quote")
    const data  = await response.json()
    console.log(data)

    qouteBox.innerHTML = `
        <h1>"${data.quote}"</h1>
        <div class="author">
            <div class="authorLine"></div>
            <h3>${data.author}</h3>
            <div class="authorLine"></div>
        </div>

    `
}