const editId = window.location.pathname.split("/")[2]

const input = document.querySelector("input")
const textarea = document.querySelector("textarea")
const button = document.querySelector("button")


fetchTodoId()

async function fetchTodoId() {
    const response = await fetch(`/api/editTodos/${editId}`)
    const data = await response.json()
  

    input.value = data[0].name
    textarea.value = data[0].todo
}

button.addEventListener("click", () => {
    const newInput = document.querySelector("input").value
    const NewTextarea = document.querySelector("textarea").value

    const data = {name: newInput, todo: NewTextarea, id: editId}
    console.log(data)

    fetch("/api/editTodo", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((data) => {
            console.log('Success:', data);
            window.location = "http://localhost:3000/"
        })
        .catch((error) => {
            console.log('Error:', error);
    });
})