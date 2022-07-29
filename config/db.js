'use strict'

// create a base name for the mongodb
const mongooseBaseName = "TypingTest-API"

// create the mongodb uri for development and test
const database = {
  development: `mongodb://localhost/${mongooseBaseName}-development`,
  test: `mongodb://localhost/${mongooseBaseName}-test`
}

// Identify if development environment is test or development
// Select DB based on whether a test file was executed before 'server.js'
const localDb = process.env.TESTENV ? database.test : database.development

// Environment variable DB_URI will be available in
// heroku production environment, otherwise use test or development db
const currentDb = process.env.DB_URI || localDb

module.exports = currentDb