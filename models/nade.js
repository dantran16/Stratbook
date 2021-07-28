const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nadeSchema = new Schema({
  name: {
    type: String,
    enum: ['molotov', 'grenade', 'smoke', 'flash', 'decoy']
  },
  description: {
    type: String
  }
})

module.exports = mongoose.model('Nade', nadeSchema);