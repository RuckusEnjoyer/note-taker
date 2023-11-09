//requiring variables
const router = require('express').Router();
const db = require('../db/db.json');
const fs = require('fs')

//api GET request
router.get('/', (req, res) => {
    console.log('GET api/notes')
    res.status(200).json(db);
});

//api POST request
router.post('/', (req, res) => {
    console.log('POSTING api/notes')
    let note = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random() * 100)
    };
    db.push(note);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        err ? console.log(err) : res.json('Sent!')
    });
});

//BONUS: api DELETE request
router.delete(`/:id`, (req, res) => {
    console.log('DELETE request api/notes');
    const id = parseInt(req.params.id)
    const idToDel = db.findIndex(note => note.id === id); 
    db.splice(idToDel, 1);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        err ? console.log(err) : res.json('Deleted!')
    });

});

//Personal Challenge: api PATCH request
router.patch(`/:id`, (req, res) => {
    console.log('patch request')
    const id = parseInt(req.params.id);
    const idToPatch = db.findIndex(note => note.id === id);
    const data = JSON.parse(fs.readFileSync(db));
    if (idToPatch !== -1) {
        data[idToPatch] = {...data[index], ...req.body};
        fs.writeFileSync('./db/db.json', JSON.stringify(data), (err) => {
            err ? console.log(err) : res.json('Deleted!')
        });
    }
})


//exporting...
module.exports = router;