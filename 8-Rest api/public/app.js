const todosBox = document.querySelector("#todos")
const btn = document.querySelector("button")

fetchTodos()

btn.addEventListener("click", () => {
    saveNewTodo()
})

async function fetchTodos() {
    todosBox.innerHTML = ""
    const response = await fetch("/api/todos")
    const data     = await response.json()

    data.map(todo => todosBox.innerHTML += `
        <div class="todo" id="todo${todo.id}">
            <div class="todoInfo">
                <span class="todoName">${todo.name}</span>
                <span class="edit" onclick="editTodos(${todo.id})">Edit</span>
                <span class="todoDelete" onclick="removeTodo(${todo.id})">X</span>
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
                fetchTodos()
            })
            .catch((error) => {
                console.log('Error:', error);
        });

    }
    catch(err) {
        console.log("Sorry something went very wrong!!")
    }
}

function removeTodo(id) {
    try {
        const data = {id: id}

        fetch("/api/removeTodos", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                fetchTodos()
            })
            .catch((error) => {
                console.log('Error:', error);
        });

    }
    catch(err) {
        console.log("Sorry something went very wrong!!")
    }
}

function editTodos(id) {
    location.replace(`/api/editTodos/${id}`)
    location.replace(`/editTodos/${id}`)
}