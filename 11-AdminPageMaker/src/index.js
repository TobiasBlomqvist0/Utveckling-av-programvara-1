const express = require("express")
const server = express()
const { db } = require("./db")
const path = require("path")
const cookieParser = require("cookie-parser")

server.set('view engine', 'ejs')
server.use(express.urlencoded({ extended: false }))
server.use(express.static(path.join('./public')));
server.use(cookieParser());

server.get("/", async (req, res) => {
    let links;
    db.query(
        "SELECT * FROM links",
        function(err, results, fields) {
            links = results
            res.render("index", {link: links})
        }
    )    
})

server.get("/api/viewPage/:id", (req, res) => {
    db.query(
        "SELECT * FROM links WHERE id LIKE ?",
        [req.params.id],
        function(err, results, fields) {
            res.render("page", {page: results[0]})
        }
    )
})

server.get("/login", (req, res) => {
    res.render("login")
})

server.post("/api/login", (req, res) => {
    db.query(
        "SELECT * FROM users WHERE email LIKE ?",
        [req.body.email],
        function(err, results, fields) {
            if(results.length <= 0) {
                res.status(403).send("Sorry wrong email and or password")
            }
            else {
                if(req.body.password === results[0].password) {
                    const token = {name: results[0].name, loggedIn: true}
                    res.status(200).cookie("user", token).redirect("/loggedin")
                }
                else {
                    res.status(403).send("Wrong email and or password")
                }
            }
        }
    )
})

server.get("/loggedin", checkLoggedIn, (req, res) => {
    const token = req.cookies

    db.query (
        "SELECT * FROM links",
        function(err, results, fields) {
            res.render("loggedin", {name: token.user.name, links: results})
        }
    )


})


function checkLoggedIn(req, res, next) {
    const token = req.cookies
    if(token.user == undefined) {
        res.redirect("/login")
    }
    else if(token.user.loggedIn) {
        return next()
    }
    
    res.redirect("/login")
}

server.listen(3000, () => {
    console.log("Server online on PORT: 3000 || http://localhost:3000/")
})