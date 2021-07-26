const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require('./Develop/db/db.json');
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Function to put new notes back in db file
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db,json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

// Function to validate correct inputs
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

// GET all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// CREATE new notes
app.post('/api/notes', (req, res) => {
    // id based on next index of array
    req.body.id = notes.length.toString();
    // error 400 if incorrect data
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
     // add notes to db.json file
    const note = createNewNote(req.body, notes);
    res.json(req.body)
    }
});

// Connect to homepage 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

// Connect to notespage
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

// To start server 
app.listen(PORT, () => {
    console.log('API server now on ${PORT}!');
});

