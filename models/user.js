let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  fullname: {
      type: String,
      required: true,
      trim: true
  },
  email: {
      type: String,
      unique: true,
      required: true,
      trim: true
  },
  password: {
      type: String,
      required: true
  }
});

let userModel = mongoose.model('User', userSchema);

module.exports = userModel