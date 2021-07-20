const mongoose = require('mongoose');
const Player = require('./player');
const User = require('./user');
const Schema = mongoose.Schema;


const TeamSchema = new Schema({
  name: {
    type: String,
    required: [true, "Team must have a name"]
  },
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  strats: [{
    type: Schema.Types.ObjectId,
    ref: 'Strategy'
  }],
  password: String,
})

module.exports = mongoose.model('Team', TeamSchema);