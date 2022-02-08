var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  username: String,
  name: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  fulltime: Boolean,
  gender: String,
  codelang: String,
  type:String,
  role: String,
  mobile: String,
  home: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');