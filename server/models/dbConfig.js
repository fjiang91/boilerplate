const chalk = require('chalk')
const Sequelize = require('sequelize')
const pkg = require('../../package.json')

console.log(chalk.yellow('Opening database connection'))

const db = new Sequelize( process.env.DATABASE_URL || `postgres://localhost:5432/boilerplate`, {
  logging: false
})

module.exports = db
