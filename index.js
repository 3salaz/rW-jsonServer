const express = require("express");
const cors = require("cors");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");

const db = lowDb(new FileSync('db.json'))

db.defaults({
    videoLib: []
}).write()

// initializing server

const app = express();
app.use(cors());
app.use(bodyParser.json()); 
const PORT = 4000;

app.get('/videos', (req,res) => {
    const data = db.get("videos").value()
    return res.json(data)
})

app.post('/videos/new', (req,res) => {
    const video = req.body
    db.get("videos").push({
        ... video, id: nanoid()
    }).write()
    res.json({ success: true})
})

app.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}/videos`)
})