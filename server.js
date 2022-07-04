// import modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// require data
const [ notes ] = require('./Develop/db/db.json');


// instantiate the server
const app = express();


// GET route
app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});