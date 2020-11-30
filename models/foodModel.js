const mongoose = require('mongoose')

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    serving: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
  },
)

const Food = mongoose.model('Food', foodSchema)

module.exports = Food