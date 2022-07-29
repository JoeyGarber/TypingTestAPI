// These are custom errors, extending Error.prototype.
// This is easiest to do with ES6 class syntax.
// We set this.name and this.message in the constructor method of each custom error type
// to match the pattern that Express and Mongoose use for custom errors.

class OwnershipError extends Error {
  constructor () {
    super()
    this.name = 'OwnershipError'
    this.message = 'The provided token does not match the owner of this document'
  }
}

class DocumentNotFoundError extends Error {
  constructor () {
    super()
    this.name = 'DocumentNotFoundError'
    this.message = 'The provided ID doesn\'t match any documents'
  }
}

class BadParamsError extends Error {
  constructor () {
    super()
    this.name = 'BadParamsError'
    this.message = 'A required parameter was omitted or invalid'
  }
}

class BadCredentialsError extends Error {
  constructor () {
    super()
    this.name = 'BadCredentialsError'
    this.message = 'The provided username or password is incorrect'
  }
}

// This method checks if the user is trying to modify a resource is the owner of the resource
// and throws an error if not

// 'requestObject' should be the actual 'req' object from the route file
const requireOwnership = (requestObject, resource) => {
  // 'requestObject.user' will be defined in any route that uses 'requireToken'
  // 'requireToken' MUST be passed to the route as a second argument
  const owner = resource.owner._id ? resource.owner._id : resource.owner
  // check if the resource.owner is an object in case populate is being used
  // if it is, use the '_id' property and if not just use the value
  // This checks if the owner of the resource is the same as the owner of the requestObject
  if (!requestObject.user._id.equals(owner)) {
    throw new OwnershipError()
  }
  // return the resource if it passed the check
  return resource
}

// if the client passes in an ID that isn't in the DB, we want to return 404
const handle404 = record => {
  if (!record) {
    throw new DocumentNotFoundError() }
  else {
    return record
  }
}

module.exports = {
  requireOwnership,
  handle404,
  BadCredentialsError,
  BadParamsError,
  DocumentNotFoundError,
  OwnershipError
}