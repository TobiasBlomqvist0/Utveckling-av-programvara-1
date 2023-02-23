const express = require("express")
const server = express()

server.use(express.static(__dirname + "/../public"))

server.use(express.json({extended: true, limit: '1mb'}))

let newId = 2

let Messages = [
    {msg: "Hello World", timeStamp: "2023-02-16 08:23:48", id: 1}
]

server.get("/api/messages", (req, res) => {
    res.status(200).json(Messages.map(message => ({
        msg: message.msg,
        timeStamp: message.timeStamp,
        id: message.id
    })))
})

server.post("/api/messages", (req, res) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    const currentTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second

    
    const newMessage = {msg: req.body.msg, timeStamp: currentTime, id: newId}
    Messages.push(newMessage)

    console.log(Messages)

    newId += 1;
    res.status(200).json(newMessage)
})

server.listen(3000, () => {
    console.log("Server online on PORT: 3000")
})