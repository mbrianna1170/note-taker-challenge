const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const notes = require('./Develop/db/db.json');


// GET all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// To start server 
app.listen(PORT, () => {
    console.log('API server now on ${PORT}!');
});