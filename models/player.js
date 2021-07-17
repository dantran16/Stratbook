const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
    type: String, 
  },
  role: {
    type: String,
    enum: ['entry', 'support', '2nd', 'IGL', 'AWP', 'lurk', 'fill']
  },
  molotov: {
    type: Number,
    default: 0,
    max: 1,
    min: 0
  },
  smoke: {
    type: Number,
    default: 0,
    max: 1,
    min: 0
  },
  flashes: {
    type: Number,
    default: 0,
    max: 2,
    min: 0
  },
  position: {
    type: String,
  },
})

module.exports = mongoose.model('Player', playerSchema);