const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require('./Develop/db/db.json');
const fs = require('fs');
const path = require('path');

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

// GET all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// CREATE new notes
app.post('/api/notes', (req, res) => {
    // id based on next index of array
    req.body.id = notes.length.toString();
    // add notes to db.json file
    const note = createNewNote(req.body, notes);
    res.json(req.body)
});

// To start server 
app.listen(PORT, () => {
    console.log('API server now on ${PORT}!');
});

