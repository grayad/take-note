// import modules
const express = require("express");
const fs = require("fs");
const path = require("path");

// require data
const notes = require("./api/db/db.json");

// use PORT if it has been set, or default to 3001
const PORT = process.env.PORT || 3000;

// instantiate the server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// make asset files readily available, aka static resources
app.use(express.static("./api/public"));
// app.use(express("./api/index.js"));

function createNewNote(body, notesArray) {
  const note = body;
  // save new data in local server.js copy of animal data
  notesArray.push(note);

  // write new data to db.json
  fs.writeFileSync(
    path.join(__dirname, "./api/db/db.json"),
    // convert JS array data to JSON, do not change current data, and leave white space for readability
    JSON.stringify(notesArray, null, 2)
  );

  // return finished code to post route for response
  return note;
}

// GET route
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// POST new notes
app.post("/api/notes", (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  // add animal to json file and animals array with this function
  const note = createNewNote(req.body, notes);
  res.json(req.body);
});

// html routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./api/public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./api/public/notes.html"));
});
// wildcard route for any requests that do not exist
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./api/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
