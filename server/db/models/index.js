const path = require('path')
const Sequelize = require('sequelize')
const glob = require('glob')
const environment = process.env.NODE_ENV || 'development'
const config = require('../config.js')[environment]
console.log('config', config)
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

glob.sync(path.join(__dirname, './**/!(index|_*).js'))
    .forEach(file => {
        const model = sequelize.import(file)
console.log(model.name.charAt(0).toUpperCase() + model.name.slice(1))
        db[model.name.charAt(0).toUpperCase() + model.name.slice(1)] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db