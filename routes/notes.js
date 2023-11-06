const router = require('express').Router();
const db = require('../db/db.json');
const fs = require('fs')

router.get('/api/notes', (req, res) => {
    console.log('GET api/notes')
    res.status(200).json(db);
});

router.post('/api/notes', (req, res) => {
    let note = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random() * 100)
    };
    db.push(note);
    fs.writeFile('../db/db.json', JSON.stringify(db), (err) => {
        err ? console.log(err) : res.json('Sent!')
    });
});

// router.delete('/api/notes', (req, res) => {

// })
module.exports = router;