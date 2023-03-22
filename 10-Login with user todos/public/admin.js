const todoBox = document.querySelector("#todos")
const logoutbtn = document.querySelector("button")
const newTodoButton = document.querySelector("#newtodobutton")
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
            .then(response => response.json()
            )
            .then((data) => {
                console.log('Success:', data);
                h1.innerText = `Welcome ${data[0].name}`
                writeTodos(data)
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

function writeTodos(data) {
    let todos = data
    todos.shift()
    
    todoBox.innerHTML += todos.map(todo => `
        <div class="todo">
            <div>
                <span class="todoName">${todo.todoname}</span>
                <span class="remove" onclick="removeTodo(${todo.id})">X</span>
            </div>
        
            <hr>
            <p class="todoInfo">${todo.todoinfo}</p>
        </div>
    `).join("")
}

newTodoButton.addEventListener("click", () => {
    newTodo()
})

function newTodo() {
    const newTodoName = document.querySelector("#todoname").value
    const newTodoInfo = document.querySelector("#todoinfo").value

    const data = {todoname: newTodoName, todoinfo: newTodoInfo}
    console.log(data)

    if(newTodoName <= 0 || newTodoInfo <= 0) {
        alert("Please write something aswell")
    }
    else {

        try {
            fetch("/api/newTodo", {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((data) => {
                console.log(data)
                alert("Your new todo was added")
                location.replace(`/loggedin`)
            })
            .catch((error) => {
                console.log('Error:', error);
            });
        }
        catch(err) {
            console.log(err)
        }
    }
}
    
    function removeTodo(id) {
        
        const data = {id: id}

    try{
        fetch("/api/removeTodo", {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((data) => {
                alert("One of your todos was removed")
                location.replace(`/loggedin`)
            })
            .catch((error) => {
                console.log('Error:', error);
        });
    }
    catch(err) {
        console.log(err)
    }
}