/* eslint-disable */
const express = require('express');
const app = express();
const path = require('path');
const db = require ('./db');
const { Customer } = db.models;

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))
app.use('/vendor', express.static(path.join(__dirname, 'client')))

app.use(require('body-parser').json())
app.use(require('body-parser').urlencoded({ extended:false }));


app.use((req, res, next) => {
  res.locals.path = req.url
  next()
})

// serves page
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './views/index.html'))
})

app.get('/api', (req, res, next) => {
  Customer.findAll()
    .then(customers => res.send(customers))
    .catch(next)
})

// get /api/customers - gets all customers
app.get('/api/customers', (req, res, next) => {
  Customer.findAll()
    .then(customers => res.send(customers))
    .catch(next)
})

// post /api/customers - creates a customer and returns it
app.post('/api/customers', (req, res, next) => {
  Customer.create(req.body)
    .then(customer => {
      return customer;
    })
    .catch(next)
})


// delete /api/customers/:id - deletes custoer

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port of call: ${port}`));

db.sync()
  .then(() => db.seed())
