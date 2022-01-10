const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String, 
    require: true
  },
  imageUrl:{
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
}, {
  timestamp: true
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

