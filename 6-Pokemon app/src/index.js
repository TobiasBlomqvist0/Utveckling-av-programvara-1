const express = require("express")
const server = express()

server.use(express.static(__dirname + "/../public"))

server.use(express.json())

// get the client
const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'pokemons'
});


server.get("/api/pokemons", (req,res) => {
  db.query(
    'SELECT * FROM pokemon',
    function(err, results, fields) {
      res.status(200).json(results)
    }
  )
})

server.post("/api/pokemon/searth", (req,res) => {
  console.log(req.body.value)
  db.query(
    'SELECT * FROM pokemon WHERE name LIKE ?',
    ["%" + req.body.value + "%"],
    function(err, results, fields) {
      console.log(results)
      res.status(200).json(results)
    }
  )
})


server.listen(3000, () => {
    console.log("Server online on PORT: 3000")
})