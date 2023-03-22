const express = require("express")
const server = express()
const path = require("path")
const mysql = require("mysql2")
const session = require('express-session')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const plaintextPassword = "";

// To create a new password from plaintextPassword
/*
bcrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
    console.log(hash)
});
*/

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "login"
})

server.use(express.static(__dirname + "/../public"))
server.use(express.json())
server.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


server.get("/loggedin", (req, res) => {
    const user = req.session.user;
    if(user) {
        if(user.role === "admin") {
            res.status(200).sendFile(path.resolve("src/private/admin.html"))
        }
        else {
            res.redirect("back")
        }
    }
    else {
        res.redirect("back")
    }
})

server.post("/api/login", (req, res) => {
    let inputPassword = req.body.password
    
    db.query(
        "SELECT * FROM app_user WHERE username LIKE ?",
        [req.body.username],
        function(err, results, fields) {
            if(results.length <= 0) {
                res.status(403).send("Sorry Wrong username and or password")
            }
            else {
                bcrypt.compare(inputPassword, results[0].password, (err, result) => {
                    if (result) {
                        const values = {role: `${results[0].role}`, id: `${results[0].id}`}
                        req.session.user = values;
                        res.status(200).end()
                    } else {
                        res.status(403).send("Sorry Wrong username and or password")
                    }
                });
            }
        }
    )
})

server.post("/api/getUser", (req, res) => {
    const user = req.session.user
    db.query(
        "SELECT * FROM app_user WHERE id LIKE ?",
        [user.id],
        function(err, results, fields) {
            
            const values = [{name: results[0].username}]

            db.query(
                "SELECT * FROM todos WHERE user_id LIKE ?",
                [user.id],
                function(err2, results2, fields2) {
                    results2.map(todo => values.push(todo))
                    res.status(200).send(values)
                }
            )
        }
    )
})

server.get("/api/logout", (req, res) => {
    req.session.user = {}
    res.status(200).end()
})

server.post("/api/newTodo", (req, res) => {
    db.query(
        "INSERT INTO todos(todoname, todoinfo, user_id) VALUES(?, ?, ?)",
        [req.body.todoname, req.body.todoinfo, req.session.user.id],
        function(err, results, feilds) {
            res.status(200).send("New todo")
        }
    )
})

server.delete("/api/removeTodo", (req, res) => {
    db.query(
        "DELETE FROM todos WHERE id = ?",
        [req.body.id],
        function(err, results, fields) {
            res.status(200).send(`Your todo was removed`)
        }
    )
})

server.listen(3000, () => {
    console.log("Server online on PORT: 3000")
})