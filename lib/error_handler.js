// An error handler middleware.
// It runs anytime one of the route handlers calls 'next',
// In other words, when an error gets thrown in one of the promise chains

module.exports = function (err, req, res, next) {
  // LOG ERRORS

  // don't log errors in a test environment
  if (!process.env.TESTENV) {
    // log a rudimentary timestamp
    console.log('\n', new Date().toTimeString() + ':')
    // log the original error in the terminal running Express
    console.error(error)
  }

  // There are 'ValidationError's and 'ValidatorErrors', so use a regex to catch both
  if (err.name.match(/Valid/) || err.name === 'MongoError') {
    // If the error came from trying to create a user that already exists,
    // the error message would contain a bunch of data about that user.
    // That's really bad, security wise. So here's a custom message
    const message = 'The received params failed a Mongoose validation'
    err = { status: 422, message }
    } else if (err.name === 'DocumentNotFoundError') {
      err.status = 404
    } else if (err.name === 'CastError' || err.name === 'BadParamsError') {
      err.status = 422
    } else if (err.name === 'BadCredentialsError' || err.name === 'BadParamsError') {
      err.status = 401
  }

  // If one of the status codes above got set, send that code
  // otherwise, send 500. Also, send the error message as JSON
  res.status(err.status || 500).json(err)
}