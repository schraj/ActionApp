// Since Knex always runs this file first
require('babel-register');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'ActionAppUser',
      password : 'asdf123!',
      database : 'ActionApp'
    },
    useNullAsDefault: true,
  },
};