const express = require("express")
const path = require("path")
const server = express()

server.use(express.static(__dirname + "/../public"))

server.use(express.json())

// get the client
const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'temperature'
});

server.get("/api/startingYear", (req,res) => {
    db.query (
        'SELECT * FROM temperature WHERE year LIKE ?',
        ["%" + 2021 + "%"],
        function(err, results, fields) {
            res.status(200).json(results)
        }
    )
})

server.get("/temperature/:year", (req,res) => {
    console.log("test")
    res.status(200).sendFile(path.resolve("public/weather.html"))
})

server.get("/api/temperature/:year", (req,res) => {
    db.query (
        'SELECT * FROM temperature WHERE year LIKE ?',
        ["%" + req.params.year + "%"],
        function(err, results, fields) {
            console.log(results)
            res.status(200).json(results)
        }
    )

})

server.listen(3000, () => {
    console.log("Server online on PORT: 3000")
})