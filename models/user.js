const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }
})

UserSchema.plugin(passportLocalMongoose); // Adds username + password + methods

module.exports = mongoose.model('User', UserSchema);