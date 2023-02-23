const express = require("express")
const server = express()

server.use(express.static(__dirname + "/../public"))

// get the client
const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'gamesdb'
});

// simple query
db.query(
  'SELECT * FROM games',
  function(err, results, fields) {
    server.get("/api/games", (req,res) => {
		res.status(200).json(results)
	})
  }
);

server.listen(3000, () => {
    console.log("Server online on PORT: 3000")
})