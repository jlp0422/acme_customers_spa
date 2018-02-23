const conn = require('./conn');
const Person = require('./Person');

const sync = () => {
  return conn.sync({ force: true })
}

const seed = () => {
  return Promise.all([
    Person.create({ name: 'Jeremy', email: 'jeremy@gmail.com'}),
    Person.create({ name: 'Evan', email: 'evan@gmail.com' }),
    Person.create({ name: 'Rachel', email: 'rachel@gmail.com' })
  ])
  .then(() => console.log('data has been seeded'))
}

module.exports = {
  sync,
  seed,
  models: {
    Person
  }
}
