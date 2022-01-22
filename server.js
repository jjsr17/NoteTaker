const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

const publicDir = path.join(__dirname, "/public");

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Api Notes
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

// GET specific note
app.get('/api/notes/:id', (req, res) => {
    let existingNotes = JSON.parse('/db/db.json', 'utf8');
    res.json(existingNotes[Number(req.params.id)]);
});

// GET Route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post('/api/notes', (req, res) => {
    let existingNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let note = req.body;
    let id = existingNotes.length.toString;
    existingNotes.push(note);
    fs.writeFileSync('./db/db.json', JSON.stringify(existingNotes));
    res.json(existingNotes[Number(req.params.id)]);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
