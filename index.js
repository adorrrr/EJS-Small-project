const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOberride = require("method-override");

const { v4: uuidv4 } = require('uuid');


app.use(methodOberride('_method'))
app.use(express.urlencoded({extended: true}))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));


let posts = [
    {
        id: uuidv4(),
        username : "amarCollage",
        content : "I love my collage"
    },
    {
        id: uuidv4(),
        username : "ador",
        content : "I love my mom"
    },
    {
        id: uuidv4(),
        username : "monir",
        content : "I love my city"
    },
    {
        id: uuidv4(),
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
    let id = uuidv4();
    posts.push( { id, username, content} );
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) =>{
    let {id} =req.params;
    let post = posts.find((e) => id === e.id);
    res.render("show.ejs", {post});
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;

    let post = posts.find((e) => e.id === id);
    post.content = newContent;
    res.redirect("/posts");
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((e) => e.id === id);

});

app.get("/posts/:id/edit", (req, res) =>{
    let {id} =req.params;
    posts = posts.filter((e) => id !== e.id);
    res.redirect("/posts");
})

app.listen(port,() =>{
    console.log("lisetening to signal");
})