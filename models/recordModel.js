const mongoose = require('mongoose')
const Schema =mongoose.Schema;

const recordSchema = mongoose.Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    date: {
      type: Number,
    },
    month:{
      type: Number
    },
    year:{
      type: Number
    },
    caloriein: {
      type: Number,
    },
    calorieout:{
        type:Number
    }
  },
)

const Record = mongoose.model('Record', recordSchema)

module.exports = Record