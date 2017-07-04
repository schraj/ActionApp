// Since Knex always runs this file first
require('babel-register');

module.exports = {
  development: {
    client: 'mssql',
    connection: {
      host : 'localhost',
      user : 'ActionAppUser',
      password : 'asdf123!',
      database : 'ActionApp'
    },
    useNullAsDefault: true,
  },
};