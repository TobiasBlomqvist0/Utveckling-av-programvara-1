const express = require("express")
const server = express()
const path = require("path")
const mysql = require("mysql2")
const session = require('express-session')
const cookieParser = require("cookie-parser")

const bcrypt = require('bcrypt');
const saltRounds = 10;

const plaintextPassword = '';

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

server.use(express.urlencoded())
server.use(express.json())
server.use(cookieParser());
server.use(session({
    secret: 'your_secret_key',
    name: "sessionCookie",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


server.use(express.static(__dirname + "/../public"))
server.use(checkAuth)

function checkAuth(req, res, next) {
    let authCookie = req.cookies.user
    let allSession = JSON.stringify(req.sessionStore.sessions).split(":")[0].split('"')[1]
    console.log(allSession, " ", authCookie)
    
    if(allSession === authCookie) {
        res.redirect("/loggedin")
    }
    else {
        res.redirect("/")
    }
    
}

server.get("/loggedin",(req, res) => {

    res.status(200).sendFile(path.resolve("src/private/admin.html"))

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

                        const token = req.sessionID
                        res.cookie("user", token).end()
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
        "SELECT * FROM app_USER WHERE id LIKE ?",
        //FIX THIS dont use 1
        [1],
        function(err, results, fields) {
            res.status(200).send(results[0].username)
        }
    )
})

server.get("/api/logout", (req, res) => {
    req.session.user = {}
    res.status(200).end()
})

server.listen(3000, () => {
    console.log("Server online on PORT: 3000")
})