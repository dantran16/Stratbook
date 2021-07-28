const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: {
    type: String, 
  },
  role: {
    type: String,
    enum: ['Entry', 'Support', '2nd', 'IGL', 'AWP', 'Lurk', 'Fill']
  },
  utility: [{
    type: Schema.Types.ObjectId,
    ref: 'Nade',
    validate: {
      validator: function (v) {
        // A player cannot hold more than 4 pieces of utility 
        if (this.utility.length > 4) return false;
        //Function to see if the specific grenade type has surpassed maximum capacity (returns false)
        countCheck = (utility, max) => {
          const reducer = (accumulator, currentValue) => {
            if (currentValue.name === utility) {
              accumulator + 1;
            }
          };
          if (this.utility.reduce(reducer, 0) > max) {
            return false;
          }
          return true;
        }
        //A player cannot hold more than one molotov
        if (!countCheck('molotov', 1)) return false;
        //A player cannot hold more than one grenade
        if (!countCheck('grenade', 1)) return false;
        //A player cannot hold more than 2 flashes
        if (!countCheck('flash', 2)) return false;
        //A player cannot hold more than 1 smoke
        if (!countCheck('smoke', 1)) return false;
      },
      message: `Don't put too many nades`
    }
  }],
  position: {
    type: String,
  },
  description: {
    type: String
  }
})

module.exports = mongoose.model('Player', PlayerSchema);

