const Sequelize = require("sequelize")

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: "localhost",
  dialect: "postgres"
})

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to Postgres database")
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err)
  })

module.exports = { sequelize, Sequelize }
