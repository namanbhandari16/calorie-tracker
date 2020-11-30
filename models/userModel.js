const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    gender:{
      type:String,
      required: true,
    },
    bmr:{
      type: Number,
      required: true
    }
  },
)

const User = mongoose.model('User', userSchema)

module.exports = User