//global apps
const express = require("express");
const path = require('path');
const app = express();
const PORT = 3001
const notes = require('./routes/notes.js')

//makes static site public folder
app.use(express.static("public"));

//encodes text
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//modules
app.use('/api/notes', notes)

//http requests
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//listening to PORT
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))