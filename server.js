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
app.use(require('method-override')('_method'))

app.use((req, res, next) => {
  res.locals.path = req.url
  next()
})

// serves page
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './views/index.html'))
})

// get /api/customers - gets all customers
app.get('/api/customers', (req, res, next) => {
  Customer.findAll()
    .then(customers => res.send(customers))
    .catch(next)
})

// post /api/customers - creates a customer and returns it
app.post('/api/customers', (req, res, next) => {
  // Customer.findOne({
  //   where:{ email: req.body.email }
  // })
  //   .then(customer => {
  //     console.log(customer)
  //     if (customer !== null) return;
  //   })
  //   .then(() => {
      Customer.create(req.body)
        .then(customer => res.json(customer))
        .catch(next)
    // })
    // .catch(next)
})

// delete /api/customers/:id - deletes customer
app.delete('/api/customers/:id', (req, res ,next) => {
  Customer.findById(req.params.id)
    .then(customer => {
      customer.destroy()
      res.json(customer)
    })
    .catch(next)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port of call: ${port}`));

db.sync()
  .then(() => db.seed())
