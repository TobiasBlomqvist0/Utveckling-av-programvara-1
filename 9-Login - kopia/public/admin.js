const logoutbtn = document.querySelector("button")
const h1 = document.querySelector("h1")

getUser()

function getUser() {    

    try {

        fetch("/api/getUser", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.text()
            )
            .then((data) => {
                console.log('Success:', data);
                h1.innerText = `Welcome ${data}`
            })
            .catch((error) => {
                console.log('Error:', error);
        });

    }
    catch(err) {
        console.log("Sorry something went very wrong!! ", err)
    }
}

logoutbtn.addEventListener("click", () => {
    fetch("/api/logout")
    location.replace("/")
})