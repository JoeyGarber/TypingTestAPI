const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema(
  {
    WPM: {
      type: String,
      required: true,
      min: 0
    },
    Accuracy: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    Test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
      required: true
    }
  },
  {
    timestamps: true,
    toObject: {
      // remove `hashedPassword` field when we call `.toObject`
      transform: (_doc, user) => {
        return user
      }
    }
  }
)

module.exports = resultSchema