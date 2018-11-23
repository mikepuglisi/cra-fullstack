require('dotenv').config()

// const {
//     DB_USERNAME: username,
//     DB_PASSWORD: password,
//     DB_DATABASE: database,
//     DB_HOST: host,
//     DB_DIALECT: dialect,
//     DB_LOGGING
// } = process.env

// module.exports = {
//     username,
//     password,
//     database,
//     host,
//     dialect,
//     logging: DB_LOGGING === 'true' ? console.log : false,
//     operatorsAliases: false

// }

module.exports = {
    "development": {
      "dialect": "sqlite",
      "storage": "./database.sqlite3"
    },
    "test": {
      "dialect": "sqlite",
      "storage": ":memory"
    },
    "production": {
      "dialect": "sqlite",
      "storage": "./database.sqlite3"
    }
  }