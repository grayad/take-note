// import modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// require data
const [ notes ] = require('./Develop/db/db.json');

// use PORT if it has been set, or default to 3001
const PORT = process.env.PORT || 3001;

// instantiate the server
const app = express();


// GET route
app.get('/api/notes', (req, res) => {
    res.json(notes);
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});