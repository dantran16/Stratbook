const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const utilitySchema = new Schema({
  type: {
    name: {
      type: String,
      enum: ['molotov', 'grenade', 'smoke', 'flash', 'decoy']
    },
    description: {
      type: String
    }
  },
})

module.exports = mongoose.model('Utility', utilitySchema);