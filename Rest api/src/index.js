const express = require("express")
const server = express()
const path = require("path")

server.use(express.static(__dirname + "/../public"))

server.use(express.json())

const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "todos"
})

server.get("/api/todos", (req,res) => {
    db.query(
      'SELECT * FROM todo',
      function(err, results, fields) {
        res.status(200).json(results)
      }
    )
})

server.post("/api/newTodos", (req, res) => {

    db.query(
        "INSERT INTO todo(name, todo) VALUES(?,?)",
        [req.body.todo,req.body.todomsg],
        function(err, results, fields) {
            res.status(200).json(results)
        }
    )

})

server.delete("/api/removeTodos", (req, res) => {
    db.query(
        "DELETE FROM todo WHERE id = ?",
        [req.body.id],
        function(err, results, fields) {
            res.status(200).json(results)
        }
    )
})

server.get("/editTodos/:id", (req, res) => {
    res.status(200).sendFile(path.resolve("public/edit.html"))
})

server.get("/api/editTodos/:id", (req, res) => {
    db.query(
        "SELECT * FROM todo WHERE id LIKE ?",
        [req.params.id],
        function(err, results, fields) {
            res.status(200).json(results)
        }
    )
})

server.put("/api/editTodo", (req, res) => {
    db.query(
        "UPDATE todo SET name = ?, todo = ? WHERE id = ?",
        [req.body.name, req.body.todo, req.body.id],
        function(err, results, fields) {
            res.status(200).sendFile(path.resolve("public/index.html"))
        }
    )
})

server.listen(3000, () => {
    console.log("Server online on PORT: 3000")
})