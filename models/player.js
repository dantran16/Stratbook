const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true
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
        isTooManyCheck = (nadeType, max) => {
          const reducer = (accumulator, currentValue) => {
            return accumulator + (currentValue.name == nadeType);
          };
          if (this.utility.reduce(reducer, 0) >= max) {
            return true;
          }
          return false;
        }
        //A player cannot hold more than one molotov
        if (isTooManyCheck('molotov', 1)) return false;
        //A player cannot hold more than 2 flashes
        if (isTooManyCheck('flash', 2)) return false;
        //A player cannot hold more than one grenade
        if (isTooManyCheck('grenade', 1)) return false;
        //A player cannot hold more than 1 smoke
        if (isTooManyCheck('smoke', 1)) return false;
        return true;
      },
      message: `Don't put too many nades`
    }
  }],
  position: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('Player', PlayerSchema);

