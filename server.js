const express = require('express');
const app = express();
const notes = require('./Develop/db/db.json');


// GET all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// To start server 
app.listen(3001, () => {
    console.log('API server now on port 3001!');
});