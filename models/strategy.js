const mongoose = require('mongoose');
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
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }
});

module.exports = mongoose.model('Strategy', StrategySchema);