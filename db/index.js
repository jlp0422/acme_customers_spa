const conn = require('./conn');
const Customer = require('./Person');

const sync = () => {
  return conn.sync({ force: true })
}

const seed = () => {
  return Promise.all([
    Customer.create({ name: 'Jeremy', email: 'jeremy@gmail.com'}),
    Customer.create({ name: 'Evan', email: 'evan@gmail.com' }),
    Customer.create({ name: 'Rachel', email: 'rachel@gmail.com' })
  ])
  .then(() => console.log('data has been seeded'))
}

module.exports = {
  sync,
  seed,
  models: {
    Customer
  }
}
