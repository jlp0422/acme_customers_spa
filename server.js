/* eslint-disable */
const express = require('express');
const app = express();
const path = require('path');
const db = require ('./db');
const { Person } = db.models

app.get('/', (req, res, next) => {
  Person.findAll()
    .then(people => res.send(people))
    // .then(people => res.render('index'))
    .catch(next)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port of call: ${port}`));

db.sync()
  .then(() => db.seed())
