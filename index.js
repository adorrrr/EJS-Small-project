const express = require("express");
const app = express();
const port = 8080;
const path =require("path");

app.use(express.urlencoded({extended: true}))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));


let posts = [
    {
        id: "1a",
        username : "amarCollage",
        content : "I love my collage"
    },
    {
        id: "2b",
        username : "ador",
        content : "I love my mom"
    },
    {
        id: "3c",
        username : "monir",
        content : "I love my city"
    },
    {
        id: "4d",
        username : "fahim",
        content : "I am a good boy"
    },
]

app.get("/posts", (req, res) =>{
    res.render("index.ejs", {posts});
})

app.get("/posts/new", (req, res) =>{
    res.render("new.ejs", {posts});
})


app.post("/posts", (req, res) =>{
    let { username, content} = req.body;
    posts.push( { username, content} );
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) =>{
    let {id} =req.params;
    let post = posts.find((e) => id === e.id);
    res.render("show.ejs", {post});
})

app.listen(port,() =>{
    console.log("lisetening to signal");
})