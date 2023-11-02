//global apps
const express = require("express");
const path = require('path');
const app = express();
const PORT = 3001
//makes static site public folder
app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))