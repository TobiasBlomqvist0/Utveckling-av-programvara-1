const express = require("express")
const server = express()

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
    console.log(req.body.todo, req.body.todomsg)
    db.query(
        "INSERT INTO todo('name', 'todo') VALUES(?,?)",
        [req.body.todo,req.body.todomsg],
        function(err, results, fields) {
            console.log(err)
            res.status(200).json(results)
        }
    )

})

server.listen(3000, () => {
    console.log("Server online on PORT: 3000")
})