const button = document.querySelector("button")
const wrongUnameOrPword = document.querySelector("#wrongUnameOrPword")

button.addEventListener("click" , () => {
    adminLogin()
})

function adminLogin() {
    const usernameCheck = document.querySelector("#usernameCheck").value
    const passwordCheck = document.querySelector("#passwordCheck").value

    wrongUnameOrPword.innerHTML = ""

    const data = {username: usernameCheck, password: passwordCheck}

    try{
        fetch("/api/login", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((data) => {
                if(data.status === 403) {
                    wrongUnameOrPword.innerHTML = "Wrong username and or password"
                }
                else {
                    console.log('Success:', data);
                    location.replace(`/loggedin`)
                }
            })
            .catch((error) => {
                console.log('Error:', error);
        });
    }
    catch(err) {
        console.log(err)
    }
}