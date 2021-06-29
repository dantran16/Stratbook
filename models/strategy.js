const mongoose = require('mongoose');
const Player = require('./player')
const Schema = mongoose.Schema;

const StrategySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  map: {
    type: String,
    required: true,
    enum: [ 'de_inferno', 
      'de_mirage', 
      'de_overpass', 
      'de_nuke', 
      'de_ancient', 
      'de_dust2', 
      'de_vertigo', 
      'de_train']
  },
  description: String,
  number: {
    type: Number,
    min: 1,
    max: 5,
    default: 2,
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      validate: {
        validator: function(v) {
          return !(this.players.length > 5);
        }
      }
    }
  ],
});

module.exports = mongoose.model('Strategy', StrategySchema);