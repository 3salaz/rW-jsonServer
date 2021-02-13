const express = require("express");
const cors = require("cors");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const bodyParser = require("body-parser");

const db = lowDb(new FileSync('db.json'))

db.defaults({
    videoLib: []
}).write()

// initializing server

const app = express();
app.use(cors());
app.use(bodyParser.json()); 
const PORT = 4000;

app.get('/videoLib', (req,res) => {
    const data = db.get("videoLib").value()
    return res.json(data)
})

app.listen(PORT, () => {
    console.log(`Running on port http://localhost:${PORT}/videoLib`)
})