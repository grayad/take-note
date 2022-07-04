// import modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// require data
const { notes } = require('./Develop/db/db.json');


// instantiate the server
const app = express();