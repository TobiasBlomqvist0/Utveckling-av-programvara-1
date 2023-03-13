const todosBox = document.querySelector("#todos")
const btn = document.querySelector("button")

fetchTodos()

btn.addEventListener("click", () => {
    saveNewTodo()
})

async function fetchTodos() {
    const response = await fetch("/api/todos")
    const data     = await response.json()

    data.map(todo => todosBox.innerHTML += `
        <div class="todo" id="todo${todo.id}">
            <div class="todoInfo">
                <span class="todoName">${todo.name}</span>
                <span class="edit">Edit</span>
                <span class="todoDelete">X</span>
            </div>

            <div class="todoMessage">
                <span>${todo.todo}</span>
            </div>

        </div>
    `)
}


function saveNewTodo() {
    try {

        const todoName = document.querySelector("#todoName").value
        const todoMessage = document.querySelector("#todoMessage").value
        
        const data = {todo: todoName, todomsg: todoMessage}

        fetch("/api/newTodos", {
            method: 'POST',
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
                console.log('Error:', error);
        });

    }
    catch(err) {
        console.log("Sorry something went very wrong!!")
    }
}