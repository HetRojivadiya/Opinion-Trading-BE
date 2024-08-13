const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobile: {  
    type: String,
  },
  password: {
    type: String,
    required: true,
  },

 
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;