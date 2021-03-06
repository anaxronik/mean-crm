const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String,
    default: '',
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('categories', categorySchema)
