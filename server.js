// import modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// require data
const [ notes ] = require('./Develop/db/db.json');

// use PORT if it has been set, or default to 3001
const PORT = process.env.PORT || 3000;

// instantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// return ID of specific note
// function findById(id, notesArray) {
//     const result = notesArray.filter(note => note.id === id)[0];
//     return result;
// }

function createNewNote(body, notes) {
    const note = body;
    // save new data in local server.js copy of animal data
    [notes].push(note);

    // write new data to db.json
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        // convert JS array data to JSON, do not change current data, and leave white space for readability
        JSON.stringify([notes], null, 2)
    );
}
// GET route
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// GET by ID
// app.get('/api/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);
//       res.json(result);
// });

// POST new notes
app.post('/api/notes', (req,res) => {
    const note = createNewNote(req.body, notes);
    res.json(req.body);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});