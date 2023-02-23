const btn = document.querySelector("button")
const messages = document.querySelector("#messages")

let myMessages = []

fetchMessages()

setInterval(fetchMessages, 5000)

btn.addEventListener("click", () => {
    sendMessages()
    fetchMessages()
})


function sendMessages() {
    try {
        const value = document.querySelector("#msg").value
        const data = {msg: value}
        
        fetch("/api/messages", {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                myMessages.push(data)
            })
            .catch((error) => {
                console.error('Error:', error);
        });
    }
    catch(err) {
        alert("Sorrt a ERROR happend with sending the message")
    }
        
}

async function fetchMessages() {
    try{
        const response = await fetch("/api/messages")
        const data = await response.json()
    
        
        messages.innerHTML = ""
        data.map(msg => messages.innerHTML += `
        <div class="messageDiv">
            <div class=" ${myMessages.find(myMessage => myMessage.id == msg.id) ? "blueColor" : "messageSqure"}">
                <span class="messageTimeStamp">${msg.timeStamp}</span>
                <span class="message"> ${msg.msg}</span>
            </div>
        </div>
        
        `)
    }

    catch(err){
        alert("Sorry a ERROR happend with getting new messages:")
    }
}