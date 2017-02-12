// Since Knex always runs this file first, all of our seeds and migrations are babelified.
require('babel-register');

module.exports = {
  development: {
    client: 'mssql',
    connection: {
      host : '127.0.0.1',
      user : 'ActionAppUser',
      password : 'asdf123!',
      database : 'ActionApp'
    },
    useNullAsDefault: true,
  },
};