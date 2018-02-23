const conn = require('./conn');
const { Sequelize } = conn;

const Person = conn.define('person', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

module.exports = Person
