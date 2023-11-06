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
    const id = req.params.id
    const idToDel = db.find((eL) => eL.id === id); 
    const index = db.indexOf(idToDel);
    db.splice(index, 0);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        err ? console.log(err) : res.json('Deleted!')
    });

});


//exporting...
module.exports = router;