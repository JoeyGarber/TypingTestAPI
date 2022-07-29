const mongoose = require('mongoose')

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  }
)

module.exports = mongoose.model('Thing', thingSchema)