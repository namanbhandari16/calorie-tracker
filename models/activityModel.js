const mongoose = require('mongoose')

const activitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    motion: {
      type: String,
      required: true,
    },
    met: {
      type: Number,
      required: true,
    },
  },
)

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity