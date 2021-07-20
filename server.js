const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// const db = new Low(new JSONFile('./MOCK_DATA.json'))
const adapter = new FileSync('MOCK_DATA.json')
const db = low(adapter)
db.read()

app.get("/api/status", function (req, res,) {
  try {
    res.send({status: 'ok'});
  }
  catch (err) {
    console.error(err);
  }
});

app.get("/api/member", function (req, res) {
  try {
    res.send(db.get('members'));
  }
  catch (err) {
    console.error(err);
  }

});

app.listen(8000, () => {
  return console.log('App listening on port 8000');
});