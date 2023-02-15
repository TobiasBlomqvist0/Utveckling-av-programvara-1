const express = require("express")
const server = express()

server.get("/hello", (req, res) => {
    res.status(200).send("Hej på dig!")
})

server.listen(3000, () => {
    console.log("Server Online on PORT: 3000")
})