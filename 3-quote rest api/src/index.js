const express = require("express")
const server = express()
const quotes = require("./data/quotes.json")

server.use(express.static(__dirname + "/../public"))

server.get("/api/quote", (req,res) => {
    const randomQoute = quotes[Math.floor(Math.random() * quotes.length)]
    res.status(200).send(randomQoute)
})


server.listen(3000, () => {
    console.log("Server online on PORT: 3000")
})