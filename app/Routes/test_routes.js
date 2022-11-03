const express = require('express')

const passport = require('passport')

// pull in Mongoose model for tests
const Test = require('../Models/test')

// these are custom errors
const customErrors = require('../../lib/custom_errors')

// we'll use this to send 404 when a non-existant doc is requested
const handle404 = customErrors.handle404
// we'll use this one to send 401 when a user tries to modify
// a resource that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from 'req.body'
const removeBlanks = require('../../lib/remove_blank_fields')

// passing this as the second argument to router.</verb> will make it
// so that a token MUST be passed for that route to be available.
// It will also set 'req.user'
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router
const router = express.Router()

// INDEX
// GET /tests
router.get('/tests', (req, res, next) => {
  // Probably want to do: Test.find({ owner: req.user.id })
  Test.find({ owner: null })
  .then((tests) => {
    // 'tests' is going to be an array of Mongoose documents
    // we want to convert each one to a POJO, so we use '.map' to apply
    // '.toObject' to each one
    return tests.map((test) => test.toObject())
  })
  // respond with 200 and JSON of the tests
  .then((tests) => res.status(200).json({ tests: tests }))
  // if there's an error, catch it
  .catch(next)
})

router.get('/user-tests', requireToken, (req, res, next) => {
  Test.find({ owner: req.user.id })
  .then((tests) => {
    return tests.map((test) => test.toObject())
  })
  .then((tests) => res.status(200).json({ tests: tests }))
  .catch(next)
})

// SHOW
// GET /tests/432jfdskafja
router.get('/tests/:id', (req, res, next) => {
  // req.params.id will be set based on the :id in the route
  Test.findById(req.params.id)
  // if I don't find anything, handle the 404 error
  .then(handle404)
  // if 'findById' is successful, respond with 200 and 'test' JSON
  .then(test => res.status(200).json({ test: test.toObject() }))
  // pass potential errors to handler
  .catch(next)
})

// CREATE
// POST /tests
router.post('/tests', requireToken, (req, res, next) => {
  // set owner of new test to be current user
  // now the owner is on the object, but not yet in the DB
  req.body.test.owner = req.user.id
  // and remember, Test.create() is a mongoose thing
  // just like Test.findById, and Test.find
  // This is what creates it in the database
  Test.create(req.body.test)
  .then(test => {
    res.status(201).json({ test: test.toObject() })
  })
  // and if an error occurs, pass it to the error handler
  // the error handler has to get the error through this catch(next) because
  // it'll use that when responding to the client
  .catch(next)
})

// UPDATE
// PATCH /tests/432jfdskafja
router.patch('/tests/:id', requireToken, removeBlanks, (req, res, next) => {
  // make sure the client doesn't update the owner property by deleting that
  delete req.body.test.owner

  // Find the thing to update
  Test.findById(req.params.id)
  // If I don't find anything, send a 404
  .then(handle404)
  .then(test => {
    // pass the 'req' object and the Mongoose record to 'requireOwnership'
    // it will throw an error if the current user isn't the owner
    requireOwnership(req, test)

    // pass the result of Mongoose's '.update' to the next
    test.set(req.body.test)
    return test.save()
  })
  // if that succeeded, return 204 and no JSON
  .then(() => res.sendStatus(204))
  // if an error occurs, pass it to the handler
  .catch(next)
})

// DESTROY
// DELETE /tests/432jfdskafja
router.delete('/tests/:id', requireToken, (req, res, next) => {
  Test.findById(req.params.id)
  .then(handle404)
  .then(test => {
    requireOwnership(req, test)

    test.deleteOne()
  })
  .then(() => res.sendStatus(204))
  .catch(next)
})

module.exports = router